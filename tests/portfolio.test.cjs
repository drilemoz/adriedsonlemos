const assert = require('node:assert/strict');
function mock(routes) {
  const urls=[];
  return {
    urls,
    request:async(url)=>{
      urls.push(url);
      const route=Object.keys(routes).find(x=>url.includes(x));
      if (!route) throw new Error('URL inesperada: '+url);
      const data=routes[route];
      if(data instanceof Error) throw data;
      return {ok:true,status:200,json:async()=>data,headers:{get:()=>null}};
    }
  };
}
function fakeCard(repo,android=false) {
  const badge={textContent:'',title:''},meta={textContent:''};
  const link={textContent:'',href:'',hidden:true,classList:{add(){},remove(){}},removeAttribute(){},setAttribute(){}};
  return {badge,meta,link,card:{dataset:{repo,title:repo,android:String(android)},querySelector:s=>s==='.project-version'?badge:s==='.project-meta'?meta:link}};
}
(async () => {
  const {createGithubClient,validApkUrl}=await import('../src/github.mjs');
  const {applyRelease}=await import('../src/ui.mjs');
  let m=mock({'/releases?':[],'/tags?':[]});let c=createGithubClient({request:m.request});
  let r=await c.loadRelease('TermuxManager');let card=fakeCard('TermuxManager');applyRelease(card.card,r,c.repoUrl);
  assert.equal(card.link.textContent,'Como instalar ↗');
  assert.match(card.link.href,/\/blob\/main\/README.md$/);

  m=mock({'/releases?':[{tag_name:'v2',draft:false,assets:[],prerelease:true}],'/actions/artifacts?':{artifacts:[
    {name:'app.apk',expired:false,created_at:'2026-10-10',workflow_run:{id:2405}},
    {name:'old.apk',expired:true,created_at:'2026-10-12',workflow_run:{id:2}}
  ]}});c=createGithubClient({request:m.request});
  r=await c.loadRelease('GitHub-Manager',true);card=fakeCard('GitHub-Manager',true);applyRelease(card.card,r,c.repoUrl);
  assert.equal(card.link.textContent,'Ver APK no Actions ↗');
  assert.match(card.link.href,/\/actions\/runs\/2405$/);
  assert.match(card.meta.textContent,/login necessário/);

  m=mock({'/releases?':[{tag_name:'alpha',draft:false,assets:[{name:'Explorer.apk',browser_download_url:'https://github.com/drilemoz/Explorador-XP/releases/download/alpha/Explorer.apk'}]}]});
  c=createGithubClient({request:m.request});r=await c.loadRelease('Explorador-XP',true);card=fakeCard('Explorador-XP',true);applyRelease(card.card,r,c.repoUrl);
  assert.equal(card.link.textContent,'↓ Baixar APK');
  assert.match(card.link.href,/Explorer.apk$/);
  assert.equal(m.urls.some(x=>x.includes('/actions/artifacts')),false);
  assert.equal(validApkUrl({name:'evil.apk',browser_download_url:'https://evil.example/app.apk'},'drilemoz','Explorador-XP'),null);
  assert.equal(validApkUrl({name:'evil.apk',browser_download_url:'https://github.com/drilemoz/Explorador-XP-mal/releases/download/a/evil.apk'},'drilemoz','Explorador-XP'),null);
  assert.equal(validApkUrl({name:'fake.zip',browser_download_url:'https://github.com/drilemoz/Explorador-XP/releases/download/alpha/fake.zip'},'drilemoz','Explorador-XP'),null);

  m=mock({'/releases?':[{tag_name:'v1',draft:false,assets:[{name:'evil.apk',browser_download_url:'https://evil.example/file.apk'}]}],'/actions/artifacts?':{artifacts:[]}});
  c=createGithubClient({request:m.request});r=await c.loadRelease('Pulso',true);card=fakeCard('Pulso',true);applyRelease(card.card,r,c.repoUrl);
  assert.equal(card.link.textContent,'Ver versões ↗');
  assert.match(card.meta.textContent,/sem APK anexado/);

  m=mock({'/releases?':new Error('network')});c=createGithubClient({request:m.request});r=await c.loadRelease('TermuxManager');card=fakeCard('TermuxManager');applyRelease(card.card,r,c.repoUrl);
  assert.equal(r.error,true);assert.equal(card.link.hidden,true);
  console.log('Downloads: Termux, Artifact, APK verificado, host malicioso, nome suspeito e falha de rede OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
