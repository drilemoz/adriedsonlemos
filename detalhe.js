/* Detalhes: conteúdo estático indexável + consulta progressiva da Release pública. */
import { setupShell, applyRelease } from './src/ui.mjs';
import { createGithubClient } from './src/github.mjs';

setupShell(document);
const panel = document.querySelector('[data-detail-card]');
if (panel) {
  let storage = null;
  try { storage = window.sessionStorage; } catch { /* modo privado */ }
  const client = createGithubClient({ storage });
  const repo = panel.dataset.repo;
  const allowed = new Set(['Vigia-IA', 'Explorador-XP', 'GitHub-Manager', 'UAI-Cortes']);
  if (allowed.has(repo)) {
    client.loadRelease(repo, true).then((release) => {
      if (panel.isConnected) applyRelease(panel, release, client.repoUrl);
    });
  }
}
