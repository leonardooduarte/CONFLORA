import {plants,references,say} from './knowledge.js';
import {assessSite} from './siteAnalysis.js';
import {evaluatePlantEvidence} from './evidence.js';

const isObserved=a=>a&&(['pool','space','paved','roof'].includes(a.type)||Boolean(a.conditions))&&a.kind!=='path';
const supplied=v=>v&&v!=='unknown';
const rationale=(p,lang)=>say(p.ecology,lang)||say(p.occurrence,lang)||'';
const abs=(v,min,max)=>Math.max(min,Math.min(max,v));

/**
 * Deterministic, source-grounded planning *screen*. A species in the Bauru
 * experiment remains RESEARCH ONLY unless independently matched by documented
 * sun/moisture ranges in the evidence matrix.
 * No photo analysis, hydrology, soil measurement or performance prediction.
 */
export function buildV18Proposal(project,lang='pt'){
 const pt=lang==='pt',raw=(project?.annotations||[]).filter(isObserved);
 const observations=raw.filter(a=>a.type==='pool'||a.type==='space'||Boolean(a.conditions));
 const subjects=observations.length?observations:[{id:'whole-site',type:'space',x:500,y:325,notes:'',conditions:{}}];
 const regions=subjects.map((a,index)=>{
   const context={...(project?.context||{}),...(a.conditions||{})};
   const review=assessSite(context,lang,a.type);
   const candidates=review.selection.candidates
     .filter(x=>evaluatePlantEvidence(x.plant,context,lang).status==='documented')
     .map(x=>({plant:x.plant,status:'candidate',source:references[x.plant.sourceIds[0]],reason:pt?'Correspondência documentada de luz e umidade; verificar condições locais.':'Documented sun and moisture match; verify local conditions.'}));
   const unresolved=plants.filter(p=>p.region===context.regionCode&&['studied','ecology'].includes(p.evidence)&&p.sourceIds.includes('br')&&p.image)
     .slice(0,4).map(p=>({plant:p,status:'research',source:references[p.sourceIds[0]],reason:pt?'Espécie estudada em protótipo em Bauru; não é recomendação de plantio nem comprovação para este terreno.':'Species studied in a Bauru prototype; not a planting recommendation nor site validation.'}));
   const shouldReview=review.needsAssessment||context.soil==='slow';
   const missing=['duration','building','soil','sun','moisture'].filter(k=>!supplied(context[k]));
   const canDraft=Boolean(candidates.length)&&review.status==='exploratory'&&!shouldReview&&context.building==='away'&&['hours','day'].includes(context.duration)&&['medium','fast'].includes(context.soil);
   return {id:a.id,number:a.id==='whole-site'?null:(project.annotations||[]).indexOf(a)+1,mark:a,context,review,candidates,research:context.regionCode==='BR'?unresolved:[],missing,canDraft,reviewPriority:shouldReview};
 });
 const cards=[];const used=new Set();
 for(const area of regions){
  for(const item of [...area.candidates,...(area.candidates.length?[]:area.research)]){
   if(used.has(item.plant.id))continue;
   used.add(item.plant.id);cards.push({...item,areas:regions.filter(r=>r.candidates.some(c=>c.plant.id===item.plant.id)||(!r.candidates.length&&r.research.some(c=>c.plant.id===item.plant.id))).map(r=>r.number).filter(Boolean)});
  }
 }
 const eligibleCount=regions.filter(a=>a.canDraft).length;
 const caveats=pt
 ?'Ferramenta de apoio preliminar. A fotografia não mede infiltração, vazão, declividade nem segurança de implantação. Estudos em vasos não comprovam desempenho em jardins residenciais.'
 :'Preliminary decision-support tool. Photos do not measure infiltration, runoff, slope or installation safety. Pot studies do not prove residential rain-garden performance.';
 return {regions,cards:cards.slice(0,5),eligibleCount,canDraft:eligibleCount>0,alerts:regions.flatMap(r=>r.review.warnings),caveats,regionCode:project?.context?.regionCode||'unknown'};
}

/** Auto-generate a non-destructive visual hypothesis only from evidenced species.
 * Returns {created,reason}; never overwrites observational annotations or photos.
 */
export function makeV18Scenario(project,slot='A',lang='pt'){
 if(!['A','B'].includes(slot))throw Error('Unsupported slot');
 const proposal=buildV18Proposal(project,lang),pt=lang==='pt';
 const eligible=proposal.regions.filter(x=>x.canDraft);
 if(!eligible.length)return {created:false,reason:pt?'Não há espécies com dados suficientes e condições seguras para gerar uma composição de plantio. Consulte as fichas de pesquisa e verifique drenagem, duração da água e proximidade de construções.':'There are no adequately evidenced plants and sufficiently verified conditions for an automated planting composition.'};
 const markers=[];
 for(const area of eligible){
   const species=area.candidates.slice(0,2);
   const centerX=Number(area.mark.x)||500,centerY=Number(area.mark.y)||325;
   for(let i=0;i<species.length;i++){
    const x=abs(centerX+(slot==='A'?1:-1)*(i*72-35),40,960);
    const y=abs(centerY+(slot==='A'?1:-1)*(i*28-15),35,615);
    markers.push({id:'v18-'+slot+'-'+String(area.id).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,36)+'-'+i,
      type:'plants',speciesId:species[i].plant.id,kind:'point',x,y,size:slot==='A'?1:0.9,
      notes:pt?'Posição ilustrativa para verificação local.':'Illustrative placement pending local assessment.',
      hidden:false,points:[],conditions:undefined});
   }
 }
 if(!markers.length)return {created:false,reason:pt?'Sem elementos suficientes para esta composição.':'Insufficient evidence for this composition.'};
 project.scenarios={A:null,B:null,...(project.scenarios||{})};
 project.scenarios[slot]={markers,savedAt:Date.now(),generated:true};
 return {created:true,count:markers.length};
}
