const assert=require('node:assert/strict');
(async()=>{
  const {createGithubClient}=await import('../src/github.mjs');
  let calls=[];
  const storage=new Map();
  const request=async(url)=>{
    calls.push(url);
    if(url.includes('/releases?')) return {ok:true,json:async()=>[],headers:{get:()=>null}};
    if(url.includes('/tags?')) return {ok:true,json:async()=>[{name:'v1.0.121'}],headers:{get:()=>null}};
    throw Error('Unexpected URL '+url);
  };
  let clock=100000;
  const client=createGithubClient({request,storage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},clock:()=>clock});
  const [a,b]=await Promise.all([client.loadRelease('TermuxManager'),client.loadRelease('TermuxManager')]);
  assert.equal(a.tag,'v1.0.121');assert.equal(a.version,'');assert.deepEqual(a,b);
  assert.equal(calls.length,2,'Chamadas simultâneas deduplicadas');
  const cachedClient=createGithubClient({request:async()=>{throw Error('Não consultar cache válido')},storage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},clock:()=>clock+1000});
  assert.equal((await cachedClient.loadRelease('TermuxManager')).tag,'v1.0.121');
  clock+=16*60*1000;
  calls=[];
  const expired=createGithubClient({request,storage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},clock:()=>clock});
  await expired.loadRelease('TermuxManager');assert.equal(calls.length,2,'Cache expirado recarregado');

  let active=0,maxActive=0;
  const limited=createGithubClient({releaseConcurrency:2,request:async(url)=>{
    active++;maxActive=Math.max(maxActive,active);
    await new Promise(r=>setTimeout(r,3)); active--;
    if(url.includes('/releases?'))return{ok:true,json:async()=>[{tag_name:'v1',draft:false,assets:[]}],headers:{get:()=>null}};
    return{ok:true,json:async()=>[],headers:{get:()=>null}};
  }});
  await Promise.all(['A','B','C','D','E','F'].map(repo=>limited.loadRelease(repo)));
  assert.ok(maxActive<=2 && maxActive>0,'Concorrência limitada a duas requisições');

  let amount=0;
  const rate=createGithubClient({request:async()=>{amount++;return{ok:false,status:403,headers:{get:key=>key==='x-ratelimit-remaining'?'0':null}}}});
  assert.equal((await rate.loadRelease('Pulso')).error,true);
  assert.equal(rate.isRateLimited(),true);
  assert.equal((await rate.loadRelease('Nexora')).error,true);
  assert.equal(amount,1,'Limite evita requisições subsequentes');
  console.log('GitHub API: tags, TTL, cache, deduplicação, concorrência e rate limit OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
