const assert = require('node:assert/strict');
(async () => {
  const { projectDetails, publicProjects, filterProjects, inferredCategories, safeRepoName } = await import('../src/catalog.mjs');
  assert.ok(projectDetails({name:'NovoApp',description:'Android Jetpack Compose',language:'Kotlin'}).categories.includes('android'));
  assert.ok(projectDetails({name:'NovoSite',description:'Site em Vue',language:'TypeScript'}).categories.includes('web'));
  assert.equal(projectDetails({name:'PesquisaRust',description:'Pesquisa independente',language:'Rust'}).categories.length,0);
  assert.deepEqual(projectDetails({name:'TermuxManager',description:'Sem info',language:'Shell'}).categories,['ferramentas']);
  assert.deepEqual(inferredCategories({description:null,topics:[4,null],language:null}),[]);
  assert.equal(safeRepoName('../senha'),false);
  assert.equal(safeRepoName('..'),false);
  assert.equal(projectDetails({name:'../x'}),null);
  const owner = {login:'drilemoz'};
  const repos = [
    {name:'NovoApp', owner, description:'Android Flutter',language:'Dart'},
    {name:'NovoApp', owner, description:'Android Flutter',language:'Dart'},
    {name:'NovoSite',owner,description:'site Vue',language:'TypeScript'},
    {name:'adriedsonlemos',owner,description:'site'},
    {name:'Private',owner,private:true},
    {name:'Fork',owner,fork:true},
    {name:'Outsider',owner:{login:'outro'}},
    {name:'../secret',owner}
  ];
  const list = publicProjects(repos,'drilemoz');
  assert.deepEqual(list.map(x=>x.repo),['Fork','NovoApp','NovoSite']);
  assert.equal(filterProjects(list, 'android','novo').length,1);
  assert.equal(filterProjects(list,'web','vUE').length,1);
  assert.equal(filterProjects(list,'todos','inexistente').length,0);
  console.log('Repositórios futuros: inferência, privacidade, deduplicação e filtros OK.');
})().catch(e => { console.error(e); process.exitCode = 1; });
