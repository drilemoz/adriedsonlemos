const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const js=fs.readFileSync(path.join(__dirname, '..', 'app.js'),'utf8');
function createEnv(routes){
  const content=js.replace('  setupNavigation();\n  repositoryList.sort', '  globalThis.__t = { loadRelease, applyRelease, validateDownload, findApkArtifact };\n  return;\n  setupNavigation();\n  repositoryList.sort');
  const seen=[];const ctx={
    document:{querySelector:()=>({})},
    fetch: async(url)=>{
      seen.push(url); const key=Object.keys(routes).find(k=>url.includes(k));
      if(!key) throw Error('unexpected API '+url);
      if(routes[key] instanceof Error) throw routes[key];
      return {ok:true,json:async()=>routes[key], headers:{get:()=>null}};
    },
    sessionStorage:{getItem:()=>null,setItem:()=>{}},
    AbortController, URL, setTimeout, clearTimeout, console
  };
  ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(content,ctx);return {...ctx.__t,seen};
}
function fakeCard(repo,android){
  const link={hidden:true,classList:{classes:new Set(),add(k){this.classes.add(k)},remove(...ks){ks.forEach(k=>this.classes.delete(k))}},removeAttribute(k){delete this[k]},setAttribute(k,v){this[k]=v}};
  const meta={textContent:''};
  return {link,meta,card:{dataset:{repo,title:repo,android:android?'true':'false'},querySelector(k){return k.includes('.project-meta')?meta:link}}};
}
(async()=>{
  let t=createEnv({'/releases?':[]});let v=await t.loadRelease('TermuxManager');let a=fakeCard('TermuxManager',false);t.applyRelease(a.card,v);
  assert.equal(a.link.textContent,'Como instalar ↗');assert.match(a.link.href,/\/blob\/main\/README.md$/);assert.match(a.meta.textContent,/sem Releases públicas/);

  t=createEnv({'/releases?':[{tag_name:'v2.0.66-200080-universal-release.apk',draft:false,assets:[],prerelease:true}],'/actions/artifacts?':{artifacts:[{name:'GitHub-Manager-2.0.66-200080-universal-release.apk',expired:false,created_at:'2026-10-12',workflow_run:{id:2405}},{name:'GitHub-Manager-old.apk',expired:true,workflow_run:{id:1}}]}});
  v=await t.loadRelease('GitHub-Manager');a=fakeCard('GitHub-Manager',true);t.applyRelease(a.card,v);
  assert.equal(a.link.textContent,'Ver APK no Actions ↗');assert.match(a.link.href,/\/actions\/runs\/2405$/);assert.match(a.meta.textContent,/login necessário/);assert.doesNotMatch(a.link.textContent,/Baixar/);

  t=createEnv({'/releases?':[{tag_name:'alpha122',draft:false,assets:[{name:'Explorer.apk',browser_download_url:'https://github.com/drilemoz/Explorador-XP/releases/download/alpha122/Explorer.apk'}]}]});
  v=await t.loadRelease('Explorador-XP');a=fakeCard('Explorador-XP',true);t.applyRelease(a.card,v);
  assert.equal(a.link.textContent,'↓ Baixar APK');assert.match(a.link.href,/Explorer.apk$/);assert.equal(t.seen.some(x=>x.includes('actions/artifacts')),false);

  t=createEnv({'/releases?':[{tag_name:'v1.0',draft:false,assets:[{name:'release.apk',browser_download_url:'https://evil.example/file.apk'}]}], '/actions/artifacts?':{artifacts:[]}});
  v=await t.loadRelease('Pulso');a=fakeCard('Pulso',true);t.applyRelease(a.card,v);
  assert.equal(a.link.textContent,'Ver versões ↗');assert.match(a.meta.textContent,/sem APK anexado/);

  t=createEnv({'/releases?':[], '/actions/artifacts?':{artifacts:[]}});
  v=await t.loadRelease('Pulso');a=fakeCard('Pulso',true);t.applyRelease(a.card,v);
  assert.equal(a.link.textContent,'Ver compilações ↗');assert.match(a.link.href,/\/actions$/);

  t=createEnv({'/releases?':new Error('network')});v=await t.loadRelease('TermuxManager');a=fakeCard('TermuxManager',false);t.applyRelease(a.card,v);assert.equal(a.link.hidden,true);assert.match(a.meta.textContent,/Não foi possível/);
  console.log('6 testes automatizados passaram: Termux sem Releases, Artifact válido/expirado, APK real, URL suspeita, fallback e rede.');
})().catch(e=>{console.error(e);process.exit(1)});
