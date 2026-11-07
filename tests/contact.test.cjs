const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'contato.html'),'utf8');const js=fs.readFileSync(path.join(root,'contato.js'),'utf8');
assert.match(html,/https:\/\/wa\.me\/5537998747642/);assert.match(html,/href="mailto:drilemoz@gmail\.com"/);
assert.match(html,/id="copy-pix"/);assert.match(html,/id="pix-feedback" role="status"/);
assert.match(js,/navigator\.clipboard\.writeText/);assert.match(js,/drilemoz@gmail\.com/);
assert.doesNotMatch(js,/document\.write\(|innerHTML|github_pat_|ghp_/);
console.log('Contato: WhatsApp E.164, Pix copiável, retorno acessível e nenhum segredo OK.');
