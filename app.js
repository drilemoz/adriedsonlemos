/* Entrada do portfólio: orquestra módulos independentes, sem build nem framework. */
import { offlineProjects, publicProjects, filterProjects } from './src/catalog.mjs';
import { createGithubClient } from './src/github.mjs';
import { createPortfolioView, applyRelease, setupControls } from './src/ui.mjs';

const client = createGithubClient({ storage: getSessionStorage() });
const view = createPortfolioView(document, client);
let projects = offlineProjects();
let category = 'todos';
let search = '';
let observer = null;

function getSessionStorage() {
  try { return window.sessionStorage; } catch { return null; }
}

function applyToConnectedCard(card, release) {
  if (card.isConnected) applyRelease(card, release, client.repoUrl);
}

function observeReleases(cards) {
  if (observer) observer.disconnect();
  if (!('IntersectionObserver' in window)) {
    let cursor = 0;
    const workers = Math.min(3, cards.length);
    for (let n = 0; n < workers; n += 1) {
      (async () => {
        while (cursor < cards.length) {
          const card = cards[cursor++];
          const release = await client.loadRelease(card.dataset.repo, card.dataset.android === 'true');
          applyToConnectedCard(card, release);
        }
      })();
    }
    return;
  }
  const current = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      current.unobserve(entry.target);
      const card = entry.target;
      client.loadRelease(card.dataset.repo, card.dataset.android === 'true')
        .then((release) => applyToConnectedCard(card, release));
    }
  }, { rootMargin: '170px' });
  observer = current;
  cards.forEach((card) => current.observe(card));
}

function render() {
  const cards = view.render(filterProjects(projects, category, search), projects.length);
  observeReleases(cards);
}

setupControls(document, {
  onCategory(value) { category = value; render(); },
  onSearch(value) { search = value; render(); }
});
render();

async function synchronizeGithub() {
  await client.resolveOwner();
  view.updateProfileLinks();
  if (client.isRateLimited()) {
    view.setStatus('Catálogo local disponível. A API do GitHub atingiu o limite de consultas.');
    render();
    return;
  }
  try {
    const repositories = publicProjects(await client.listPublicRepositories(), client.getUser());
    if (!repositories.length) throw new Error('Nenhum repositório público encontrado');
    projects = repositories;
    view.setStatus('Catálogo sincronizado com os repositórios públicos do GitHub.');
  } catch {
    view.setStatus('Mostrando projetos conhecidos. A atualização pelo GitHub não está disponível no momento.');
  }
  render();
}

synchronizeGithub();
