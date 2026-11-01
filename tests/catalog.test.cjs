const assert = require('node:assert/strict');
(async () => {
  const { PROJECTS } = await import('../src/projects.mjs');
  const { offlineProjects, CATALOG_DATE } = await import('../src/catalog.mjs');
  const expected = [
    'BaixaFacil', 'Explorador-XP', 'GitHub-Manager', 'Lista-de-Compras',
    'LoteriasFacil', 'Finan-as-Viagens', 'InternetXP', 'Meu-Vercel', 'MeuGiga', 'Minha-Camera',
    'MonitorRemoto', 'QuantoSobra', 'Nexora', 'Pulso', 'Tatica-Manager',
    'Termux-Manager', 'TermuxManager', 'UAI-Cortes', 'UaiVozes', 'Vigia-IA', 'eureciclo'
  ].sort();
  assert.equal(PROJECTS.length, 21);
  assert.deepEqual(PROJECTS.map(x => x.repo).sort(), expected);
  assert.equal(CATALOG_DATE, '01/11/2026');
  assert.equal(new Set(PROJECTS.map(x => x.repo.toLowerCase())).size, PROJECTS.length);
  for (const project of PROJECTS) {
    assert.match(project.repo, /^[a-z0-9_.-]+$/i);
    assert.ok(project.name && project.description && project.kind && project.icon);
    assert.match(project.sourceVersion, /^\d+\.\d+(?:\.\d+)?(?:[-+.][\w.-]+)*$/);
    assert.ok(Array.isArray(project.stack) && project.stack.length > 0);
    assert.ok(Array.isArray(project.categories) && project.categories.length > 0);
    assert.ok(project.categories.every(x => ['android', 'web', 'ferramentas'].includes(x)));
  }
  const snapshot = offlineProjects();
  assert.equal(snapshot.length, 21);
  assert.equal(snapshot[0].featured, true);
  assert.equal(snapshot.find(x => x.repo === 'TermuxManager').categories.includes('android'), false);
  assert.equal(snapshot.find(x => x.repo === 'Termux-Manager').categories.includes('android'), true);
  snapshot[0].stack.push('ISOLADO');
  assert.equal(PROJECTS.find(x => x.repo === snapshot[0].repo).stack.includes('ISOLADO'), false);
  console.log('Catálogo: 21 projetos, versões, filtros e cópias defensivas OK.');
})().catch(e => { console.error(e); process.exitCode = 1; });
