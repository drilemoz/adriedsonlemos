/* Portfólio público de Adriedson Lemos.
 * Sem frameworks, rastreadores, tokens privados ou dependências externas.
 * Após mudar o username no GitHub, atualize INITIAL_GITHUB_USER.
 */
(function () {
  'use strict';

  const INITIAL_GITHUB_USER = 'adriedsonlemoz';
  const PORTFOLIO_REPO = 'adriedsonlemos';
  const API_BASE = 'https://api.github.com';
  const CACHE_TTL_MS = 30 * 60 * 1000;
  const KNOWN = [
    { repo: 'Vigia-IA', name: 'Vigia IA', description: 'Monitoramento com IA local, câmeras e um módulo de mapas e navegação pensado também para cicloviagem.', categories: ['android'], kind: 'Android / IA', stack: ['Flutter', 'IA local', 'Mapas offline'], icon: '◎', featured: true },
    { repo: 'Explorador-XP', name: 'Explorador XP', description: 'Explorador de arquivos Android com organização, multimídia e recursos de acesso e transferência pela rede.', categories: ['android', 'ferramentas'], kind: 'Android / Utilitário', stack: ['Kotlin', 'Arquivos', 'Rede local'], icon: '▦', featured: true },
    { repo: 'GitHub-Manager', name: 'GitHub Manager', description: 'Gerenciamento de repositórios, versões, builds, downloads e automações do GitHub pelo Android.', categories: ['android', 'ferramentas'], kind: 'Android / DevTools', stack: ['Flutter', 'GitHub API', 'CI/CD'], icon: '⌘', featured: true },
    { repo: 'Pulso', name: 'Pulso Bateria', description: 'Monitor de bateria Android com medições do sistema, histórico de sessões, gráficos e estimativas identificadas.', categories: ['android'], kind: 'Android / Energia', stack: ['Kotlin', 'Compose', 'Room'], icon: '◉', featured: true },
    { repo: 'MonitorRemoto', name: 'Monitor Remoto', description: 'Experimento Android de monitoramento e controle autorizado entre aparelhos conectados em rede.', categories: ['android', 'ferramentas'], kind: 'Android / Rede', stack: ['Kotlin', 'Wi-Fi', 'Segurança'], icon: '⇄' },
    { repo: 'SaldoReal', name: 'Saldo Real', description: 'Aplicativo Android para organizar lançamentos, contas, planejamento e relatórios financeiros.', categories: ['android'], kind: 'Android / Finanças', stack: ['Kotlin', 'Compose', 'Room'], icon: '▤' },
    { repo: 'eureciclo', name: 'Eu Reciclo', description: 'Cálculo de valores de materiais recicláveis, registro de vendas e metas de compra.', categories: ['android', 'web'], kind: 'Web / Android', stack: ['Vue', 'Vite', 'Capacitor'], icon: '♻' },
    { repo: 'ListaNomade', name: 'Lista Nômade', description: 'Organizador offline de compras, prioridades, orçamentos e equipamentos para o dia a dia ou uma viagem.', categories: ['android'], kind: 'Android / Offline', stack: ['Kotlin', 'Compras', 'Offline'], icon: '☷' },
    { repo: 'Lista-Supermercado', name: 'Lista de Mercado', description: 'Listas de compras, preços e recursos práticos de organização de supermercado.', categories: ['android'], kind: 'Android / Utilitário', stack: ['Kotlin', 'Android', 'Offline'], icon: '▣' },
    { repo: 'TermuxManager', name: 'Termux Manager', description: 'Ferramenta para importar, organizar, executar e administrar projetos no Termux do Android.', categories: ['ferramentas'], kind: 'Terminal / Ferramenta', stack: ['Termux', 'CLI', 'Automação'], icon: '>_' },
    { repo: 'PCBuilder', name: 'Meu PC', description: 'Projeto para montar e organizar configurações de computadores com aplicação web e empacotamento Android.', categories: ['web', 'android'], kind: 'Web / Android', stack: ['React', 'Vite', 'Capacitor'], icon: '▥' },
    { repo: 'GuiaDoa', name: 'Guia DOA', description: 'Guia comunitário independente para Dragons of Atlantis, com tutoriais, ferramentas e informações do jogo.', categories: ['web', 'android'], kind: 'Web / Comunidade', stack: ['React', 'Node.js', 'MongoDB'], icon: '♜' },
    { repo: 'MeuBolsaFamilia', name: 'Meu Bolsa Família', description: 'Projeto independente de consulta do calendário de pagamentos usando apenas o último dígito do NIS.', categories: ['android'], kind: 'Android / Utilidade', stack: ['React Native', 'Calendário', 'Offline'], icon: '▤' },
    { repo: 'LoteriasFacil', name: 'Loterias Fácil', description: 'Aplicativo de estudo e conferência de resultados, combinações e histórico de modalidades de loterias.', categories: ['android'], kind: 'Android / Dados', stack: ['Kotlin', 'Compose', 'SQLite'], icon: '◈' }
  ];

  let githubUser = INITIAL_GITHUB_USER;
  let filter = 'todos';
  let query = '';
  let repositoryList = KNOWN.map(function (data) { return Object.assign({}, data); });
  const fetchedReleases = new Map();
  const fetchingReleases = new Map();
  let observer = null;
  let remainingRequests = 0;
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
    if (meta && release.apkVersion) {
      meta.textContent = 'APK: ' + release.apkVersion + (release.version && release.version !== release.apkVersion ? ' · há release mais recente' : '') + (release.pre ? ' · pré-lançamento' : '');
    } else if (meta && release.version) {
      meta.textContent = 'Release: ' + release.version + (release.pre ? ' · pré-lançamento' : '');
    }
    if (release.apk && link) {
      link.href = release.apk;
      link.textContent = '↓ Baixar APK';
      link.classList.add('apk');
      link.setAttribute('aria-label', 'Baixar APK de ' + card.dataset.title + ' pelo GitHub');
      link.title = 'Arquivo APK publicado nas Releases do GitHub';
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
      links.appendChild(makeExternal(repoUrl(item.repo) + '/releases', 'Ver versões ↗', 'project-link release'));
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
        if (response.status === 403 || response.status === 429) limitedByApi = true;
        throw new Error('GitHub API: HTTP ' + response.status);
      }
      return await response.json();
    } finally { clearTimeout(timer); }
  }

  function readCachedRelease(repo) {
    try {
      const raw = sessionStorage.getItem('portfolio-release:' + githubUser + '/' + repo);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      return Date.now() - cached.time < CACHE_TTL_MS ? cached.release : null;
    } catch (error) { return null; }
  }
  function cacheRelease(repo, release) {
    try { sessionStorage.setItem('portfolio-release:' + githubUser + '/' + repo, JSON.stringify({ time: Date.now(), release: release })); } catch (error) { /* cache opcional */ }
  }
  function validateDownload(asset, repo) {
    if (!asset || typeof asset.name !== 'string' || !/\.apk$/i.test(asset.name)) return null;
    try {
      const url = new URL(asset.browser_download_url);
      const prefix = '/' + githubUser + '/' + repo + '/releases/download/';
      return url.protocol === 'https:' && url.hostname === 'github.com' && url.pathname.toLowerCase().startsWith(prefix.toLowerCase()) ? url.href : null;
    } catch (error) { return null; }
  }
  async function loadRelease(repo) {
    if (fetchedReleases.has(repo)) return fetchedReleases.get(repo);
    if (fetchingReleases.has(repo)) return fetchingReleases.get(repo);
    const cached = readCachedRelease(repo);
    if (cached) { fetchedReleases.set(repo, cached); return cached; }
    if (limitedByApi || !safeRepoName(repo)) return null;
    const promise = (async function () {
      try {
        /* A lista, e não /releases/latest, inclui pré-lançamentos públicos. */
        const releases = await fetchJson(API_BASE + '/repos/' + encodeURIComponent(githubUser) + '/' + encodeURIComponent(repo) + '/releases?per_page=12');
        if (!Array.isArray(releases)) return null;
        const newest = releases.find(function (release) { return !release.draft; });
        const withApk = releases.find(function (release) {
          return !release.draft && Array.isArray(release.assets) && release.assets.some(function (asset) { return validateDownload(asset, repo); });
        });
        const apkAsset = withApk && withApk.assets.find(function (asset) { return validateDownload(asset, repo); });
        const release = {
          version: newest && newest.tag_name ? newest.tag_name : '',
          apkVersion: withApk && withApk.tag_name ? withApk.tag_name : '',
          pre: Boolean(withApk ? withApk.prerelease : newest && newest.prerelease),
          apk: apkAsset ? validateDownload(apkAsset, repo) : null
        };
        fetchedReleases.set(repo, release);
        cacheRelease(repo, release);
        return release;
      } catch (error) { return null; }
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
