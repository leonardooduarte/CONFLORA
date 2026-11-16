import {cleanConditions} from './selection.js';
import {Store} from './store.js';
const types=new Set(['pool','roof','paved','plants','space','garden']);
const str=(v,max=1500)=>typeof v==='string'?v.slice(0,max):'';
const num=(v,lo,hi,def=lo)=>Number.isFinite(Number(v))?Math.min(hi,Math.max(lo,Number(v))):def;
const photo=v=>typeof v==='string'&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v)&&v.length<24*1024*1024?v:null;
// Whitelisted V11 -> V12 migration. Unknown HTML, keys, paths and URLs never reach the renderer.
export function normalizeProject(raw){
 if(!raw||![11,12].includes(raw.version)||!Array.isArray(raw.annotations)||!raw.context||!raw.kit)throw Error('Unsupported project');
 const p=Store.newProject(raw.kind==='kit'?'kit':'space');
 p.id=str(raw.id,100)||p.id;p.name=str(raw.name,100)||p.name;p.image=photo(raw.image);if(raw.image&&!p.image)throw Error('Invalid photo');
 p.createdAt=num(raw.createdAt,0,Date.now(),Date.now());p.updatedAt=num(raw.updatedAt,0,Date.now(),Date.now());
 for(const k of ['region','area','soil','sun','pooling','notes','regionCode','moisture','duration','building','space','maintenance'])p.context[k]=str(raw.context[k],k==='notes'?1500:150)||p.context[k];
 for(const [key,values] of Object.entries({soil:['unknown','slow','medium','fast'],sun:['unknown','full','mixed','shade'],pooling:['unknown','yes','no'],moisture:['unknown','wet','moist','mesic','dry']}))if(!values.includes(p.context[key]))p.context[key]='unknown';
 if(p.context.area!==''&&(!Number.isFinite(+p.context.area)||+p.context.area<0||+p.context.area>10000000))p.context.area='';
 if(!['BR','IA','unknown'].includes(p.context.regionCode))p.context.regionCode='unknown';
 p.annotations=raw.annotations.filter(a=>a&&types.has(a.type)).slice(0,200).map(a=>({id:/^[a-zA-Z0-9_-]{1,100}$/.test(a.id)?a.id:Store.id(),type:a.type,speciesId:str(a.speciesId,80),studyKind:['review','green','exclusion'].includes(a.studyKind)?a.studyKind:undefined,sourceAreaId:str(a.sourceAreaId,100),rotation:num(a.rotation,-45,45,0),opacity:num(a.opacity,.2,1,1),perspective:num(a.perspective,.35,1.2,1),conditions:a.conditions&&typeof a.conditions==='object'?Object.fromEntries(Object.entries(cleanConditions(a.conditions)).filter(([k])=>Object.hasOwn(a.conditions,k))):undefined,x:num(a.x,20,980,500),y:num(a.y,20,630,325),size:num(a.size,.55,2.4,1),notes:str(a.notes,700),hidden:Boolean(a.hidden),kind:['polygon','path'].includes(a.kind)?a.kind:'point',points:Array.isArray(a.points)?a.points.slice(0,80).filter(p=>p&&Number.isFinite(+p.x)&&Number.isFinite(+p.y)).map(p=>({x:num(p.x,0,1000),y:num(p.y,0,650)})):[]}));
 for(const a of p.annotations)if((a.kind==='polygon'&&a.points.length<3)||(a.kind==='path'&&a.points.length<2))throw Error('Incomplete geometry');
 if(new Set(p.annotations.map(a=>a.id)).size!==p.annotations.length)throw Error('Duplicate marker id');
 // Backward-compatible V11/V12 schema: scenario markers are whitelisted with the same
 // normalizer as regular annotations; no extra image or untrusted SVG is imported.
 p.scenarios={A:null,B:null};
 for(const slot of ['A','B']){
  const original=raw.scenarios?.[slot];
  if(!original||!Array.isArray(original.markers))continue;
  const safe=normalizeProject({...raw,annotations:original.markers,scenarios:undefined}).annotations
   .filter(a=>a.type==='garden'||(a.type==='plants'&&a.speciesId));
  p.scenarios[slot]={markers:safe,mode:['botanical','exploratory'].includes(original.mode)?original.mode:(safe.some(m=>m.speciesId)?'botanical':'exploratory'),savedAt:num(original.savedAt,0,Date.now(),Date.now())};
 }
 p.plantInterests=Array.isArray(raw.plantInterests)?raw.plantInterests.slice(0,100).filter(x=>x&&typeof x.id==='string').map(x=>({id:str(x.id,80),areaId:str(x.areaId,100)})):[];
 p.solutions=Array.isArray(raw.solutions)?raw.solutions.filter(v=>['rain','vegetated','permeable'].includes(v)):[];
 const entry=e=>({id:str(e.id,100)||Store.id(),date:str(e.date,30)||new Date().toISOString().slice(0,10),speciesId:str(e.speciesId,80),type:['rain','maintenance','planting','change'].includes(e.type)?e.type:'change',text:str(e.text),photo:photo(e.photo),areaId:str(e.areaId,100)});
 p.journal=Array.isArray(raw.journal)?raw.journal.filter(e=>e&&typeof e==='object').slice(0,150).map(entry):[];
 p.journalDraft=raw.journalDraft?(({date,type,text,photo,areaId,speciesId})=>({date,type,text,photo,areaId,speciesId}))(entry(raw.journalDraft)):null;
 p.care=Array.isArray(raw.care)?Array.from({length:3},(_,i)=>Boolean(raw.care[i])):[false,false,false];
 p.kit={code:str(raw.kit.code,100),tasks:Array.from({length:5},(_,i)=>Boolean(raw.kit.tasks?.[i])),entries:Array.isArray(raw.kit.entries)?raw.kit.entries.filter(e=>e&&typeof e==='object').slice(0,50).map(e=>({...entry(e),date:num(e.date,0,Date.now(),Date.now())})):[]};
 return p;
}
