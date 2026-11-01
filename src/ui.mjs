import { CATALOG_DATE, STUDIES } from './catalog.mjs';

function element(doc, tag, className = '', textValue) {
  const node = doc.createElement(tag);
  if (className) node.className = className;
  if (textValue !== undefined) node.textContent = textValue;
  return node;
}

function externalLink(doc, href, label, className) {
  const node = element(doc, 'a', className, label);
  node.href = href;
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  return node;
}

export function applyRelease(card, release, repoUrl) {
  if (!card || !release) return;
  const link = card.querySelector('.project-link.release');
  const meta = card.querySelector('.project-meta');
  if (!link || !meta) return;
  const version = card.querySelector('.project-version');
  const repo = card.dataset.repo;
  link.hidden = true;
  link.classList.remove('apk', 'artifact');
  link.removeAttribute('title');
  link.removeAttribute('aria-label');

  if (release.error) {
    if (version) version.textContent = 'Versão indisponível';
    meta.textContent = 'Não foi possível consultar os downloads no GitHub agora.';
    return;
  }
  if (version) {
    version.textContent = release.version ? 'Release: ' + release.version :
      release.tag ? 'Tag: ' + release.tag : 'Sem Release/tag pública';
    version.title = release.version ? 'Identificador da Release pública mais recente' :
      release.tag ? 'Tag pública mais recente; não indica uma Release disponível' :
        'Nenhuma versão foi localizada nas Releases/tags públicas';
  }
  if (release.apk) {
    meta.textContent = 'APK publicado: ' + (release.apkVersion || 'versão disponível') +
      (release.version && release.version !== release.apkVersion ? ' · há Release mais recente' : '') +
      (release.pre ? ' · pré-lançamento' : '');
    link.href = release.apk;
    link.textContent = '↓ Baixar APK';
    link.classList.add('apk');
    link.setAttribute('aria-label', 'Baixar APK de ' + card.dataset.title + ' nas Releases do GitHub');
    link.title = 'Download direto de um arquivo APK anexado a uma Release';
    link.hidden = false;
    return;
  }
  if (release.artifactRun) {
    meta.textContent = (release.version ? 'Release: ' + release.version + ' · ' : '') +
      'APK nos Artifacts do Actions · login necessário · arquivo temporário';
    link.href = repoUrl(repo) + '/actions/runs/' + release.artifactRun;
    link.textContent = 'Ver APK no Actions ↗';
    link.classList.add('artifact');
    link.setAttribute('aria-label', 'Abrir a execução do GitHub Actions com Artifact de APK de ' + card.dataset.title);
    link.title = 'Abra a execução e procure o Artifact; o download requer login e pode expirar';
    link.hidden = false;
    return;
  }
  if (release.version) {
    meta.textContent = 'Release: ' + release.version + ' · sem APK anexado' +
      (release.pre ? ' · pré-lançamento' : '');
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
  meta.textContent = release.tag ? 'Tag pública encontrada · sem Release com download.' :
    'Ainda não há Releases públicas com download.';
  if (card.dataset.android === 'true') {
    link.href = repoUrl(repo) + '/actions';
    link.textContent = 'Ver compilações ↗';
    link.title = 'Confira as execuções; pode não haver APK disponível';
    link.hidden = false;
  }
}

export function createProjectCard(doc, item, repoUrl) {
  const card = element(doc, 'article', 'project-card' + (item.featured ? ' featured' : ''));
  card.dataset.repo = item.repo;
  card.dataset.title = item.name;
  card.dataset.android = String(item.categories.includes('android'));
  if (item.hasCover) {
    const artwork = element(doc, 'figure', 'project-artwork');
    const image = element(doc, 'img', 'project-cover');
    image.src = './assets/projects/' + encodeURIComponent(item.repo) + '.svg';
    image.alt = 'Ilustração conceitual do projeto ' + item.name + '; não é uma captura do aplicativo';
    image.width = 720;
    image.height = 400;
    image.loading = 'lazy';
    image.decoding = 'async';
    artwork.append(image, element(doc, 'figcaption', '', 'Arte ilustrativa'));
    card.appendChild(artwork);
  }
  const top = element(doc, 'div', 'project-card-top');
  const marker = element(doc, 'div', 'project-markers');
  marker.appendChild(element(doc, 'span', 'project-kind', item.kind));
  const stage = element(doc, 'span', 'project-stage', item.archived ? 'Arquivado' : item.stage);
  stage.title = 'Etapa informativa; não é certificação de qualidade ou estabilidade do APK';
  marker.appendChild(stage);
  top.append(element(doc, 'span', 'project-icon', item.icon), marker);
  card.appendChild(top);
  card.appendChild(element(doc, 'h3', '', item.name));
  card.appendChild(element(doc, 'p', '', item.description));
  const tags = element(doc, 'div', 'tech-tags');
  item.stack.slice(0, 3).forEach((tag) => tags.appendChild(element(doc, 'span', '', tag)));
  card.appendChild(tags);
  const version = element(doc, 'div', 'project-version', 'Versão: consulta sob demanda');
  version.title = 'Releases e tags são consultadas via GitHub ao visualizar o projeto';
  card.appendChild(version);
  if (item.sourceVersion) {
    const declared = element(doc, 'div', 'project-code-version', `Código (README, ${CATALOG_DATE}): ${item.sourceVersion}`);
    declared.title = 'Versão declarada no código na data de conferência. Não comprova APK publicado ou compilação aprovada.';
    card.appendChild(declared);
  }
  card.appendChild(element(doc, 'div', 'project-meta', 'Código e documentação no GitHub'));
  const links = element(doc, 'div', 'project-links');
  links.appendChild(externalLink(doc, repoUrl(item.repo), 'Ver código ↗', 'project-link code'));
  if (Object.hasOwn(STUDIES, item.repo)) {
    const study = element(doc, 'a', 'project-link study', 'Análise técnica ↗');
    study.href = '#estudo-' + STUDIES[item.repo];
    study.setAttribute('aria-label', 'Ler análise técnica de ' + item.name);
    links.appendChild(study);
  }
  const releases = externalLink(doc, repoUrl(item.repo) + '/releases', 'Consultando versões...', 'project-link release');
  releases.hidden = true;
  links.appendChild(releases);
  card.appendChild(links);
  return card;
}

export function createPortfolioView(doc, client) {
  const grid = doc.querySelector('#projects');
  const status = doc.querySelector('#github-status');
  const total = doc.querySelector('#total');
  const empty = doc.querySelector('#empty');
  function render(items, totalCount) {
    grid.setAttribute('aria-busy', 'true');
    const fragment = doc.createDocumentFragment();
    for (const item of items) fragment.appendChild(createProjectCard(doc, item, client.repoUrl));
    grid.replaceChildren(fragment);
    total.textContent = String(totalCount);
    empty.hidden = items.length > 0;
    grid.setAttribute('aria-busy', 'false');
    return Array.from(grid.children);
  }
  return {
    render,
    setStatus: (text) => { status.textContent = text; },
    updateProfileLinks: () => doc.querySelectorAll('[data-profile]').forEach((link) => { link.href = client.profileUrl(); })
  };
}

export function setupControls(doc, { onCategory, onSearch }) {
  const themeButton = doc.querySelector('#theme-toggle');
  const metaTheme = doc.querySelector('meta[name="theme-color"]');
  function setTheme(theme) {
    const selected = theme === 'dark' ? 'dark' : 'light';
    doc.documentElement.dataset.theme = selected;
    themeButton.setAttribute('aria-label', selected === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    themeButton.querySelector('.theme-icon').textContent = selected === 'dark' ? '☀' : '☾';
    if (metaTheme) metaTheme.content = selected === 'dark' ? '#08090c' : '#ffffff';
    try { localStorage.setItem('adriedson-theme', selected); } catch { /* modo privado */ }
  }
  let preferred = 'light';
  try { preferred = localStorage.getItem('adriedson-theme') || 'light'; } catch { /* modo privado */ }
  setTheme(preferred);
  themeButton.addEventListener('click', () => setTheme(doc.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  const menu = doc.querySelector('#menu-toggle');
  const nav = doc.querySelector('#nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  doc.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
  doc.querySelector('#year').textContent = String(new Date().getFullYear());

  const filters = Array.from(doc.querySelectorAll('.filter'));
  filters.forEach((button) => button.addEventListener('click', () => {
    filters.forEach((other) => {
      other.classList.toggle('active', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    });
    onCategory(button.dataset.filter);
  }));
  doc.querySelector('#search').addEventListener('input', (event) => onSearch(event.target.value));
}
