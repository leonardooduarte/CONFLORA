import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import plants from '../src/data/plants.json' with {type:'json'};
import {globeGallery} from '../src/data/globeGallery.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const imageRoot=path.join(root,'public');
const valid=/\.(webp|png|jpe?g|svg)$/i;
const files=[];
function walk(dir){for(const d of fs.readdirSync(dir,{withFileTypes:true})){const loc=path.join(dir,d.name);if(d.isDirectory())walk(loc);else if(valid.test(d.name))files.push(loc);}}
walk(imageRoot);
const targetSources=[
 'src/App.jsx','src/features/PremiumExperience.jsx','src/features/KineticGallery.jsx',
 'src/features/Solutions.jsx','src/features/AtelierPreview.jsx','src/features/WaterStory.jsx',
 'src/features/HerbariumFeature.jsx','src/features/PlantLibrary.jsx','src/features/V21Botanical.jsx'
].map(f=>({file:f,text:fs.readFileSync(path.join(root,f),'utf8')}));
function dimensions(b,ext){
 try{
  if(ext==='.png')return [b.readUInt32BE(16),b.readUInt32BE(20)];
  if(ext==='.webp'){
   const fourcc=b.toString('ascii',12,16);
   if(fourcc==='VP8X')return [1+b.readUIntLE(24,3),1+b.readUIntLE(27,3)];
   if(fourcc==='VP8 ')return [b.readUInt16LE(26)&16383,b.readUInt16LE(28)&16383];
   if(fourcc==='VP8L')return [1+(((b[21]&63)<<8)|b[20]),1+(((b[23]&15)<<10)|(b[22]<<2)|((b[21]&192)>>6))];
  }
  if(['.jpg','.jpeg'].includes(ext)){
   let i=2;
   while(i<b.length){
    if(b[i]!==255){i++;continue;}
    const marker=b[i+1];i+=2;
    if(marker===0xD9||marker===0xDA)break;
    if(marker===0x00||marker===0xD8||marker===0x01||marker>=0xD0&&marker<=0xD7)continue;
    const len=b.readUInt16BE(i);
    if([0xC0,0xC1,0xC2,0xC3,0xC5,0xC6,0xC7,0xC9,0xCA,0xCB,0xCD,0xCE,0xCF].includes(marker))return [b.readUInt16BE(i+5),b.readUInt16BE(i+3)];
    i+=len;
   }
  }
 }catch{return [null,null];}
 return [null,null];
}
const photos=new Map();
for(const p of plants){if(p.image?.file)photos.set('botanical/'+p.image.file,{author:p.image.author,license:p.image.license,source:p.image.source,kind:'botanical',species:p.scientific});}
for(const p of globeGallery){photos.set(p.file,{author:p.author,license:p.license,source:p.source,kind:'global-gallery',species:p.name});}
const inventory=files.map(file=>{
 const relative=path.relative(imageRoot,file).replaceAll(path.sep,'/');
 const buf=fs.readFileSync(file),ext=path.extname(file).toLowerCase();
 const [width,height]=dimensions(buf,ext);
 const basename=path.basename(file),directReferences=targetSources.flatMap(({file,text})=>{
  const count=text.split(basename).length-1;
  return count?[{file,occurrences:count}]:[];
 });
 return {file:relative,width,height,bytes:buf.length,directReferences,provenance:photos.get(relative)||{
  kind:relative.startsWith('scene-')?'illustrative-study':'CONFLORA-conceptual-or-ui',
  attributionNote:'Check original project asset provenance before external redistribution; no new license is asserted.'
 }};
}).sort((a,b)=>a.file.localeCompare(b.file));
const totalBytes=inventory.reduce((n,x)=>n+x.bytes,0);
const report={version:'21.1',base:'V21',generatedAt:new Date().toISOString(),
 notes:['Counts refer to explicit filenames in selected React source files. Dynamic references built from plants.json and globeGallery.js are indexed by provenance instead.','Repeated botanical photos inside a species record are functional and are not indiscriminately removed.','Conceptual art is not evidence of construction, species suitability or hydraulic efficacy.','No unverified new external photo or license is introduced.'],
 totalFiles:inventory.length,totalBytes,assets:inventory};
fs.mkdirSync(path.join(root,'work/v21-1'),{recursive:true});
fs.writeFileSync(path.join(root,'work/v21-1/media-inventory.json'),JSON.stringify(report,null,2));
const by=(name)=>inventory.find(x=>x.file===name);
const focus=['conflora-courtyard.webp','conflora-observe.webp','conflora-groundcover.webp','conflora-water-roots.webp','conflora-paving.webp'];
const lines=['# V21.1 photographic and conceptual-asset inventory','',...report.notes.map(x=>'- '+x),'','Files: '+report.totalFiles+' · total original assets: '+(totalBytes/1024/1024).toFixed(2)+' MiB','','| Asset | Size | Dimensions | Direct source references |','|---|---:|---:|---|',...focus.map(n=>{const a=by(n);return '| '+n+' | '+(a.bytes/1024).toFixed(0)+' KiB | '+(a.width||'?')+'×'+(a.height||'?')+' | '+a.directReferences.map(x=>x.file.split('/').pop()+': '+x.occurrences).join('; ')+' |';})];
fs.writeFileSync(path.join(root,'work/v21-1/media-summary.md'),lines.join('\n')+'\n');
console.log('V21.1 media audit: '+inventory.length+' assets, '+(totalBytes/1024/1024).toFixed(2)+' MiB');
