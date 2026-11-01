const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
 const ui=fs.readFileSync(path.join(root,'src/ui.mjs'),'utf8');
 const {PROJECTS}=await import('../src/projects.mjs');
 const {STUDIES}=await import('../src/catalog.mjs');
 const repos=['Vigia-IA','Nexora','Pulso','Minha-Camera'];
 assert.equal((html.match(/class="showcase-card"/g)||[]).length,4);
 for(const repo of repos){const slug=STUDIES[repo];assert.ok(slug);
  assert.ok(html.includes('id="estudo-'+slug+'"'));assert.ok(html.includes('href="#estudo-'+slug+'"'));
  assert.ok(html.includes('https://github.com/drilemoz/'+repo));assert.ok(html.includes('assets/projects/'+repo+'.svg'));
 }
 assert.match(html,/fluxo técnico simplificado/i);assert.match(html,/não é captura de tela/i);
 for(const pattern of [/H\.264 experimental/i,/Wikipédia offline/i,/1\.0\.323\+323/,/0\.1\.0-alpha\.73/,/1\.4\.76/,/class="showcase-note"/]) assert.match(html,pattern);
 assert.match(css,/\.showcase-grid/);assert.match(css,/@media\(max-width:550px\)/);
 assert.deepEqual(PROJECTS.filter(x=>x.featured).map(x=>x.repo).sort(),repos.sort());
 assert.match(ui,/Análise técnica ↗/);
 assert.doesNotMatch(html,/visão monocular|CID H54|href="tel:/i);
 console.log('Estudos, fontes, navegação, quatro destaques e privacidade OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
