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
  view.renderFeatured(projects.filter(project => project.featured));
  const secondary = projects.filter(project => !project.featured);
  const cards = view.render(filterProjects(secondary, category, search), secondary.length);
  observeReleases([...document.querySelectorAll('.featured-card'), ...cards]);
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
    view.setStatus('Lista local conferida em 07/11/2026. O estado atual dos repositórios não pôde ser confirmado (limite da API).');
    render();
    return;
  }
  try {
    const repositories = publicProjects(await client.listPublicRepositories(), client.getUser());
    if (!repositories.length) throw new Error('Nenhum repositório público encontrado');
    projects = repositories;
    view.setStatus('Lista atualizada pelo GitHub. Repositórios privados, arquivados, desativados e não selecionados ficam de fora.');
  } catch {
    view.setStatus('Lista local conferida em 07/11/2026. Não foi possível confirmar mudanças recentes no GitHub.');
  }
  render();
}

synchronizeGithub();
