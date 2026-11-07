const assert=require('node:assert/strict');
(async()=>{
 const {projectDetails,publicProjects,filterProjects,inferredCategories,safeRepoName}=await import('../src/catalog.mjs');
 assert.equal(projectDetails({name:'NovoApp',language:'Kotlin'}),null,'Somente projetos curados podem aparecer');
 assert.equal(projectDetails({name:'MonitorRemoto',archived:true}),null);
 assert.equal(projectDetails({name:'Vigia-IA',archived:true}),null);
 assert.equal(projectDetails({name:'GitHub-Manager',disabled:true}),null);
 assert.ok(projectDetails({name:'Vigia-IA'}).featured);
 assert.deepEqual(inferredCategories({description:'Flutter Android',language:'Dart'}),['android']);
 assert.equal(safeRepoName('../senha'),false);assert.equal(safeRepoName('..'),false);
 const owner={login:'drilemoz'};
 const repos=[{name:'Explorador-XP',owner},{name:'Explorador-XP',owner},{name:'eureciclo',owner},{name:'UAI-Cortes',owner,archived:true},{name:'Vigia-IA',owner,disabled:true},{name:'MeuGiga',owner:{login:'outro'}},{name:'TermuxManager',owner,fork:true},{name:'adriedsonlemos',owner},{name:'NovoApp',owner}];
 const list=publicProjects(repos,'drilemoz');
 assert.deepEqual(list.map(x=>x.repo),['Explorador-XP','eureciclo']);
 assert.equal(filterProjects(list,'android','explorador').length,1);
 assert.equal(filterProjects(list,'web','vUE').length,1);
 assert.equal(filterProjects(list,'todos','inexistente').length,0);
 console.log('API GitHub: curadoria, deduplicação, privacidade, forks, status e busca OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
