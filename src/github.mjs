import { INITIAL_GITHUB_USER, PORTFOLIO_REPO, safeRepoName } from './catalog.mjs';

const API_BASE = 'https://api.github.com';
const CACHE_TTL_MS = 15 * 60 * 1000;
const MAX_RELEASES = 100;
const CACHE_PREFIX = 'portfolio-release-v2:';

/** Limitador FIFO sem dependências, compartilhado entre todas as consultas de releases. */
export function createLimiter(limit = 3) {
  let active = 0;
  const queue = [];
  function drain() {
    while (active < limit && queue.length) {
      const { task, resolve, reject } = queue.shift();
      active += 1;
      Promise.resolve().then(task).then(resolve, reject).finally(() => { active -= 1; drain(); });
    }
  }
  return (task) => new Promise((resolve, reject) => { queue.push({ task, resolve, reject }); drain(); });
}

export function validApkUrl(asset, owner, repo) {
  if (!asset || typeof asset.name !== 'string' || !/\.apk$/i.test(asset.name) ||
      !safeRepoName(owner) || !safeRepoName(repo)) return null;
  try {
    const url = new URL(asset.browser_download_url);
    const prefix = `/${owner}/${repo}/releases/download/`;
    return url.protocol === 'https:' && url.hostname === 'github.com' &&
      url.username === '' && url.password === '' &&
      url.pathname.toLowerCase().startsWith(prefix.toLowerCase()) &&
      url.pathname.length > prefix.length &&
      !/%2f|%5c/i.test(url.pathname) ? url.href : null;
  } catch { return null; }
}

export function isApkArtifact(artifact) {
  return Boolean(artifact && !artifact.expired && typeof artifact.name === 'string' &&
    /(?:\.apk$|(?:^|[^a-z])apk(?:[^a-z]|$))/i.test(artifact.name) &&
    artifact.workflow_run && Number.isSafeInteger(artifact.workflow_run.id) && artifact.workflow_run.id > 0);
}

export function createGithubClient({
  request = (...args) => fetch(...args),
  storage = null,
  clock = () => Date.now(),
  timeoutMs = 9000,
  releaseConcurrency = 3
} = {}) {
  let user = INITIAL_GITHUB_USER;
  let rateLimited = false;
  const releases = new Map();
  const pending = new Map();
  const enqueue = createLimiter(releaseConcurrency);

  const repoUrl = (repo) => `https://github.com/${encodeURIComponent(user)}/${encodeURIComponent(repo)}`;
  const profileUrl = () => `https://github.com/${encodeURIComponent(user)}`;
  const apiUrl = (path) => `${API_BASE}${path}`;
  const repoApi = (repo, tail = '') => `/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}${tail}`;

  async function fetchJson(path) {
    if (rateLimited) throw new Error('Limite de consultas da API do GitHub');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await request(apiUrl(path), {
        headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal
      });
      if (!response.ok) {
        if (response.status === 429 || (response.status === 403 && response.headers?.get('x-ratelimit-remaining') === '0')) {
          rateLimited = true;
        }
        throw new Error(`GitHub API: HTTP ${response.status}`);
      }
      return await response.json();
    } finally { clearTimeout(timer); }
  }

  function cachedRelease(repo) {
    try {
      const value = storage?.getItem(CACHE_PREFIX + user + '/' + repo);
      if (!value) return null;
      const data = JSON.parse(value);
      if (!data || !Number.isFinite(data.time) || clock() < data.time ||
          clock() - data.time >= CACHE_TTL_MS || !data.release || data.release.error) return null;
      if (data.release.apk && !validApkUrl({name:'cached.apk',browser_download_url:data.release.apk},user,repo)) return null;
      if (data.release.artifactRun && (!Number.isSafeInteger(data.release.artifactRun) || data.release.artifactRun < 1)) return null;
      return data.release;
    } catch { return null; }
  }
  function saveRelease(repo, release) {
    try { storage?.setItem(CACHE_PREFIX + user + '/' + repo, JSON.stringify({ time: clock(), release })); }
    catch { /* armazenamento opcional ou bloqueado */ }
  }

  async function resolveOwner() {
    try {
      const response = await fetchJson(`/repos/${encodeURIComponent(INITIAL_GITHUB_USER)}/${PORTFOLIO_REPO}`);
      const login = response?.owner?.login;
      if (safeRepoName(login) && user !== login) {
        user = login;
        releases.clear();
      }
    } catch { /* links estáticos funcionam sem a API */ }
    return user;
  }

  async function listPublicRepositories() {
    const found = [];
    for (let page = 1; page <= 4; page += 1) {
      const result = await fetchJson(`/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&per_page=100&page=${page}`);
      if (!Array.isArray(result)) throw new Error('Formato de lista de repositórios inesperado');
      found.push(...result);
      if (result.length < 100) break;
    }
    return found;
  }

  async function findApkArtifact(repo) {
    // Apenas o link público para a execução. Não se presume que um Artifact seja APK extraível.
    try {
      const result = await fetchJson(repoApi(repo, '/actions/artifacts?per_page=100'));
      if (!Array.isArray(result?.artifacts)) return null;
      const match = result.artifacts.filter(isApkArtifact)
        .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))[0];
      return match ? match.workflow_run.id : null;
    } catch { return null; }
  }

  async function fetchRelease(repo, android) {
    const candidates = [];
    for (let page = 1; page <= 2; page += 1) {
      const list = await fetchJson(repoApi(repo, `/releases?per_page=50&page=${page}`));
      if (!Array.isArray(list)) throw new Error('Formato de Releases inesperado');
      candidates.push(...list.filter((release) => release && !release.draft));
      if (list.length < 50) break;
    }
    const releaseList = candidates.slice(0, MAX_RELEASES);
    const newest = releaseList[0] || null;
    let tag = '';
    if (!newest && !rateLimited) {
      try {
        const tags = await fetchJson(repoApi(repo, '/tags?per_page=1'));
        tag = Array.isArray(tags) && typeof tags[0]?.name === 'string' ? tags[0].name : '';
      } catch { /* falha isolada da consulta de tags */ }
    }
    const withApk = releaseList.find((release) => Array.isArray(release.assets) &&
      release.assets.some((asset) => validApkUrl(asset, user, repo)));
    const apk = withApk?.assets.find((asset) => validApkUrl(asset, user, repo));
    const artifactRun = !apk && android && !rateLimited ? await findApkArtifact(repo) : null;
    return {
      version: typeof newest?.tag_name === 'string' ? newest.tag_name : '', tag,
      apkVersion: typeof withApk?.tag_name === 'string' ? withApk.tag_name : '',
      pre: Boolean(withApk ? withApk.prerelease : newest?.prerelease),
      apk: apk ? validApkUrl(apk, user, repo) : null,
      artifactRun, hasReleases: releaseList.length > 0
    };
  }

  function loadRelease(repo, android = false) {
    if (!safeRepoName(repo)) return Promise.resolve({ error: true });
    if (releases.has(repo)) return Promise.resolve(releases.get(repo));
    if (pending.has(repo)) return pending.get(repo);
    const cached = cachedRelease(repo);
    if (cached) { releases.set(repo, cached); return Promise.resolve(cached); }
    if (rateLimited) return Promise.resolve({ error: true });
    const promise = enqueue(() => fetchRelease(repo, android))
      .then((value) => { releases.set(repo, value); saveRelease(repo, value); return value; })
      .catch(() => ({ error: true }))
      .finally(() => pending.delete(repo));
    pending.set(repo, promise);
    return promise;
  }

  return {
    getUser: () => user, isRateLimited: () => rateLimited, repoUrl, profileUrl,
    resolveOwner, listPublicRepositories, loadRelease
  };
}
