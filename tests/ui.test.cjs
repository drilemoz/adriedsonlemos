const assert=require('node:assert/strict');
(async()=>{
  const {createProjectCard,applyRelease}=await import('../src/ui.mjs');
  const {offlineProjects}=await import('../src/catalog.mjs');
  function node(tag){
    return {tag,className:'',textContent:'',dataset:{},children:[],attributes:{},
      append(...values){this.children.push(...values);},appendChild(value){this.children.push(value);return value;},
      setAttribute(k,v){this.attributes[k]=v;},removeAttribute(k){delete this.attributes[k];},
      classList:{add(){},remove(){}},
      querySelector(selector){
        const desired=selector.split('.').filter(Boolean);
        const match=this.children.find(x=>desired.every(c=>x.className?.split(' ').includes(c)));
        return match || this.children.map(x=>x.querySelector?.(selector)).find(Boolean) || null;
      }
    };
  }
  const doc={createElement:node};
  const source=offlineProjects().find(x=>x.repo==='Nexora');
  const card=createProjectCard(doc,source,(repo)=>'https://github.com/drilemoz/'+repo);
  assert.equal(card.dataset.repo,'Nexora');
  assert.equal(card.dataset.android,'true');
  assert.equal(card.querySelector('.project-cover').loading,'lazy');
  assert.ok(card.querySelector('.project-code-version').textContent.includes('0.1.0-alpha.38'));
  assert.equal(card.querySelector('.project-link.release').hidden,true);
  applyRelease(card,{version:'v1',apk:null,artifactRun:null,tag:'',pre:false},repo=>'https://github.com/drilemoz/'+repo);
  assert.equal(card.querySelector('.project-link.release').textContent,'Ver versões ↗');
  const malicious={...source,repo:'new-app',name:'<img src=x onerror=alert(1)>',description:'<script>bad</script>',hasCover:false};
  const untrusted=createProjectCard(doc,malicious,repo=>'https://github.com/drilemoz/'+repo);
  assert.equal(untrusted.children.find(x=>x.tag==='h3').textContent,malicious.name);
  assert.equal(untrusted.children.find(x=>x.tag==='p').textContent,malicious.description);
  assert.equal(untrusted.children.some(x=>x.tag==='img'||x.tag==='script'),false);
  console.log('Interface: cards, semântica, metadata, links e texto não interpretado como HTML OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
