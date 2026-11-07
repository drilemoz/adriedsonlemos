const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const ui = fs.readFileSync(path.join(root, 'src/ui.mjs'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const contact = fs.readFileSync(path.join(root, 'contato.html'), 'utf8');
const contactScript = fs.readFileSync(path.join(root, 'contato.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
(async () => {
  const {createFeaturedCard,createPortfolioView,applyRelease,FEATURED_DETAIL_LINKS}=await import('../src/ui.mjs');
  const {offlineProjects}=await import('../src/catalog.mjs');
  assert.match(css, /:root \{\s*color-scheme: light;/);
  assert.match(css, /html\[data-theme="dark"\] \{\s*color-scheme: dark;/);
  for (const page of ['index.html','contato.html',...Object.values(FEATURED_DETAIL_LINKS).map(s=>s.replace('./',''))]) {
    const html=fs.readFileSync(path.join(root,page),'utf8');
    assert.match(html, /<html lang="pt-BR" data-theme="light">/);
    assert.match(html, /adriedson-theme-v21/);
    assert.match(html, /v2\.1\.0/);
  }
  assert.match(ui, /let preferred = 'light'/);
  assert.match(ui, /localStorage\.setItem\('adriedson-theme-v21', next\)/);
  assert.doesNotMatch(ui, /localStorage\.setItem\('adriedson-theme', selected\)/);
  assert.match(index, /id="catalog-count-label"/);
  assert.match(ui, /total\.textContent = String\(items\.length\)/);
  assert.match(app, /document\.querySelectorAll\('\.featured-card'\)/);
  assert.match(contact,/id="copy-whatsapp"/);
  assert.match(contactScript,/37998747642/);
  assert.match(contactScript,/is-success/);

  function node(tag){return {
    tag, className:'',textContent:'',dataset:{},children:[],attributes:{},
    append(...v){this.children.push(...v)},appendChild(v){this.children.push(v);return v},
    setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
    classList:{add(){},remove(){}},
    querySelector(s){const t=s.split('.').filter(Boolean);return this.children.find(x=>t.every(c=>x.className?.split(' ').includes(c)))||this.children.map(x=>x.querySelector?.(s)).find(Boolean)||null}
  }}
  const doc={createElement:node};
  const url=x=>'https://github.com/drilemoz/'+x;
  const featured=offlineProjects().filter(x=>x.featured);
  assert.equal(featured.length,4);
  for(let i=0;i<featured.length;i++){
    const card=createFeaturedCard(doc,featured[i],url,i);
    assert.equal(card.dataset.repo,featured[i].repo);
    assert.equal(card.querySelector('.featured-action').href,FEATURED_DETAIL_LINKS[featured[i].repo]);
    const link=card.querySelector('.project-link.release');
    assert.equal(link.hidden,true);
    applyRelease(card,{version:'v1.2.3',tag:'',apk:`https://github.com/drilemoz/${featured[i].repo}/releases/download/v1.2.3/app.apk`,apkVersion:'v1.2.3',artifactRun:null,pre:false},url);
    assert.equal(link.textContent,'↓ Baixar APK');
    assert.equal(link.hidden,false);
  }
  for(const slug of ['vigia-ia','explorador-xp','github-manager','uai-cortes']){
    const page=fs.readFileSync(path.join(root,'projetos',slug+'.html'),'utf8');
    for(const section of ['O que é o projeto','Principais funcionalidades','Limitações e requisitos','Documentação e validação','data-detail-card']) assert.match(page,new RegExp(section));
    assert.doesNotMatch(page,/screenshots?\//i);
  }
  const xml=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
  for(const slug of ['vigia-ia','explorador-xp','github-manager','uai-cortes'])assert.match(xml,new RegExp(slug+'\\.html'));
  console.log('v2.1: tema claro padrão, tema escuro opcional, 4 páginas, 4 APKs dinâmicos, filtros e contato OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
