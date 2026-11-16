import claims from '../data/evidenceClaims.json' with {type:'json'};
import {plants,references,labels} from './knowledge.js';
import {cleanConditions} from './selection.js';
export const evidenceClaims=claims;
const t={pt:{documented:'Correspondência documentada',investigate:'Possibilidade a investigar',insufficient:'Dados insuficientes',contradiction:'Contradição documentada',outside:'Fora do contexto documental',research:'Ficha de pesquisa, sem seleção de plantio'},en:{documented:'Documented match',investigate:'Possible fit to investigate',insufficient:'Insufficient data',contradiction:'Documented contradiction',outside:'Outside documented region',research:'Research record, not a planting match'}};
/** A documented contradiction requires a comparable field with a specific supporting source. */
export function evaluatePlantEvidence(plant,raw={},lang='pt'){
 const context=cleanConditions(raw),sheet=claims.species[plant.id]||{},pt=lang==='pt',matches=[],contradictions=[],unknown=[],citations=[];
 const addClaim=(field,value)=>{
  const claim=sheet[field];
  if(value==='unknown')return;
  if(!claim||!claim.matching||!Array.isArray(claim.values)||!claim.values.length){
   unknown.push(pt?`Não há faixa documentada para ${field==='sun'?'luz':'umidade'} informada.`:`No matching ${field} evidence for this observation.`);return;
  }
  const result={field,value,text:(field==='sun'?(pt?'Luz: ':'Sun: '):(pt?'Umidade: ':'Moisture: '))+(labels[lang][value]||value),source:references[claim.sourceId]||null,sourceId:claim.sourceId,kind:claim.evidenceType};
  if(claim.values.includes(value))matches.push(result);else contradictions.push(result);
  if(result.source)citations.push(result.source);
 };
 if(context.regionCode==='unknown')return {status:'insufficient',label:t[lang].insufficient,matches,contradictions,unknown:[pt?'Informe o contexto regional.':'Provide a regional context.'],citations};
 if(plant.region!==context.regionCode)return {status:'outside',label:t[lang].outside,matches,contradictions,unknown,citations};
 addClaim('sun',context.sun);
 addClaim('moisture',context.moisture);
 if(plant.evidence==='ecology'||plant.evidence==='studied')return {status:'research',label:t[lang].research,matches:[],contradictions:[],unknown:[pt?'Estudo ecológico ou ensaio em vasos não determina adequação ao terreno.':'Ecological research or a pot trial does not establish site suitability.',...unknown],citations:[...plant.sourceIds.map(id=>references[id]).filter(Boolean)]};
 const status=contradictions.length?'contradiction':matches.length===0?'insufficient':unknown.length?'investigate':'documented';
 return {status,label:t[lang][status],matches,contradictions,unknown,citations};
}
export function evaluateAllEvidence(context,lang='pt'){
 return plants.map(plant=>({plant,...evaluatePlantEvidence(plant,context,lang)})).filter(item=>item.status!=='outside');
}
