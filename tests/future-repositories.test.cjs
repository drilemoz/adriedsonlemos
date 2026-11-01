const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const js = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const body = js.replace('  setupNavigation();\n  repositoryList.sort',
  '  globalThis.__details = projectDetails; return;\n  setupNavigation();\n  repositoryList.sort');
const ctx = {document: {querySelector: () => ({})}};ctx.globalThis = ctx;
vm.createContext(ctx);vm.runInContext(body, ctx);
const infer = ctx.__details;
let r = infer({name: 'NovoApp', description: 'Aplicativo Android em Jetpack Compose', language:'Kotlin', topics: [], archived:false});
assert.ok(r.categories.includes('android'));
r = infer({name: 'NovoSite',description:'Site em Vue e Vite',language:'TypeScript',topics:[],archived:false});
assert.ok(r.categories.includes('web'));
r = infer({name:'SemInformacao',description:'Pesquisa independente',language:'Rust',topics:[],archived:false});
assert.equal(r.categories.length,0,'Não presumir categoria sem evidência');
r = infer({name:'TermuxManager',description:'Nova descrição indisponível',language:'Shell',topics:[],archived:false});
assert.deepEqual(Array.from(r.categories),['ferramentas'],'Dados editoriais prevalecem');
console.log('Categorias futuras validadas com inferência conservadora, catálogo atual preservado.');
