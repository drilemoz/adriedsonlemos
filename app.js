/* Portfólio público de Adriedson Lemos.
 * Sem frameworks, rastreadores, tokens privados ou dependências externas.
 * O usuário público atual é drilemoz; revise a constante se mudar novamente.
 */
(function () {
  'use strict';

  const INITIAL_GITHUB_USER = 'drilemoz';
  const PORTFOLIO_REPO = 'adriedsonlemos';
  const API_BASE = 'https://api.github.com';
  const CACHE_TTL_MS = 15 * 60 * 1000;
  const KNOWN = [
    { repo: 'Vigia-IA', name: 'Vigia IA', description: 'Monitoramento com IA local, câmeras IP e de celulares, mapas offline e navegação para cicloviagem. Integração com Minha Câmera.', categories: ['android'], kind: 'Android / IA', stack: ['Flutter', 'IA local', 'Mapas offline'], icon: '◎', featured: true },
    { repo: 'Nexora', name: 'Nexora', description: 'Assistente de IA local no Android, executando modelos GGUF com llama.cpp, sem servidor de inferência.', categories: ['android'], kind: 'Android / IA offline', stack: ['Kotlin', 'GGUF', 'llama.cpp'], icon: '✧', featured: true },
    { repo: 'Minha-Camera', name: 'Minha Câmera', description: 'Transforma um celular Android em câmera de rede local para outro aparelho, com transmissão MJPEG e H.264 experimental, mesmo sem internet.', categories: ['android', 'ferramentas'], kind: 'Android / Câmera', stack: ['Kotlin', 'Wi-Fi local', 'Vídeo'], icon: '◉', featured: true },
    { repo: 'Explorador-XP', name: 'Explorador XP', description: 'Gerenciador de arquivos Android com multimídia, acesso WebDAV e SMB2/SMB3 e transferência pela rede local.', categories: ['android', 'ferramentas'], kind: 'Android / Arquivos', stack: ['Kotlin', 'SMB', 'WebDAV'], icon: '▦', featured: true },
    { repo: 'GitHub-Manager', name: 'GitHub Manager', description: 'Ferramenta Android para administrar repositórios, versões, Actions, builds e downloads do GitHub.', categories: ['android', 'ferramentas'], kind: 'Android / DevTools', stack: ['Android', 'GitHub API', 'CI/CD'], icon: '⌘', featured: true },
    { repo: 'Pulso', name: 'Pulso Bateria', description: 'Monitor de bateria Android com histórico de sessões, estimativas identificadas e laboratório para testes de energia solar e consumo.', categories: ['android', 'ferramentas'], kind: 'Android / Energia', stack: ['Kotlin', 'Compose', 'Room'], icon: '◍', featured: true },
    { repo: 'UaiVozes', name: 'Uai Vozes', description: 'Conversão de texto em áudio com ElevenLabs no Android, biblioteca de áudios, seleção de vozes e leitura pelo sintetizador do sistema.', categories: ['android'], kind: 'Android / Áudio', stack: ['Flutter', 'ElevenLabs', 'TTS'], icon: '♫' },
    { repo: 'BaixaFacil', name: 'Baixa Fácil', description: 'Navegador e gerenciador de downloads Android com detecção de vídeos, histórico, favoritos e diagnóstico local.', categories: ['android', 'ferramentas'], kind: 'Android / Downloads', stack: ['Java', 'WebView', 'Downloads'], icon: '↓' },
    { repo: 'MeuGiga', name: 'MeuGiga', description: 'Acompanha o uso de dados móveis, franquia, alertas, consumo por aplicativo e consulta separada de Wi-Fi.', categories: ['android', 'ferramentas'], kind: 'Android / Internet', stack: ['Kotlin', 'Compose', 'Room'], icon: '▥' },
    { repo: 'Meu-Vercel', name: 'Meu Vercel', description: 'Cliente Android para consultar e gerenciar projetos, deploys, domínios e configurações pela API da Vercel.', categories: ['android', 'ferramentas'], kind: 'Android / DevTools', stack: ['Flutter', 'Vercel API', 'Deploys'], icon: '△' },
    { repo: 'MonitorRemoto', name: 'Monitor Remoto', description: 'Monitoramento e comandos autorizados entre celulares Android pareados, com telemetria, arquivos e localização pela rede.', categories: ['android', 'ferramentas'], kind: 'Android / Rede', stack: ['Kotlin', 'Rede local', 'Segurança'], icon: '⇄' },
    { repo: 'Tatica-Manager', name: 'Tática Manager', description: 'Jogo de gerenciamento de futebol para Android, com partidas 2D, elenco, táticas e narração de eventos.', categories: ['android'], kind: 'Android / Jogo', stack: ['Flutter', 'Dart', 'Flame'], icon: '⚽' },
    { repo: 'Lista-de-Compras', name: 'Lista de Compras', description: 'Organizador Android offline de compras, orçamentos, preços e listas com histórico e backup local.', categories: ['android'], kind: 'Android / Compras', stack: ['Kotlin', 'Material 3', 'Offline'], icon: '☷' },
    { repo: 'eureciclo', name: 'Eu Reciclo', description: 'Calcula valores de materiais recicláveis, registra vendas, permite metas de compra e uso offline.', categories: ['android', 'web'], kind: 'Web / Android', stack: ['Vue', 'Vite', 'Capacitor'], icon: '♻' },
    { repo: 'Termux-Manager', name: 'Termux Manager Android', description: 'Projeto experimental de integração do Termux com o Termux Manager em um APK Android de uso particular.', categories: ['android', 'ferramentas'], kind: 'Android / Termux', stack: ['Android', 'Termux', 'Integração'], icon: '▣' },
    { repo: 'TermuxManager', name: 'Termux Manager', description: 'Gerenciador modular para importar, testar, executar e organizar projetos diretamente pelo terminal do Termux.', categories: ['ferramentas'], kind: 'Terminal / Ferramenta', stack: ['Termux', 'CLI', 'Automação'], icon: '>_' },
    { repo: 'LoteriasFacil', name: 'Loterias Fácil', description: 'Aplicativo Android de acompanhamento de loterias, resultados, conferência e análise de combinações.', categories: ['android'], kind: 'Android / Dados', stack: ['Kotlin', 'Compose', 'SQLite'], icon: '◈' }
  ];

  let githubUser = INITIAL_GITHUB_USER;
  let filter = 'todos';
  let query = '';
  let repositoryList = KNOWN.map(function (data) { return Object.assign({}, data); });
  const fetchedReleases = new Map();
  const fetchingReleases = new Map();
  let observer = null;
  let limitedByApi = false;

  const $ = function (selector) { return document.querySelector(selector); };
  const $$ = function (selector) { return Array.from(document.querySelectorAll(selector)); };
  const status = $('#github-status');
  const grid = $('#projects');
  const safeRepoName = function (name) { return /^[A-Za-z0-9_.-]+$/.test(name); };
  const repoUrl = function (name) { return 'https://github.com/' + encodeURIComponent(githubUser) + '/' + encodeURIComponent(name); };
  const profileUrl = function () { return 'https://github.com/' + encodeURIComponent(githubUser); };

  function element(tag, className, textValue) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (textValue !== undefined) node.textContent = textValue;
    return node;
  }
  function makeExternal(href, label, className) {
    const link = element('a', className, label);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  function setTheme(theme) {
    const selected = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = selected;
    const button = $('#theme-toggle');
    button.setAttribute('aria-label', selected === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    button.querySelector('.theme-icon').textContent = selected === 'dark' ? '☀' : '☾';
    document.querySelector('meta[name="theme-color"]').content = selected === 'dark' ? '#08090c' : '#ffffff';
    try { localStorage.setItem('adriedson-theme', selected); } catch (error) { /* navegação privada */ }
  }
  function setupNavigation() {
    let preferred = 'light';
    try { preferred = localStorage.getItem('adriedson-theme') || 'light'; } catch (error) { /* navegação privada */ }
    setTheme(preferred);
    $('#theme-toggle').addEventListener('click', function () { setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); });
    const menu = $('#menu-toggle');
    const nav = $('#nav');
    function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); }
    menu.addEventListener('click', function () { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
    nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
    $('#year').textContent = String(new Date().getFullYear());
    $$('.filter').forEach(function (button) {
      button.addEventListener('click', function () {
        filter = button.dataset.filter;
        $$('.filter').forEach(function (other) { other.classList.toggle('active', other === button); other.setAttribute('aria-pressed', String(other === button)); });
        renderProjects();
      });
    });
    $('#search').addEventListener('input', function (event) { query = event.target.value.trim().toLocaleLowerCase('pt-BR'); renderProjects(); });
  }

  function projectDetails(item) {
    const known = KNOWN.find(function (entry) { return entry.repo.toLowerCase() === item.name.toLowerCase(); });
    return Object.assign({
      repo: item.name,
      name: item.name,
      description: item.description || 'Projeto de desenvolvimento disponível no meu GitHub.',
      categories: [], kind: 'Código / Projeto', stack: item.language ? [item.language] : [], icon: '⌘', featured: false
    }, known || {}, { repo: item.name, archived: Boolean(item.archived) });
  }

  function applyRelease(card, release) {
    if (!card || !release) return;
    const link = card.querySelector('.project-link.release');
    const meta = card.querySelector('.project-meta');
    if (!link || !meta) return;
    const repo = card.dataset.repo;
    link.hidden = true;
    link.classList.remove('apk', 'artifact');
    link.removeAttribute('title');
    link.removeAttribute('aria-label');

    if (release.error) {
      meta.textContent = 'Não foi possível consultar os downloads no GitHub agora.';
      return;
    }

    if (release.apk) {
      meta.textContent = 'APK publicado: ' + (release.apkVersion || 'versão disponível')
        + (release.version && release.version !== release.apkVersion ? ' · há Release mais recente' : '')
        + (release.pre ? ' · pré-lançamento' : '');
      link.href = release.apk;
      link.textContent = '↓ Baixar APK';
      link.classList.add('apk');
      link.setAttribute('aria-label', 'Baixar APK de ' + card.dataset.title + ' nas Releases do GitHub');
      link.title = 'Download direto de um arquivo APK anexado a uma Release';
      link.hidden = false;
      return;
    }

    if (release.artifactRun) {
      meta.textContent = (release.version ? 'Release: ' + release.version + ' · ' : '')
        + 'APK nos Artifacts do Actions · login necessário · arquivo temporário';
      // Artifacts podem exigir login e são normalmente arquivos ZIP, não downloads APK diretos.
      link.href = repoUrl(repo) + '/actions/runs/' + release.artifactRun;
      link.textContent = 'Ver APK no Actions ↗';
      link.classList.add('artifact');
      link.setAttribute('aria-label', 'Abrir a execução do GitHub Actions com Artifact de APK de ' + card.dataset.title);
      link.title = 'Abra a execução e procure o Artifact; o download requer login e pode expirar';
      link.hidden = false;
      return;
    }

    if (release.version) {
      meta.textContent = 'Release: ' + release.version + ' · sem APK anexado'
        + (release.pre ? ' · pré-lançamento' : '');
      link.href = repoUrl(repo) + '/releases';
      link.textContent = 'Ver versões ↗';
      link.hidden = false;
      return;
    }

    if (repo.toLowerCase() === 'termuxmanager') {
      meta.textContent = 'Ferramenta para Termux · instalação pelo README · sem Releases públicas';
      link.href = repoUrl(repo) + '/blob/main/README.md';
      link.textContent = 'Como instalar ↗';
      link.hidden = false;
      return;
    }

    meta.textContent = 'Ainda não há Releases públicas com download.';
    if (card.dataset.android === 'true') {
      link.href = repoUrl(repo) + '/actions';
      link.textContent = 'Ver compilações ↗';
      link.title = 'Confira as execuções; pode não haver APK disponível';
      link.hidden = false;
    }
  }

  function renderProjects() {
    if (observer) observer.disconnect();
    grid.replaceChildren();
    const list = repositoryList.filter(function (item) {
      const categoryMatches = filter === 'todos' || item.categories.indexOf(filter) !== -1;
      const haystack = [item.name, item.repo, item.description, item.kind].concat(item.stack).join(' ').toLocaleLowerCase('pt-BR');
      return categoryMatches && haystack.includes(query);
    });
    const fragment = document.createDocumentFragment();
    list.forEach(function (item) {
      if (!safeRepoName(item.repo)) return;
      const card = element('article', 'project-card' + (item.featured ? ' featured' : ''));
      card.dataset.repo = item.repo;
      card.dataset.title = item.name;
      card.dataset.android = String(item.categories.includes('android'));
      const top = element('div', 'project-card-top');
      top.append(element('span', 'project-icon', item.icon), element('span', 'project-kind', item.archived ? 'Arquivado' : item.kind));
      card.appendChild(top);
      card.appendChild(element('h3', '', item.name));
      card.appendChild(element('p', '', item.description));
      const tags = element('div', 'tech-tags');
      item.stack.slice(0, 3).forEach(function (tag) { tags.appendChild(element('span', '', tag)); });
      card.appendChild(tags);
      card.appendChild(element('div', 'project-meta', 'Código e documentação no GitHub'));
      const links = element('div', 'project-links');
      links.appendChild(makeExternal(repoUrl(item.repo), 'Ver código ↗', 'project-link code'));
      const releaseLink = makeExternal(repoUrl(item.repo) + '/releases', 'Consultando versões...', 'project-link release');
      releaseLink.hidden = true;
      links.appendChild(releaseLink);
      card.appendChild(links);
      fragment.appendChild(card);
      applyRelease(card, fetchedReleases.get(item.repo));
    });
    grid.appendChild(fragment);
    $('#total').textContent = String(repositoryList.length);
    $('#empty').hidden = list.length > 0;
    grid.setAttribute('aria-busy', 'false');
    observeReleases();
  }

  async function fetchJson(url) {
    const controller = new AbortController();
    const timer = setTimeout(function () { controller.abort(); }, 9000);
    try {
      const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal });
      if (!response.ok) {
        if (response.status === 429 || (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0')) limitedByApi = true;
        throw new Error('GitHub API: HTTP ' + response.status);
      }
      return await response.json();
    } finally { clearTimeout(timer); }
  }

  function readCachedRelease(repo) {
    try {
      const raw = sessionStorage.getItem('portfolio-v1.1-release:' + githubUser + '/' + repo);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      return Date.now() - cached.time < CACHE_TTL_MS ? cached.release : null;
    } catch (error) { return null; }
  }
  function cacheRelease(repo, release) {
    try { sessionStorage.setItem('portfolio-v1.1-release:' + githubUser + '/' + repo, JSON.stringify({ time: Date.now(), release: release })); } catch (error) { /* cache opcional */ }
  }
  function validateDownload(asset, repo) {
    if (!asset || typeof asset.name !== 'string' || !/\.apk$/i.test(asset.name)) return null;
    try {
      const url = new URL(asset.browser_download_url);
      const prefix = '/' + githubUser + '/' + repo + '/releases/download/';
      return url.protocol === 'https:' && url.hostname === 'github.com' && url.pathname.toLowerCase().startsWith(prefix.toLowerCase()) ? url.href : null;
    } catch (error) { return null; }
  }
  function isApkArtifact(artifact) {
    return artifact && !artifact.expired && typeof artifact.name === 'string'
      && /(?:\.apk$|(?:^|[^a-z])apk(?:[^a-z]|$))/i.test(artifact.name)
      && artifact.workflow_run && Number.isSafeInteger(artifact.workflow_run.id)
      && artifact.workflow_run.id > 0;
  }

  async function findApkArtifact(repo) {
    // Apenas dados públicos. Nunca cria URLs assinadas de download nem solicita tokens.
    try {
      const result = await fetchJson(API_BASE + '/repos/' + encodeURIComponent(githubUser)
        + '/' + encodeURIComponent(repo) + '/actions/artifacts?per_page=100');
      if (!result || !Array.isArray(result.artifacts)) return null;
      const matches = result.artifacts.filter(isApkArtifact).sort(function (a, b) {
        return String(b.created_at || '').localeCompare(String(a.created_at || ''));
      });
      return matches.length ? matches[0].workflow_run.id : null;
    } catch (error) { return null; }
  }

  async function loadRelease(repo) {
    if (fetchedReleases.has(repo)) return fetchedReleases.get(repo);
    if (fetchingReleases.has(repo)) return fetchingReleases.get(repo);
    const cached = readCachedRelease(repo);
    if (cached) { fetchedReleases.set(repo, cached); return cached; }
    if (limitedByApi || !safeRepoName(repo)) return { error: true };
    const promise = (async function () {
      try {
        // Releases incluem pré-lançamentos; tags sem Release não são tratadas como download.
        // Procura até 100 Releases, sem consultar infinitamente o histórico.
        const releaseList = [];
        for (let page = 1; page <= 2; page += 1) {
          const result = await fetchJson(API_BASE + '/repos/' + encodeURIComponent(githubUser)
            + '/' + encodeURIComponent(repo) + '/releases?per_page=50&page=' + page);
          if (!Array.isArray(result)) throw new Error('Lista de Releases inválida');
          releaseList.push.apply(releaseList, result.filter(function (entry) { return !entry.draft; }));
          if (result.length < 50) break;
        }
        const newest = releaseList[0] || null;
        const withApk = releaseList.find(function (entry) {
          return Array.isArray(entry.assets) && entry.assets.some(function (asset) {
            return validateDownload(asset, repo);
          });
        });
        const apkAsset = withApk && withApk.assets.find(function (asset) { return validateDownload(asset, repo); });
        const known = KNOWN.find(function (item) { return item.repo.toLowerCase() === repo.toLowerCase(); });
        const android = known ? known.categories.includes('android') : repositoryList.some(function (item) {
          return item.repo.toLowerCase() === repo.toLowerCase() && item.categories.includes('android');
        });
        const artifactRun = !apkAsset && android ? await findApkArtifact(repo) : null;
        const release = {
          version: newest && newest.tag_name ? newest.tag_name : '',
          apkVersion: withApk && withApk.tag_name ? withApk.tag_name : '',
          pre: Boolean(withApk ? withApk.prerelease : newest && newest.prerelease),
          apk: apkAsset ? validateDownload(apkAsset, repo) : null,
          artifactRun: artifactRun,
          hasReleases: releaseList.length > 0
        };
        fetchedReleases.set(repo, release);
        cacheRelease(repo, release);
        return release;
      } catch (error) { return { error: true }; }
      finally { fetchingReleases.delete(repo); }
    })();
    fetchingReleases.set(repo, promise);
    return promise;
  }

  function observeReleases() {
    if (!('IntersectionObserver' in window)) {
      Array.from(grid.children).slice(0, 8).forEach(function (card) { loadRelease(card.dataset.repo).then(function (value) { applyRelease(card, value); }); });
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const card = entry.target;
        loadRelease(card.dataset.repo).then(function (release) {
          if (card.isConnected) applyRelease(card, release);
        });
      });
    }, { rootMargin: '170px' });
    Array.from(grid.children).forEach(function (card) { observer.observe(card); });
  }

  async function resolveGitHubUser() {
    /* A URL do repositório costuma redirecionar após renomear o usuário.
       Assim o site tenta descobrir o login atual antes de buscar projetos. */
    try {
      const repo = await fetchJson(API_BASE + '/repos/' + encodeURIComponent(INITIAL_GITHUB_USER) + '/' + PORTFOLIO_REPO);
      if (repo && repo.owner && safeRepoName(repo.owner.login)) githubUser = repo.owner.login;
    } catch (error) { /* segue com links estáticos e redirecionamentos do GitHub */ }
    $$('[data-profile]').forEach(function (anchor) { anchor.href = profileUrl(); });
  }
  async function loadRepositories() {
    await resolveGitHubUser();
    if (limitedByApi) { status.textContent = 'Catálogo local disponível. A API do GitHub atingiu o limite de consultas.'; renderProjects(); return; }
    try {
      const found = [];
      for (let page = 1; page <= 4; page += 1) {
        const result = await fetchJson(API_BASE + '/users/' + encodeURIComponent(githubUser) + '/repos?type=owner&sort=updated&per_page=100&page=' + page);
        if (!Array.isArray(result)) throw new Error('Resposta inesperada da API');
        found.push.apply(found, result);
        if (result.length < 100) break;
      }
      const safeRepos = found.filter(function (repo) {
        return repo && !repo.private && repo.name !== PORTFOLIO_REPO && safeRepoName(repo.name) && repo.owner && repo.owner.login.toLowerCase() === githubUser.toLowerCase();
      });
      if (!safeRepos.length) throw new Error('Nenhum repositório público retornado');
      repositoryList = safeRepos.map(projectDetails).sort(function (a, b) {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name, 'pt-BR');
      });
      status.textContent = 'Catálogo sincronizado com os repositórios públicos do GitHub.';
      renderProjects();
    } catch (error) {
      status.textContent = 'Mostrando projetos conhecidos. A atualização pelo GitHub não está disponível no momento.';
      renderProjects();
    }
  }

  setupNavigation();
  repositoryList.sort(function (a, b) { return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name, 'pt-BR'); });
  renderProjects();
  loadRepositories();
})();
