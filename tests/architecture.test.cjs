const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const {execFileSync}=require('node:child_process');
const dir=path.resolve(__dirname,'..');
const files=['app.js','src/catalog.mjs','src/github.mjs','src/ui.mjs','src/projects.mjs'];
for(const file of files){
 const source=fs.readFileSync(path.join(dir,file),'utf8');
 execFileSync(process.execPath,['--check',path.join(dir,file)]);
 assert.doesNotMatch(source,/\.innerHTML\s*=/,'Não renderizar HTML da API');
 assert.doesNotMatch(source,/github_pat_[a-zA-Z0-9]|ghp_[a-zA-Z0-9]/,'Sem credenciais embutidas');
}
const entry=fs.readFileSync(path.join(dir,'app.js'),'utf8');
assert.match(entry,/import \{ offlineProjects, publicProjects, filterProjects \}/);
assert.match(entry,/import \{ createGithubClient \}/);
assert.match(entry,/import \{ createPortfolioView, applyRelease, setupControls \}/);
assert.ok(fs.statSync(path.join(dir,'app.js')).size<6000,'Entrada deve permanecer pequena');
assert.equal(fs.existsSync(path.join(dir,'package.json')),false,'Sem dependências obrigatórias ou etapa de build');
console.log('Arquitetura modular, sintaxe, entrada enxuta, DOM seguro e zero dependências OK.');
