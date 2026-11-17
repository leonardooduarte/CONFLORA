import {buildV20Insight} from './v20Insight.js';
import {reviewBotanicalV21} from './v21Botanical.js';
import {presentV211Regions} from './v21Presentation.js';

// V21.2 builds a navigable reading of existing, documented evidence.
// It never determines plant suitability or models a drainage intervention.
const known=v=>v!==undefined&&v!==null&&v!==''&&v!=='unknown';
const label=(lang,pt,en)=>lang==='pt'?pt:en;
const fields=['regionCode','sun','moisture','soil','duration','building'];

export function v212Journey(project,lang='pt'){
 if(!project)return null;
 const observations=(project.annotations||[]).filter(a=>a&&a.type!=='plants'&&a.type!=='garden');
 const base=project.context||{};
 const coreKnown=['regionCode','sun','moisture'].filter(k=>known(base[k])).length;
 const localKnown=observations.some(a=>a.conditions&&fields.some(k=>known(a.conditions[k])));
 const hasContext=known(base.regionCode)&&(known(base.sun)||known(base.moisture))||
  observations.some(a=>known(a.conditions?.regionCode||base.regionCode)&&(known(a.conditions?.sun||base.sun)||known(a.conditions?.moisture||base.moisture)));
 const result=reviewBotanicalV21(project,lang);
 const hasReadout=result?.regions.length>0;
 const statuses=[
  project.image?'done':'optional',
  observations.length?'done':'todo',
  hasContext?'done':coreKnown||localKnown?'partial':'todo',
  hasContext?'ready':'todo',
  hasReadout?'ready':'todo'
 ];
 const next=observations.length===0?'observations':!hasContext?'conditions':'results';
 return {
  statuses,next,knownConditions:coreKnown,observations:observations.length,
  hasContext,hasImage:Boolean(project.image),readoutAvailable:hasReadout,
  summary:next==='observations'?label(lang,'Comece registrando o que observou na imagem ou no esquema.','Start by recording what you observed on the photo or diagram.'):
   next==='conditions'?label(lang,'Descreva o contexto regional, a luz e a umidade para consultar evidências comparáveis.','Describe the region, light and moisture to review comparable evidence.'):
   label(lang,'Você já pode consultar a leitura integrada do seu terreno.','You can now review your integrated site findings.'),
  info:label(lang,'A fotografia é opcional; as informações são declaradas por você. Nenhum estado representa aprovação técnica.','A photograph is optional; all information is user-reported. No state represents technical approval.')
 };
}

export function v212Results(project,lang='pt'){
 if(!project)return null;
 const insight=buildV20Insight(project,lang),botanical=reviewBotanicalV21(project,lang);
 const regions=presentV211Regions(botanical.regions);
 const seen=new Set(),sources=[];
 for(const region of regions)for(const item of [...region.investigate,...region.research])for(const s of item.citations||[])if(!seen.has(s.id)){seen.add(s.id);sources.push(s);}
 const statuses={
  missing:regions.some(r=>r.conditions.some(c=>!known(c.value))),
  documentary:botanical.matchCount>0,
  research:botanical.researchCount>0,
  localAssessment:regions.some(r=>r.constraints)||Boolean(insight.risk)
 };
 const headline=statuses.documentary
  ?label(lang,'Correspondências documentais para investigar','Documentary matches to investigate')
  :statuses.research
  ?label(lang,'Literatura para investigar, sem validação de plantio','Literature to investigate, no planting validation')
  :label(lang,'Evidências insuficientes para selecionar plantas','Insufficient evidence to select plants');
 const markTypes=['pool','roof','paved','space'];
 const counts=Object.fromEntries(markTypes.map(type=>[type,(project.annotations||[]).filter(a=>a.type===type).length]));
 const scenarios=insight.scenarios.map(s=>({slot:s.slot,count:s.count,mode:s.mode}));
 const summary={
  site:project.context?.region||label(lang,'Localidade não informada','Location not reported'),
  area:project.context?.area||'',image:project.image||null,
  counts,marks:insight.marks,regionalAreas:regions.length,
  headline,description:insight.evidenceLabel,
  warnings:insight.interpretations.slice(0,3),
  next:insight.steps.slice(0,4),statuses,scenarios,
  regions,sourceCount:sources.length,
  sources,documentedCount:botanical.matchCount,researchCount:botanical.researchCount,
  limit:label(lang,'Leitura baseada em informações fornecidas por você e fontes científicas. Não mede infiltração, vazão, segurança de escavação ou desempenho de plantas.','This reading uses your reported conditions and documentary sources. It does not measure infiltration, runoff, excavation safety or plant performance.')
 };
 return summary;
}
