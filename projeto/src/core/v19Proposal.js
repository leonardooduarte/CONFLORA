import {buildV18Proposal,makeV18Scenario} from './v18Proposal.js';
import {plants} from './knowledge.js';
import {cleanConditions} from './selection.js';
export const exploratoryNotice={pt:'Estudo visual exploratório. Não representa recomendação de plantio, dimensionamento ou projeto executivo.',en:'Exploratory visual study. Not a planting recommendation, sizing exercise or engineering design.'};
export function groupEquivalentAreas(regions){
 const groups=new Map();
 for(const a of regions){
  const key=JSON.stringify({conditions:cleanConditions(a.context),type:a.mark.type,kind:a.mark.kind||'point',note:(a.mark.notes||'').trim(),observations:a.review.observations,warnings:a.review.warnings,checks:a.review.checks,status:a.review.status,candidates:a.candidates.map(x=>x.plant.id),priority:a.reviewPriority});
  if(!groups.has(key))groups.set(key,{...a,areaNumbers:[],areaIds:[]});
  const g=groups.get(key);g.areaNumbers.push(a.number);g.areaIds.push(a.id);
 }
 return [...groups.values()];
}
export function buildV19Proposal(project,lang='pt'){
 const result=buildV18Proposal(project,lang);
 const researchReasons={pt:{syngonium:'Não nativa do Brasil segundo POWO; o ensaio em vasos não comprova adequação local. Registro de pesquisa com conflito de natividade, sem indicação de plantio.',commelina:'Cobertura vegetal acompanhada em vasos irrigados. Verificar manejo e propagação; a fonte não estabelece uma faixa de encharcamento para este terreno.',distimake:'Trepadeira que exigiu condução dos ramos no ensaio. Investigar suporte e expansão; irrigação em vasos não valida implantação local.',trimezia:'Publicada no ensaio como Neomarica caerulea, sinônimo do nome aceito aqui. Confirmar identificação; sem faixa comparável de umidade para selecionar plantio.'},en:{syngonium:'Not native to Brazil according to POWO; the pot trial does not validate local suitability. Research record with a nativity conflict, not a planting recommendation.',commelina:'Vegetation cover monitored in irrigated pots. Verify care and spread; the source establishes no comparable waterlogging range for this site.',distimake:'Climber requiring vine training in the trial. Investigate support and spread; pot irrigation does not validate local installation.',trimezia:'Published as Neomarica caerulea, a synonym of the accepted name used here. Confirm identification; no comparable moisture range for planting selection.'}};
 result.unpictured=result.cards.filter(c=>!c.plant.image);
 result.cards=result.cards.filter(c=>c.plant.image).map(c=>c.status==='research'?{...c,reason:researchReasons[lang][c.plant.id]||c.reason}:c);
 const regions=result.regions.map(a=>({...a,canDraft:a.canDraft&&a.candidates.some(c=>c.plant.image),category:a.reviewPriority?'D':a.candidates.length?'A':a.research.length?'B':'C'}));
 return {...result,regions,eligibleCount:regions.filter(a=>a.canDraft).length,canDraft:regions.some(a=>a.canDraft),groups:groupEquivalentAreas(regions),alerts:[...new Set(result.alerts)],exploratoryNotice:exploratoryNotice[lang],hasPhoto:Boolean(project.image)};
}
export function makeV19Scenario(project,slot='A',mode='exploratory',lang='pt'){
 if(!['A','B'].includes(slot)||!['exploratory','botanical'].includes(mode))throw Error('Invalid scenario');
 if(!project.image)return {created:false,reason:lang==='pt'?'Envie uma fotografia para criar o estudo do seu terreno.':'Upload a site photo before creating a visual study.'};
 if(mode==='botanical'){
  if(!buildV19Proposal(project,lang).canDraft)return {created:false,reason:lang==='pt'?'Não há correspondências com fotografias verificadas e condições suficientes.':'No documented matches with verified photographs and sufficient conditions.'};
  const result=makeV18Scenario(project,slot,lang,{requirePhoto:true});
  if(result.created){project.scenarios[slot].mode='botanical';project.scenarios[slot].markers.forEach(m=>Object.assign(m,{rotation:0,perspective:.78,opacity:.9,sourceAreaId:buildV18Proposal(project,lang).regions.find(a=>m.id.includes('-'+String(a.id).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,36)+'-'))?.id||''}));}
  return result;
 }
 const plan=buildV19Proposal(project,lang),pt=lang==='pt';
 const markers=plan.regions.map((a,i)=>{
  const kind=a.review.needsAssessment?'exclusion':a.reviewPriority||a.missing.length?'review':'green';
  const x=Math.max(90,Math.min(910,Number(a.mark.x)||500)),y=Math.max(70,Math.min(580,Number(a.mark.y)||325));
  const dx=slot==='A'?74:104,dy=slot==='A'?44:30;
  // Geometry is a user-editable hypothesis around a reported mark, never a measured boundary.
  const points=a.mark.kind==='polygon'&&a.mark.points?.length>=3?a.mark.points.map(p=>({...p})):[{x:x-dx,y:y-dy},{x:x+dx,y:y-dy},{x:x+dx,y:y+dy},{x:x-dx,y:y+dy}];
  return {id:'v19-'+slot+'-'+i,type:'garden',kind:'polygon',studyKind:kind,sourceAreaId:a.id==='whole-site'?'':a.id,x,y,points,size:slot==='A'?1:.95,rotation:0,perspective:slot==='A'?1:.85,opacity:.6,hidden:false,notes:pt?({exclusion:'Sem escavação até avaliação',review:'Investigar solo e infiltração',green:'Distribuição vegetal a investigar'})[kind]:({exclusion:'No excavation before assessment',review:'Investigate soil and infiltration',green:'Vegetated layout to investigate'})[kind]};
 });
 project.scenarios={A:null,B:null,...project.scenarios};project.scenarios[slot]={markers,mode:'exploratory',generated:true,savedAt:Date.now()};
 return {created:true,count:markers.length};
}
export function scenarioMode(scenario){return scenario?.mode|| (scenario?.markers?.some(m=>m.speciesId)?'botanical':'exploratory');}
export function updateScenarioMarker(project,slot,id,patch){
 const marker=project.scenarios?.[slot]?.markers.find(m=>m.id===id);if(!marker)return;
 if(Number.isFinite(patch.x)||Number.isFinite(patch.y)){
  const x=Math.max(20,Math.min(980,patch.x??marker.x)),y=Math.max(20,Math.min(630,patch.y??marker.y));
  if(marker.points)marker.points=marker.points.map(p=>({x:Math.max(0,Math.min(1000,p.x+x-marker.x)),y:Math.max(0,Math.min(650,p.y+y-marker.y))}));
  marker.x=x;marker.y=y;
 }
 for(const [key,lo,hi]of [['size',.55,2.4],['rotation',-45,45],['opacity',.2,1],['perspective',.35,1.2]])if(Number.isFinite(patch[key]))marker[key]=Math.max(lo,Math.min(hi,patch[key]));
 project.scenarios[slot].savedAt=Date.now();
}
export function sourceBibliography(project,proposal){
 const ids=new Set(project.context?.regionCode==='BR'?['epa-bioretention','usp-biorretencao']:['epa-bioretention']);for(const c of [...proposal.cards,...(proposal.unpictured||[])])for(const id of c.plant.sourceIds)ids.add(id);
 return [...ids];
}

/** Saved references stay visible after site edits, without retaining a stale validation label. */
export function scenarioEvidenceCurrent(project,slot){
 const scenario=project.scenarios?.[slot];if(scenarioMode(scenario)!=='botanical'||!scenario?.markers?.length)return false;
 const plan=buildV19Proposal(project);
 return scenario.markers.every(m=>{const areas=m.sourceAreaId?plan.regions.filter(a=>a.id===m.sourceAreaId):plan.regions;return Boolean(plants.find(p=>p.id===m.speciesId)?.image)&&areas.length>0&&areas.every(a=>a.canDraft&&a.candidates.some(c=>c.plant.id===m.speciesId))});
}
