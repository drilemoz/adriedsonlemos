const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const ui=fs.readFileSync(path.join(root,'src/ui.mjs'),'utf8');
 const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
 const {PROJECTS}=await import('../src/projects.mjs');
 const stages=new Set(['Alfa','Beta','Em testes','Em evolução','Experimental','Estável']);
 for(const p of PROJECTS){assert.ok(stages.has(p.stage));const cover=fs.readFileSync(path.join(root,'assets/projects',p.repo+'.svg'),'utf8');assert.match(cover,/<svg\b/);assert.match(cover,/não é uma captura/i);assert.ok(Buffer.byteLength(cover)<6000);}
 assert.equal(fs.readdirSync(path.join(root,'assets/projects')).filter(x=>x.endsWith('.svg')).length,21);
 assert.match(ui,/loading = 'lazy'/);assert.match(ui,/Ilustração conceitual do projeto/);
 assert.match(ui,/Tag: /);assert.match(ui,/Release: /);
 assert.match(css,/\.project-artwork/);assert.match(html,/og:image[^>]*og-image\.png/);
 assert.match(html,/Versão do portal\s*<strong>v1\.8\.0<\/strong>/);
 assert.match(html,/<script type="module" src="\.\/app\.js"><\/script>/);
 assert.ok(fs.statSync(path.join(root,'og-image.png')).size>10000);
 assert.match(fs.readFileSync(path.join(root,'robots.txt'),'utf8'),/sitemap\.xml/);
 console.log('Capas, estágios, metadados, script modular e SEO OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
