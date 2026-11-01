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
  // Instantâneo editorial verificado nos READMEs públicos em 01/11/2026.
  // Releases/tags são consultadas separadamente e não comprovam builds.
  const KNOWN = [
    {"repo": "Vigia-IA", "name": "Vigia IA", "stage": "Em evolução", "description": "App modular de monitoramento com IA local e câmeras IP/Android. Mapas offline, navegação ciclística e ajuste de ritmo durante a rota; transmissão e diagnóstico seguem em evolução.", "categories": ["android"], "kind": "Android / IA e mapas", "stack": ["Flutter", "IA local", "Mapas offline"], "icon": "◎", "featured": true, "sourceVersion": "1.0.323+323"},
    {"repo": "Nexora", "name": "Nexora", "stage": "Alfa", "description": "IA local Android com modelos GGUF e llama.cpp. Inclui biblioteca independente de Wikipédia offline com arquivos ZIM, índice SQLite FTS4 e leitor de artigos; integração da Wikipédia à IA ainda não implementada.", "categories": ["android"], "kind": "Android / IA offline", "stack": ["Kotlin", "llama.cpp", "ZIM / SQLite"], "icon": "✧", "featured": true, "sourceVersion": "0.1.0-alpha.38"},
    {"repo": "Minha-Camera", "name": "Minha Câmera", "stage": "Em testes", "description": "Usa um Android como câmera pela rede local. MJPEG, pareamento e comandos autenticados, lanterna remota conforme hardware e H.264 experimental; requer validação de estabilidade e FPS em aparelhos.", "categories": ["android", "ferramentas"], "kind": "Android / Câmera", "stack": ["Kotlin", "MJPEG / H.264", "Wi-Fi local"], "icon": "◉", "featured": true, "sourceVersion": "1.4.76"},
    {"repo": "Pulso", "name": "Pulso Bateria", "stage": "Alfa", "description": "Monitoramento de bateria offline com leituras identificadas, histórico e Labs de energia solar/carga/consumo. Painel remoto autorizado pela LAN, previsões condicionadas a dados e relatórios de testes.", "categories": ["android", "ferramentas"], "kind": "Android / Energia", "stack": ["Kotlin", "Compose", "Room / LAN"], "icon": "◍", "featured": true, "sourceVersion": "0.1.0-alpha.73"},
    {"repo": "UAI-Cortes", "name": "UAI Cortes", "stage": "Alfa", "description": "Editor de vídeo Android com cortes, união, PiP, legendas e exportação MP4. Presets de legendas, sincronização de palavras e reconhecimento opcional; modo Vosk offline preservado.", "categories": ["android"], "kind": "Android / Edição de vídeo", "stack": ["Kotlin", "Compose", "Media3"], "icon": "▹", "sourceVersion": "0.1.90"},
    {"repo": "QuantoSobra", "name": "Quanto Sobra?", "stage": "Alfa", "description": "Simulador offline de orçamento pessoal: renda CLT, MEI, PJ e outras modalidades, despesas, reservas e resultado mensal. Tributos editáveis não substituem apuração fiscal.", "categories": ["android"], "kind": "Android / Finanças", "stack": ["Kotlin", "Compose", "Offline"], "icon": "◈", "sourceVersion": "0.1.0-alpha.16"},
    {"repo": "Finan-as-Viagens", "name": "Finanças da Viagem", "stage": "Em evolução", "description": "Finanças offline de cicloviagem: receitas, gastos, carteiras, orçamento, planejamento, recicláveis e backups. Distingue ganhos e despesas do dia sem contar transferências como receita.", "categories": ["android"], "kind": "Android / Cicloviagem", "stack": ["Kotlin", "Compose", "SQLite"], "icon": "₢", "sourceVersion": "1.0.1"},
    {"repo": "InternetXP", "name": "Internet XP", "stage": "Em testes", "description": "Navegador Android com motor Mozilla GeckoView e visual inspirado no Windows XP. Abas, histórico, favoritos, downloads, menus contextuais e análise seletiva de mídias.", "categories": ["android", "ferramentas"], "kind": "Android / Navegador", "stack": ["GeckoView", "Android", "Navegação"], "icon": "◫", "sourceVersion": "1.0.40"},
    {"repo": "Explorador-XP", "name": "Explorador XP", "stage": "Alfa", "description": "Explorador de arquivos Android com bibliotecas de fotos/vídeos via MediaStore, players multimídia, ZIP, WebDAV, SMB2/SMB3 e acesso à rede quando autorizado. Preparação para Google Play em andamento.", "categories": ["android", "ferramentas"], "kind": "Android / Arquivos", "stack": ["Kotlin", "MediaStore", "SMB / WebDAV"], "icon": "▦", "sourceVersion": "0.1.0-alpha.143"},
    {"repo": "GitHub-Manager", "name": "GitHub Manager", "stage": "Em evolução", "description": "Administra repositórios, releases, GitHub Actions, downloads, Secrets e versões pelo Android. Inclui busca por AAB de Play em Releases/Artifacts, confirmação de arquivos e notificações opcionais.", "categories": ["android", "ferramentas"], "kind": "Android / DevTools", "stack": ["Android", "GitHub API", "CI/CD"], "icon": "⌘", "sourceVersion": "2.0.137"},
    {"repo": "UaiVozes", "name": "Uai Vozes", "stage": "Alfa", "description": "Texto para áudio no Android por ElevenLabs, com biblioteca de MP3 e salvamento via seletor SAF. Também oferece leitura por sintetizador Android sem consumir créditos do serviço.", "categories": ["android"], "kind": "Android / Áudio", "stack": ["Flutter", "ElevenLabs", "TTS Android"], "icon": "♫", "sourceVersion": "0.1.0-alpha.26+26"},
    {"repo": "BaixaFacil", "name": "Baixa Fácil", "stage": "Alfa", "description": "Navegador e gerenciador de downloads Android com histórico e favoritos. Busca local de endereços e sugestões online apenas quando ativadas, além de controles de transferência.", "categories": ["android", "ferramentas"], "kind": "Android / Downloads", "stack": ["Android", "WebView", "Downloads"], "icon": "↓", "sourceVersion": "0.1.0-alpha.84"},
    {"repo": "MeuGiga", "name": "MeuGiga", "stage": "Em testes", "description": "Acompanha o consumo de dados móveis por aplicativo, com histórico e alertas de franquia. Consulta de Wi-Fi permanece separada dos cálculos da franquia móvel.", "categories": ["android", "ferramentas"], "kind": "Android / Dados móveis", "stack": ["Kotlin", "Android", "UsageStats"], "icon": "▥", "sourceVersion": "0.1.9"},
    {"repo": "Meu-Vercel", "name": "Meu Vercel", "stage": "Em testes", "description": "Cliente Android da API Vercel para projetos e deploys. Permite promover deploys e solicitar rollback de produção com confirmação, sujeitos a permissões, plano e validação do resultado.", "categories": ["android", "ferramentas"], "kind": "Android / Deploys", "stack": ["Android", "Vercel API", "Deploys"], "icon": "△", "sourceVersion": "1.6.0"},
    {"repo": "MonitorRemoto", "name": "Monitor Remoto", "stage": "Alfa", "description": "Gerenciamento remoto autorizado entre Androids com telemetria, arquivos e temperatura pela LAN/VPN. Foto remota depende de permissão e preparo explícito no aparelho monitorado.", "categories": ["android", "ferramentas"], "kind": "Android / Rede", "stack": ["Kotlin", "LAN / VPN", "Autorização"], "icon": "⇄", "sourceVersion": "0.1.0-alpha.105"},
    {"repo": "Tatica-Manager", "name": "Tática Manager", "stage": "Em evolução", "description": "Jogo Android de gerenciamento de futebol em Flutter com partida 2D via Flame, elenco, estratégia, simulação e narração de eventos.", "categories": ["android"], "kind": "Android / Jogo", "stack": ["Flutter", "Dart", "Flame"], "icon": "⚽", "sourceVersion": "0.1.1.148"},
    {"repo": "Lista-de-Compras", "name": "Lista de Compras", "stage": "Em evolução", "description": "Listas de compras offline para Android com orçamento, histórico de preços e organização de itens. Backup de dados é importante na migração entre identificadores de aplicativo.", "categories": ["android"], "kind": "Android / Compras", "stack": ["Kotlin", "Material 3", "Offline"], "icon": "☷", "sourceVersion": "1.0.46+50"},
    {"repo": "eureciclo", "name": "Eu Reciclo", "stage": "Em evolução", "description": "Calculadora de materiais recicláveis com preços editáveis, histórico de vendas, metas de compra e backup. Aplicativo híbrido em Vue/Capacitor.", "categories": ["android", "web"], "kind": "Web / Android", "stack": ["Vue 3", "Vite", "Capacitor"], "icon": "♻", "sourceVersion": "1.4.12"},
    {"repo": "Termux-Manager", "name": "Termux Manager Android", "stage": "Experimental", "description": "Integração experimental do aplicativo Termux a um snapshot do TermuxManager em APK privado para Android; não é o mesmo projeto que a ferramenta de terminal.", "categories": ["android", "ferramentas"], "kind": "Android / Termux", "stack": ["Android", "Termux", "Integração"], "icon": "▣", "sourceVersion": "0.1.0-alpha.5"},
    {"repo": "TermuxManager", "name": "Termux Manager", "stage": "Estável", "description": "Gerenciador modular de projetos para o Termux: importa, prepara, executa, acompanha logs, gera backups e verifica atualizações com consentimento.", "categories": ["ferramentas"], "kind": "Terminal / Ferramenta", "stack": ["Termux", "CLI", "Automação"], "icon": ">_", "sourceVersion": "1.0.133"},
    {"repo": "LoteriasFacil", "name": "Loterias Fácil", "stage": "Beta", "description": "Aplicativo nativo Kotlin e Jetpack Compose para consulta de resultados, conferência de jogos e análises locais de loterias, com dados em SQLite.", "categories": ["android"], "kind": "Android / Dados", "stack": ["Kotlin", "Compose", "SQLite"], "icon": "◈", "sourceVersion": "3.0.0-beta.7"}
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

  // Para futuros repositórios descobertos pela API, só aplica categorias
  // quando a descrição/metadados indicam claramente a plataforma.
  function inferredCategories(item) {
    const details = [item.description || '', item.language || ''].concat(Array.isArray(item.topics) ? item.topics : [])
      .join(' ').toLocaleLowerCase('pt-BR');
    const result = [];
    if (/android|jetpack|flutter|capacitor|\.apk\b|geckoview/.test(details)) result.push('android');
    if (/website|página web|web app|site|javascript|typescript|html|vue|react|vite/.test(details)) result.push('web');
    if (/ferramenta|gerenciador|utility|utilitário|cli|terminal|automação|devtools/.test(details)) result.push('ferramentas');
    return result;
  }

  function projectDetails(item) {
    const known = KNOWN.find(function (entry) { return entry.repo.toLowerCase() === item.name.toLowerCase(); });
    return Object.assign({
      repo: item.name,
      name: item.name,
      description: item.description || 'Projeto de desenvolvimento disponível no meu GitHub.',
      categories: inferredCategories(item), kind: 'Código / Projeto', stack: item.language ? [item.language] : [], icon: '⌘', stage: 'Projeto público', featured: false
    }, known || {}, { repo: item.name, archived: Boolean(item.archived) });
  }

  function applyRelease(card, release) {
    if (!card || !release) return;
    const link = card.querySelector('.project-link.release');
    const meta = card.querySelector('.project-meta');
    if (!link || !meta) return;
    const versionBadge = card.querySelector('.project-version');
    const repo = card.dataset.repo;
    link.hidden = true;
    link.classList.remove('apk', 'artifact');
    link.removeAttribute('title');
    link.removeAttribute('aria-label');

    if (release.error) {
      if (versionBadge) versionBadge.textContent = 'Versão indisponível';
      meta.textContent = 'Não foi possível consultar os downloads no GitHub agora.';
      return;
    }

    if (versionBadge) {
      // Tag do GitHub não é sinônimo de Release, e nome de Release não prova APK pronto.
      versionBadge.textContent = release.version ? 'Release: ' + release.version
        : release.tag ? 'Tag: ' + release.tag : 'Sem Release/tag pública';
      versionBadge.title = release.version ? 'Identificador da Release pública mais recente'
        : release.tag ? 'Tag pública mais recente; não indica uma Release disponível'
          : 'Nenhuma versão foi localizada nas Releases/tags públicas';
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

    meta.textContent = release.tag ? 'Tag pública encontrada · sem Release com download.' : 'Ainda não há Releases públicas com download.';
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
      // Capas conceituais locais não representam capturas reais da interface.
      // Novos repositórios da API, ainda não catalogados, mostram o ícone original.
      if (KNOWN.some(function (entry) { return entry.repo === item.repo; })) {
        const artwork = element('figure', 'project-artwork');
        const image = element('img', 'project-cover');
        image.src = './assets/projects/' + encodeURIComponent(item.repo) + '.svg';
        image.alt = 'Ilustração conceitual do projeto ' + item.name + '; não é uma captura do aplicativo';
        image.width = 720;
        image.height = 400;
        image.loading = 'lazy';
        image.decoding = 'async';
        artwork.append(image, element('figcaption', '', 'Arte ilustrativa'));
        card.appendChild(artwork);
      }
      const top = element('div', 'project-card-top');
      const marker = element('div', 'project-markers');
      marker.appendChild(element('span', 'project-kind', item.kind));
      const stage = item.archived ? 'Arquivado' : (item.stage || 'Projeto público');
      const statusBadge = element('span', 'project-stage', stage);
      statusBadge.title = 'Etapa informativa; não é certificação de qualidade ou estabilidade do APK';
      marker.appendChild(statusBadge);
      top.append(element('span', 'project-icon', item.icon), marker);
      card.appendChild(top);
      card.appendChild(element('h3', '', item.name));
      card.appendChild(element('p', '', item.description));
      const tags = element('div', 'tech-tags');
      item.stack.slice(0, 3).forEach(function (tag) { tags.appendChild(element('span', '', tag)); });
      card.appendChild(tags);
      const versionBadge = element('div', 'project-version', 'Versão: consulta sob demanda');
      versionBadge.title = 'Releases e tags são consultadas via GitHub ao visualizar o projeto';
      card.appendChild(versionBadge);
      if (item.sourceVersion) {
        const declared = element('div', 'project-code-version', 'Código (README, 01/11/2026): ' + item.sourceVersion);
        declared.title = 'Versão declarada no código na data de conferência. Não comprova APK publicado ou compilação aprovada.';
        card.appendChild(declared);
      }
      card.appendChild(element('div', 'project-meta', 'Código e documentação no GitHub'));
      const links = element('div', 'project-links');
      links.appendChild(makeExternal(repoUrl(item.repo), 'Ver código ↗', 'project-link code'));
      const studies = { 'Vigia-IA': 'vigia-ia', 'Nexora': 'nexora', 'Pulso': 'pulso-bateria', 'Minha-Camera': 'minha-camera' };
      if (Object.prototype.hasOwnProperty.call(studies, item.repo)) {
        const caseLink = element('a', 'project-link study', 'Análise técnica ↗');
        caseLink.href = '#estudo-' + studies[item.repo];
        caseLink.setAttribute('aria-label', 'Ler análise técnica de ' + item.name);
        links.appendChild(caseLink);
      }
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
      const raw = sessionStorage.getItem('portfolio-v1.7-release:' + githubUser + '/' + repo);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      return Date.now() - cached.time < CACHE_TTL_MS ? cached.release : null;
    } catch (error) { return null; }
  }
  function cacheRelease(repo, release) {
    try { sessionStorage.setItem('portfolio-v1.7-release:' + githubUser + '/' + repo, JSON.stringify({ time: Date.now(), release: release })); } catch (error) { /* cache opcional */ }
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
        // Repositórios sem Release podem ter tags versionadas. Consultamos uma vez
        // e identificamos claramente como TAG, nunca como Release nem APK.
        let newestTag = '';
        if (!newest) {
          try {
            const tags = await fetchJson(API_BASE + '/repos/' + encodeURIComponent(githubUser)
              + '/' + encodeURIComponent(repo) + '/tags?per_page=1');
            newestTag = Array.isArray(tags) && tags[0] && typeof tags[0].name === 'string' ? tags[0].name : '';
          } catch (error) { /* Tags indisponíveis não invalidam os dados de Releases */ }
        }
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
          tag: newestTag,
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
      const cards = Array.from(grid.children);
      // Navegadores antigos: todas as versões são consultáveis, com poucas
      // requisições simultâneas para não sobrecarregar a API pública.
      let cursor = 0;
      async function worker() {
        while (cursor < cards.length) {
          const card = cards[cursor++];
          const value = await loadRelease(card.dataset.repo);
          if (card.isConnected) applyRelease(card, value);
        }
      }
      for (let i = 0; i < Math.min(3, cards.length); i += 1) worker();
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
