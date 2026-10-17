const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const js = fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
function testHarness(data) {
  const body=js.replace('  setupNavigation();\n  repositoryList.sort', '  globalThis.__ports = {loadRelease,applyRelease}; return;\n  setupNavigation();\n  repositoryList.sort');
  const calls=[];
  const ctx={document:{querySelector:()=>({})},AbortController,URL,setTimeout,clearTimeout,console,
    fetch:async(url)=>{calls.push(url);const found=Object.keys(data).find(k=>url.includes(k));
      if (!found) throw Error('Unexpected URL: '+url);
      return {ok:true,headers:{get:()=>null},json:async()=>data[found]};},
    sessionStorage:{getItem:()=>null,setItem:()=>{}}};ctx.globalThis=ctx;
  vm.createContext(ctx);vm.runInContext(body,ctx);
  return {...ctx.__ports,calls};
}
function fakeCard(repo) {
  const badge={textContent:'',title:''};const meta={textContent:''};
  const link={textContent:'',href:'',hidden:true,classList:{add(){},remove(){}},removeAttribute(){},setAttribute(){}};
  return {badge,meta,link,card:{dataset:{repo,title:repo,android:'false'},querySelector:s=>s.includes('project-version')?badge:s.includes('project-meta')?meta:link}};
}
(async()=>{
  let t=testHarness({'/releases?':[], '/tags?':[{name:'v1.0.121'}]});
  let r=await t.loadRelease('TermuxManager'), c=fakeCard('TermuxManager');t.applyRelease(c.card,r);
  assert.equal(r.version,'');assert.equal(r.tag,'v1.0.121');assert.equal(c.badge.textContent,'Tag: v1.0.121');
  assert.equal(c.link.textContent,'Como instalar ↗');
  assert.ok(t.calls.some(u=>u.includes('/tags?')));
  t=testHarness({'/releases?':[{draft:false,tag_name:'v1.4.76',prerelease:true,assets:[]}] ,'/actions/artifacts?':{artifacts:[]}});
  r=await t.loadRelease('Minha-Camera');c=fakeCard('Minha-Camera');t.applyRelease(c.card,r);
  assert.equal(c.badge.textContent,'Release: v1.4.76');
  assert.equal(t.calls.some(u=>u.includes('/tags?')),false);
  assert.equal(c.link.textContent,'Ver versões ↗');
  t=testHarness({'/releases?':[], '/tags?':[], '/actions/artifacts?':{artifacts:[]}});
  r=await t.loadRelease('Pulso');c=fakeCard('Pulso');t.applyRelease(c.card,r);
  assert.equal(c.badge.textContent,'Sem Release/tag pública');
  assert.match(c.meta.textContent,/Ainda não há Releases/);
  console.log('Versões via API: Tag sem APK, Release prévia sem APK e repositório sem versão validados.');
})().catch(error=>{console.error(error);process.exitCode=1});
