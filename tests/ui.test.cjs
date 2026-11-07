const assert=require('node:assert/strict');
(async()=>{
 const {createProjectCard,createFeaturedCard,applyRelease}=await import('../src/ui.mjs');
 const {offlineProjects}=await import('../src/catalog.mjs');
 function node(tag){return {tag,className:'',textContent:'',dataset:{},children:[],attributes:{},append(...v){this.children.push(...v)},appendChild(v){this.children.push(v);return v},setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},classList:{add(){},remove(){}},querySelector(s){const t=s.split('.').filter(Boolean);return this.children.find(x=>t.every(c=>x.className?.split(' ').includes(c)))||this.children.map(x=>x.querySelector?.(s)).find(Boolean)||null}};}
 const doc={createElement:node};const repoUrl=x=>'https://github.com/drilemoz/'+x;
 const source=offlineProjects().find(x=>x.repo==='Explorador-XP');
 const card=createProjectCard(doc,source,repoUrl);
 assert.equal(card.dataset.repo,'Explorador-XP');assert.equal(card.dataset.android,'true');
 assert.equal(card.querySelector('.project-cover').loading,'lazy');
 assert.equal(card.querySelector('.project-link.release').hidden,true);
 applyRelease(card,{version:'v1',apk:null,artifactRun:null,tag:'',pre:false},repoUrl);
 assert.equal(card.querySelector('.project-link.release').textContent,'Ver versões ↗');
 const featured=createFeaturedCard(doc,source,repoUrl,0);
 assert.ok(featured.querySelector('.featured-action'));assert.ok(featured.querySelector('.featured-art'));
 const malicious={...source,repo:'new-app',name:'<img src=x onerror=alert(1)>',description:'<script>bad</script>',hasCover:false};
 const safe=createProjectCard(doc,malicious,repoUrl);
 assert.equal(safe.children.find(x=>x.tag==='h3').textContent,malicious.name);
 assert.equal(safe.children.find(x=>x.tag==='p').textContent,malicious.description);
 assert.equal(safe.children.some(x=>x.tag==='script'),false);
 console.log('DOM seguro, capas, cartões de destaque e Releases OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
