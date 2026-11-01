import { PROJECTS } from './projects.mjs';

export const CATALOG_DATE = '01/11/2026';
export const PORTFOLIO_REPO = 'adriedsonlemos';
export const INITIAL_GITHUB_USER = 'drilemoz';
export const STUDIES = Object.freeze({
  'Vigia-IA': 'vigia-ia',
  Nexora: 'nexora',
  Pulso: 'pulso-bateria',
  'Minha-Camera': 'minha-camera'
});

const knownByName = new Map(PROJECTS.map((project) => [project.repo.toLowerCase(), project]));

export function safeRepoName(name) {
  return typeof name === 'string' && name !== '.' && name !== '..' && /^[A-Za-z0-9_.-]+$/.test(name);
}

// Nenhuma categoria é presumida quando a API não fornece indícios suficientes.
export function inferredCategories(repo) {
  const text = [repo.description || '', repo.language || '', ...(Array.isArray(repo.topics) ? repo.topics : [])]
    .filter((value) => typeof value === 'string').join(' ').toLocaleLowerCase('pt-BR');
  const categories = [];
  if (/android|jetpack|flutter|capacitor|\.apk\b|geckoview/.test(text)) categories.push('android');
  if (/website|página web|web app|site|javascript|typescript|html|vue|react|vite/.test(text)) categories.push('web');
  if (/ferramenta|gerenciador|utility|utilitário|cli|terminal|automação|devtools/.test(text)) categories.push('ferramentas');
  return categories;
}

export function projectDetails(repo) {
  if (!repo || !safeRepoName(repo.name)) return null;
  const known = knownByName.get(repo.name.toLowerCase());
  return {
    repo: repo.name,
    name: known?.name || repo.name,
    description: known?.description || repo.description || 'Projeto de desenvolvimento disponível no meu GitHub.',
    categories: known ? [...known.categories] : inferredCategories(repo),
    kind: known?.kind || 'Código / Projeto',
    stack: known ? [...known.stack] : (typeof repo.language === 'string' && repo.language ? [repo.language] : []),
    icon: known?.icon || '⌘',
    stage: known?.stage || 'Projeto público',
    featured: Boolean(known?.featured),
    sourceVersion: known?.sourceVersion || null,
    hasCover: Boolean(known),
    archived: Boolean(repo.archived)
  };
}

export function offlineProjects() {
  return sortProjects(PROJECTS.map((known) => ({
    ...known, categories: [...known.categories], stack: [...known.stack], archived: false, hasCover: true
  })));
}

export function publicProjects(repos, githubUser) {
  if (!Array.isArray(repos) || !safeRepoName(githubUser)) return [];
  const unique = new Map();
  for (const repo of repos) {
    if (!repo || repo.private || !safeRepoName(repo.name) || !repo.owner ||
        String(repo.owner.login).toLowerCase() !== githubUser.toLowerCase() ||
        repo.name.toLowerCase() === PORTFOLIO_REPO.toLowerCase()) continue;
    const project = projectDetails(repo);
    if (project) unique.set(repo.name.toLowerCase(), project);
  }
  return sortProjects([...unique.values()]);
}

export function sortProjects(projects) {
  return [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    a.name.localeCompare(b.name, 'pt-BR'));
}

export function filterProjects(projects, category = 'todos', search = '') {
  const term = search.trim().toLocaleLowerCase('pt-BR');
  return projects.filter((project) => {
    const categories = project.categories || [];
    if (category !== 'todos' && !categories.includes(category)) return false;
    const haystack = [project.name, project.repo, project.description, project.kind, ...(project.stack || [])]
      .filter(Boolean).join(' ').toLocaleLowerCase('pt-BR');
    return haystack.includes(term);
  });
}
