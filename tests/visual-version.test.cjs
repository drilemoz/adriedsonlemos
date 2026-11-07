const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const contact=fs.readFileSync(path.join(root,'contato.html'),'utf8');
 const ui=fs.readFileSync(path.join(root,'src/ui.mjs'),'utf8');
 const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
 const {PROJECTS}=await import('../src/projects.mjs');
 for(const p of PROJECTS){const cover=fs.readFileSync(path.join(root,'assets/projects',p.repo+'.svg'),'utf8');assert.match(cover,/<svg\b/);assert.ok(Buffer.byteLength(cover)<6000)}
 assert.match(ui,/loading = 'lazy'/);assert.match(ui,/Tag: /);assert.match(ui,/Release: /);
 assert.match(css,/@media\(max-width:620px\)/);assert.match(css,/prefers-reduced-motion/);
 assert.match(html,/og:image[^>]*og-image\.png/);assert.match(contact,/canonical/);
 assert.match(html,/v2\.0\.0/);assert.match(contact,/v2\.0\.0/);
 assert.match(html,/<script type="module" src="\.\/app\.js"><\/script>/);
 assert.match(contact,/<script type="module" src="\.\/contato\.js"><\/script>/);
 assert.ok(fs.statSync(path.join(root,'og-image.png')).size>10000);
 assert.match(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),/contato\.html/);
 assert.match(fs.readFileSync(path.join(root,'robots.txt'),'utf8'),/sitemap\.xml/);
 console.log('Design mobile, reduz movimento, SEO, duas páginas e imagens locais OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
