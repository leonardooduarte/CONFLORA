import {plants,references,say,labels} from './knowledge.js';
import claims from '../data/evidenceClaims.json' with {type:'json'};
import literature from '../data/v21Literature.json' with {type:'json'};
import {buildV19Proposal} from './v19Proposal.js';
import {cleanConditions} from './selection.js';

// V21: an evidence screen for investigation, not a planting or drainage prescription.
const known=v=>v!==undefined&&v!==null&&v!==''&&v!=='unknown';
const t=(lang,pt,en)=>lang==='pt'?pt:en;
const keys=['regionCode','sun','moisture','soil','duration','building'];
const labelsByField={regionCode:['Região','Region'],sun:['Luz','Sun'],moisture:['Umidade','Moisture'],soil:['Drenagem aparente','Reported drainage'],duration:['Duração do acúmulo','Pooling duration'],building:['Construções','Buildings']};
const display=(k,v,lang)=>labels[lang]?.[v]||({BR:lang==='pt'?'Brasil':'Brazil',IA:'Iowa',slow:lang==='pt'?'Aparentemente lenta':'Apparently slow',medium:lang==='pt'?'Intermediária':'Moderate',fast:lang==='pt'?'Aparentemente rápida':'Apparently fast',hours:lang==='pt'?'Algumas horas':'A few hours',day:lang==='pt'?'Até um dia':'Up to a day',persistent:lang==='pt'?'Persistente':'Persistent',near:lang==='pt'?'Próximo':'Nearby',away:lang==='pt'?'Afastado':'Away'})[v]||(lang==='pt'?'Não informado':'Not reported');
const sourceRef=(id)=>id&&references[id]&&/^https:\/\//.test(references[id].url)?{id,title:references[id].title,url:references[id].url,type:references[id].referenceType||'documentary'}:null;

export function reviewBotanicalV21(project,lang='pt'){
 if(!project)return null;
 const plan=buildV19Proposal(project,lang);
 const regions=plan.regions.map(area=>{
  const context=cleanConditions(area.context||{});
  const conditions=keys.map(key=>({
   key,label:labelsByField[key][lang==='pt'?0:1],value:context[key],
   display:display(key,context[key],lang),
   origin:area.mark?.conditions&&Object.hasOwn(area.mark.conditions,key)?'area':known(project.context?.[key])?'site':'unknown'
  }));
  const needs=[];
  if(!known(context.regionCode))needs.push(t(lang,'Informar região brasileira ou Iowa.','Provide Brazil or Iowa regional context.'));
  if(!known(context.sun))needs.push(t(lang,'Registrar luminosidade observada.','Record observed sunlight.'));
  if(!known(context.moisture))needs.push(t(lang,'Registrar umidade observada.','Record observed soil moisture.'));
  if(!known(context.duration))needs.push(t(lang,'Registrar duração do acúmulo após chuva segura.','Record pooling duration after safely observing rain.'));
  if(!known(context.building))needs.push(t(lang,'Verificar proximidade de construções e redes enterradas.','Check buildings and underground utilities.'));
  if(context.soil==='slow'||!known(context.soil))needs.push(t(lang,'A drenagem aparente não substitui ensaio ou avaliação de infiltração.','Reported drainage does not replace infiltration assessment.'));
  const constraints=context.duration==='persistent'||context.building==='near'||context.soil==='slow';
  const matches=[],research=[],outOfRange=[];
  if(known(context.regionCode))for(const p of plants.filter(p=>p.region===context.regionCode)){
   const sheet=claims.species[p.id]||{},extra=literature.species[p.id],agree=[],outside=[],unknown=[],sources=new Map();
   for(const sourceId of p.sourceIds||[]){const src=sourceRef(sourceId);if(src)sources.set(sourceId,src);}
   for(const field of ['sun','moisture']){
    const value=context[field],claim=sheet[field];
    if(!known(value)){unknown.push(t(lang,field==='sun'?'Luz não informada.':'Umidade não informada.',field==='sun'?'Sun not reported.':'Moisture not reported.'));continue;}
    if(!claim?.matching||!Array.isArray(claim.values)||!claim.values.length){
     unknown.push(t(lang,field==='sun'?'Faixa comparável de luz não estabelecida.':'Faixa comparável de umidade não estabelecida.',field==='sun'?'Comparable sunlight range not established.':'Comparable moisture range not established.'));continue;
    }
    const src=sourceRef(claim.sourceId);
    if(src)sources.set(claim.sourceId,src);
    const detail={field,value,sourceId:claim.sourceId,source:src?.title||'',scope:claim.scope||''};
    if(claim.values.includes(value))agree.push(detail);else outside.push(detail);
   }
   if(extra&&extra.context===context.regionCode){
    const src=sourceRef(extra.reference);if(src)sources.set(src.id,src);
   }
   const record={
    id:p.id,plant:p,agree,outside,unknown,
    literature:extra?{kind:extra.evidenceType,scope:extra.scope,claim:lang==='pt'?extra.claimPt:extra.claimEn}:null,
    citations:[...sources.values()],kind:p.evidence
   };
   // A finite list in a technical guide indicates a documented range, NOT universal
   // biological intolerance outside that range.
   if(p.evidence==='guide'&&outside.length){outOfRange.push(record);continue;}
   if(p.evidence==='guide'&&agree.length){
    record.level=agree.length===2?'documented-context':'partial-context';
    record.caution=constraints
     ?t(lang,'Correspondência documental apenas; condições do terreno exigem verificação antes de qualquer hipótese de implantação.','Documentary match only; site conditions require checks before any planting hypothesis.')
     :t(lang,'Condições parcialmente compatíveis com um guia regional; não há validação de plantio neste terreno.','Some conditions match a regional guide; this site has not been validated for planting.');
    matches.push(record);continue;
   }
   if(extra||p.evidence==='studied'||p.evidence==='ecology'){
    record.level='research-only';
    record.caution=t(lang,'Registro para pesquisa, não indicação de plantio ou eficiência hidráulica.','Research record, not planting advice or evidence of hydraulic efficiency.');
    research.push(record);
   }
  }
  matches.sort((a,b)=>b.agree.length-a.agree.length||a.plant.scientific.localeCompare(b.plant.scientific));
  research.sort((a,b)=>Number(Boolean(b.literature))-Number(Boolean(a.literature))||a.plant.scientific.localeCompare(b.plant.scientific));
  return {
   id:area.id,number:area.number,markType:area.mark.type,notes:area.mark.notes||'',conditions,
   matchCount:matches.length,investigate:matches.slice(0,5),
   research:research.slice(0,4),outOfRange:outOfRange.map(x=>({id:x.id,name:x.plant.scientific,fields:x.outside.map(v=>v.field)})),
   needs:[...new Set(needs)],constraints,canPlan:false,
   message:matches.length
    ?t(lang,'Correspondências de contexto para investigação; nenhuma espécie foi validada para implantação neste terreno.','Contextual matches to investigate; no species has been validated for planting on this site.')
    :research.length
    ?t(lang,'Há literatura botânica relevante, mas faltam faixas ambientais comparáveis para indicar plantio.','Relevant botanical literature exists, but comparable environmental ranges are missing for planting selection.')
    :t(lang,'A documentação disponível não sustenta uma seleção para esta área.','Current documentation does not support plant selection for this area.')
  };
 });
 return {version:21,regions,plantTotal:plants.length,referenceCount:Object.keys(references).length,
  matchCount:new Set(regions.flatMap(a=>a.investigate.map(x=>x.id))).size,
  researchCount:new Set(regions.flatMap(a=>a.research.map(x=>x.id))).size,
  explanation:t(lang,'Correspondências descrevem apenas a relação entre condições declaradas e fontes. Não são previsões de infiltração, segurança de obra ou eficiência hidráulica.','Matches describe the relationship between reported conditions and sources, not infiltration, installation safety or hydraulic performance.')};
}
