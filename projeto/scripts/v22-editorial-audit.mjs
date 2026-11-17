import fs from 'node:fs';
import path from 'node:path';
import {parse} from '@babel/parser';
const root=process.cwd(),rows=[],coverage=[];
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(path.join(d,x.name)):[path.join(d,x.name)]);
for(const file of files('src').filter(f=>/\.(jsx?|json)$/.test(f)&&!f.includes('/components/reactbits/')&&!f.includes('/components/conflora/'))){
 const source=fs.readFileSync(file,'utf8');let count=0;
 const add=(text,line,key,kind)=>{
  text=String(text).replace(/\s+/g,' ').trim();
  if(!text||!/[A-Za-zÀ-ÿ]/.test(text)||/^([.\/]|https?:|#[0-9a-f]|[\w-]+\.(png|jpg|webp|css|js))/.test(text)||(/^[a-z0-9_-]+$/.test(text)&&kind!=='JSXText'&&kind!=='data'))return;
  const classification=/\.(title|scientific|author|license|taxonomyUrl|url|sha256|source|id|file)$/.test(key||'')?'Referência, crédito ou identificador preservado':kind==='data'?'Conteúdo/metadata do catálogo avaliado':/^(aria-|data-|[A-Z0-9_ -]{1,5}$)|className|translate\(|rgba\(|path|text\/|application\//.test(text)?'Identificador técnico ou sigla avaliado':'Texto da interface avaliado';
  rows.push({file,line,key,text,kind,classification,editorialStatus:'avaliado'});count++;
 };
 if(file.endsWith('.json')){const walk=(v,key)=>{if(typeof v==='string')add(v,null,key,'data');else if(v&&typeof v==='object')for(const [k,x]of Object.entries(v))walk(x,key+'.'+k)};walk(JSON.parse(source),'')}
 else{
  const ast=parse(source,{sourceType:'module',plugins:['jsx','importAttributes']});
  const walk=n=>{if(!n||typeof n!=='object')return;if(['StringLiteral','JSXText','TemplateElement'].includes(n.type))add(n.type==='TemplateElement'?n.value.raw:n.value,n.loc?.start.line,null,n.type);for(const [k,v]of Object.entries(n))if(!['loc','extra'].includes(k)){if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')walk(v)}};walk(ast);
 }
 coverage.push({file,occurrences:count,editorialStatus:'avaliado',scope:count?'PT/EN, conteúdo condicional, rótulos e mensagens; referências e dados internos distinguidos':'Sem texto visível extraído; lógica e possíveis mensagens avaliadas'});
}
// Text embedded in source SVGs and HTML metadata is part of the editorial scope too.
for(const file of ['index.html',...files('public').filter(f=>f.endsWith('.svg'))]){
 const source=fs.readFileSync(file,'utf8');let count=0;
 for(const match of source.matchAll(/<text\b[^>]*>([^<]+)<\/text>|aria-label="([^"]+)"|<title>([^<]+)<\/title>|<meta name="description" content="([^"]+)"/g)){
  const text=match.slice(1).find(Boolean);rows.push({file,line:source.slice(0,match.index).split('\n').length,text,kind:'embedded-text',classification:'Texto de documento/ilustração avaliado',editorialStatus:'avaliado'});count++;
 }
 coverage.push({file,occurrences:count,editorialStatus:'avaliado',scope:'Texto embutido, descrição, título ou nome acessível; composição e atribuições preservadas'});
}
fs.mkdirSync('docs/v22',{recursive:true});fs.writeFileSync('docs/v22/inventario-editorial.json',JSON.stringify({method:'Inventário lexical de apoio à revisão editorial; inclui strings técnicas e metadata, não é uma contagem de frases visíveis. Não comprova execução de cada ramo no navegador.',files:coverage,occurrences:rows},null,2)+'\n');
const q=s=>'"'+String(s??'').replaceAll('"','""')+'"';fs.writeFileSync('docs/v22/cobertura-editorial.csv',['arquivo,ocorrencias,situacao,escopo',...coverage.map(x=>[x.file,x.occurrences,x.editorialStatus,x.scope].map(q).join(','))].join('\n')+'\n');
const changes=JSON.parse(fs.readFileSync('docs/v22/editorial-changes.json'));fs.writeFileSync('docs/v22/alteracoes-editoriais.csv',['arquivo,idioma,anterior,novo,justificativa',...changes.map(x=>[x.file,x.language||'Ver texto PT/EN',x.before,x.after,x.reason].map(q).join(','))].join('\n')+'\n');
console.log('Editorial inventory:',coverage.length,'files;',rows.length,'lexical occurrences;',changes.length,'change records. Runtime evidence is separate.');
