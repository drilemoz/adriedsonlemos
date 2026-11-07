const assert=require('node:assert/strict');
(async()=>{
 const {PROJECTS}=await import('../src/projects.mjs');
 const {offlineProjects,CATALOG_DATE,publicProjects}=await import('../src/catalog.mjs');
 const expected=['Vigia-IA','Explorador-XP','GitHub-Manager','UAI-Cortes','Celular-Remoto','eureciclo','Finan-as-Viagens','Lista-de-Compras','Meu-Site','MeuGiga','QuantoSobra','Tatica-Manager','Termux-Manager','TermuxManager'];
 assert.equal(CATALOG_DATE,'07/11/2026');
 assert.deepEqual(PROJECTS.map(x=>x.repo).sort(),expected.sort());
 assert.equal(new Set(PROJECTS.map(x=>x.repo.toLowerCase())).size,14);
 assert.deepEqual(PROJECTS.filter(x=>x.featured).map(x=>x.repo).sort(),['Vigia-IA','Explorador-XP','GitHub-Manager','UAI-Cortes'].sort());
 for(const p of PROJECTS){assert.ok(p.name && p.description && p.kind && p.icon);assert.ok(Array.isArray(p.stack)&&p.stack.length);assert.ok(p.categories.every(x=>['android','web','ferramentas'].includes(x)));assert.ok(p.stage);}
 const local=offlineProjects();assert.equal(local.length,14);
 local[0].stack.push('ISOLADO'); assert.ok(!PROJECTS.find(x=>x.repo===local[0].repo).stack.includes('ISOLADO'));
 const owner={login:'drilemoz'};
 const list=publicProjects([{name:'Vigia-IA',owner,archived:false},{name:'MonitorRemoto',owner,archived:true},{name:'Nexora',owner},{name:'UAI-Cortes',owner,disabled:true},{name:'GitHub-Manager',owner,fork:true},{name:'Explorador-XP',owner,private:true},{name:'MeuGiga',owner,archived:false}], 'drilemoz');
 assert.deepEqual(list.map(x=>x.repo),['Vigia-IA','MeuGiga']);
 console.log('Curadoria: 14 ativos conhecidos, 4 destaques, arquivados/indisponíveis/privados/forks excluídos.');
})().catch(e=>{console.error(e);process.exitCode=1});
