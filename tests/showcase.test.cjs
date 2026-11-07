const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
 const ui=fs.readFileSync(path.join(root,'src/ui.mjs'),'utf8');
 const {PROJECTS}=await import('../src/projects.mjs');
 const selected=['Vigia-IA','Explorador-XP','GitHub-Manager','UAI-Cortes'];
 assert.deepEqual(PROJECTS.filter(p=>p.featured).map(p=>p.repo).sort(),selected.sort());
 assert.match(html,/id="featured"/); assert.match(html,/id="projects"/);
 assert.match(ui,/createFeaturedCard/);assert.match(ui,/renderFeatured/);
 assert.match(css,/\.featured-grid/);assert.match(css,/\.featured-art/);
 for(const repo of selected) assert.ok(fs.existsSync(path.join(root,'assets/projects',repo+'.svg')));
 for(const old of ['MonitorRemoto','Nexora','Minha-Camera','Pulso']) assert.doesNotMatch(html,new RegExp('href="https://github.com/drilemoz/'+old+'"'));
 assert.match(html,/capas são ilustrações conceituais/i);
 console.log('Vitrine: 4 destaques ativos, catálogo secundário, capas e links seguros OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
