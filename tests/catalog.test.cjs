const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const js = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const expected = [
  'BaixaFacil', 'Explorador-XP', 'GitHub-Manager', 'Lista-de-Compras',
  'LoteriasFacil', 'Meu-Vercel', 'MeuGiga', 'Minha-Camera',
  'MonitorRemoto', 'Nexora', 'Pulso', 'Tatica-Manager',
  'Termux-Manager', 'TermuxManager', 'UaiVozes', 'Vigia-IA', 'eureciclo'
].sort();
// Avalia somente o catálogo, sem iniciar a interface ou consultar a API.
const body = js.replace('  let githubUser = INITIAL_GITHUB_USER;', '  globalThis.__known = KNOWN; return;\n  let githubUser = INITIAL_GITHUB_USER;');
const ctx = {};
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(body, ctx);
const known = ctx.__known;
assert.equal(known.length, 17, 'Catálogo deve cobrir os 17 projetos públicos confirmados');
assert.deepEqual(Array.from(known, x => x.repo).sort(), expected);
assert.equal(new Set(known.map(x => x.repo.toLowerCase())).size, known.length);
for (const project of known) {
  assert.match(project.repo, /^[a-z0-9_.-]+$/i);
  assert.ok(project.name && project.description && project.kind && project.icon);
  assert.ok(Array.isArray(project.stack) && project.stack.length > 0);
  assert.ok(Array.isArray(project.categories) && project.categories.length > 0);
  assert.ok(project.categories.every(x => ['android', 'web', 'ferramentas'].includes(x)));
}
assert.equal(known.find(x => x.repo === 'TermuxManager').categories.includes('android'), false);
assert.equal(known.find(x => x.repo === 'Termux-Manager').categories.includes('android'), true);
console.log('Catálogo local validado: 17 projetos públicos, nomes, metadados, filtros e distinção Termux.');
