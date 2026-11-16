import {buildV19Proposal,scenarioMode} from './v19Proposal.js';
import {cleanConditions} from './selection.js';

// Deterministic explanation of user-declared observations only.
// No image interpretation, hydraulic modelling, suitability scores or planting prescriptions.
const known=v=>v!==undefined&&v!==null&&v!==''&&v!=='unknown';
const choose=(lang,pt,en)=>lang==='pt'?pt:en;
const taskCopy={
 duration:['Registrar a duração do acúmulo','Record pooling duration','A permanência da água ajuda a definir quais verificações são necessárias.','Pooling duration helps establish which checks are needed.','Observe de local seguro após a chuva e registre nas condições do terreno ou da área.','Observe safely after rainfall and record it in site or area conditions.'],
 building:['Verificar construções e redes enterradas','Check buildings and underground services','Fundações e instalações precisam ser consideradas antes de qualquer hipótese de infiltração.','Foundations and utilities must be considered before any infiltration concept.','Registre a proximidade de construções sem escavar; procure avaliação técnica quando necessário.','Record building proximity without digging; seek appropriate assessment when needed.'],
 soil:['Investigar a drenagem do solo','Investigate soil drainage','A aparência do solo não comprova capacidade de infiltração.','Soil appearance does not establish infiltration capacity.','Registre as observações; considere avaliação ou ensaio apropriado com orientação local.','Record observations; consider suitable local testing or professional assessment.'],
 path:['Observar para onde a água passa','Observe where water travels','O escoamento real não pode ser inferido somente pela fotografia.','Actual runoff cannot be inferred from a photograph alone.','Observe em situação segura e desenhe no editor apenas caminhos efetivamente observados.','Observe safely and draw only actually observed paths in the editor.'],
 sun:['Informar a luz observada','Describe observed sunlight','A luz é informação necessária para investigar evidências botânicas.','Sunlight is needed to investigate botanical evidence.','Descreva sol e sombra nas condições do terreno ou da área.','Record sun and shade in site or area conditions.'],
 moisture:['Informar a umidade observada','Describe observed moisture','Umidade aparente não é medição de infiltração.','Apparent moisture is not an infiltration measurement.','Informe o que observou, sem interpretar a imagem como medição.','Report what was observed, not a measurement inferred from the image.'],
 regionCode:['Definir o contexto regional','Select regional context','As referências botânicas variam entre regiões.','Botanical references differ between regions.','Selecione a região correta nas condições do projeto.','Select the correct region in project conditions.']
};
function makeTask(id,lang,priority='normal'){
 const c=taskCopy[id],pt=lang==='pt';
 return {id,priority,label:c[pt?0:1],why:c[pt?2:3],how:c[pt?4:5],
  follow:choose(lang,'Atualize o registro e reabra a análise para reavaliar as hipóteses.','Update the record and revisit the review to reassess the concepts.')};
}
const origin=(field,local,global)=>known(local?.[field])?'area':known(global?.[field])?'site':'unknown';
export function buildV20Insight(project,lang='pt'){
 if(!project)return null;
 const pt=lang==='pt',c=cleanConditions(project.context||{}),marks=(project.annotations||[]).filter(a=>a&&a.type!=='plants'&&a.type!=='garden');
 const count=type=>marks.filter(a=>a.type===type).length;
 const paths=marks.filter(a=>a.kind==='path').length;
 const plan=buildV19Proposal(project,lang);
 const observed=[];
 const labels={pool:['pontos de água acumulada','pooling marks'],roof:['saídas do telhado','roof outlets'],paved:['superfícies pavimentadas','paved surfaces'],space:['áreas demarcadas','marked areas']};
 for(const type of ['pool','roof','paved','space'])if(count(type)>0)observed.push(String(count(type))+' '+labels[type][pt?0:1]);
 if(paths>0)observed.push(String(paths)+' '+choose(lang,'caminhos desenhados pelo usuário','user-drawn water paths'));
 const details=[];
 if(known(project.context?.region))details.push(choose(lang,'Localidade informada: ','Reported location: ')+project.context.region);
 if(known(project.context?.area))details.push(choose(lang,'Área declarada: ','Reported area: ')+project.context.area+' m²');
 if(c.soil==='slow')details.push(choose(lang,'Drenagem descrita como lenta, sem ensaio de infiltração.','Soil described as slow-draining, without an infiltration test.'));
 if(c.sun==='full')details.push(choose(lang,'Muito sol, segundo o usuário.','Full sun, as reported by the user.'));
 if(c.moisture==='wet')details.push(choose(lang,'Umidade molhada, conforme relato.','Wet moisture, as reported by the user.'));
 if(!observed.length&&!details.length)details.push(choose(lang,'Ainda não há observações suficientes para caracterizar o terreno.','There are not yet enough observations to describe the site.'));
 const interpretations=[];
 if(count('pool'))interpretations.push(choose(lang,'Existem marcações de água acumulada; a duração e a causa não foram medidas automaticamente.','Pooling observations exist; duration and causes were not measured automatically.'));
 if(count('roof'))interpretations.push(choose(lang,'Foram identificadas saídas de telhado; o caminho da água precisa ser observado.','Roof outlets were marked; the flow paths still need direct observation.'));
 if(count('paved'))interpretations.push(choose(lang,'Superfícies pavimentadas foram marcadas, sem quantificação de seu efeito no escoamento.','Paved areas were marked, without quantified runoff effects.'));
 if(c.soil==='slow')interpretations.push(choose(lang,'A drenagem aparentemente lenta impede presumir que um jardim de chuva infiltrará água adequadamente.','Apparently slow drainage means rain-garden infiltration cannot be presumed.'));
 const warnings=[...new Set(plan.regions.flatMap(a=>a.review.warnings))].slice(0,2);
 for(const warning of warnings)if(!interpretations.includes(warning))interpretations.push(warning);
 if(!interpretations.length)interpretations.push(choose(lang,'Estas observações ajudam a organizar perguntas, mas não permitem prever desempenho de drenagem.','These observations help organize questions, not predict drainage performance.'));
 const steps=[];
 if(!known(c.duration)||c.duration==='persistent')steps.push(makeTask('duration',lang,'essential'));
 if(!known(c.building)||c.building==='near')steps.push(makeTask('building',lang,'essential'));
 if(!known(c.soil)||c.soil==='slow')steps.push(makeTask('soil',lang,'essential'));
 if(count('roof')&&!paths)steps.push(makeTask('path',lang,'recommended'));
 for(const k of ['regionCode','sun','moisture'])if(!known(c[k]))steps.push(makeTask(k,lang));
 if(!steps.length)steps.push(makeTask('soil',lang));
 const candidates=new Set(plan.cards.filter(c=>c.status==='candidate').map(c=>c.plant.id));
 const research=new Set(plan.cards.filter(c=>c.status==='research').map(c=>c.plant.id));
 const evidence=plan.canDraft&&candidates.size?'conceptual':research.size?'research':'insufficient';
 const evidenceLabel=evidence==='conceptual'
  ?choose(lang,'Há correspondências documentais para exploração conceitual, sujeitas à verificação local.','Documented matches allow conceptual exploration, subject to local verification.')
  :evidence==='research'
  ?choose(lang,'Há registros para pesquisa; nenhuma planta foi validada para este terreno.','Research records exist; no planting has been validated for this site.')
  :choose(lang,'As evidências atuais não permitem selecionar espécies para este terreno.','Current evidence is insufficient to select plants for this site.');
 const regionFields=['soil','sun','moisture','duration','building'];
 const regions=plan.regions.map(a=>({
  id:a.id,number:a.number,
  origin:regionFields.map(k=>({key:k,origin:origin(k,a.mark?.conditions,project.context),value:a.context?.[k]||'unknown'})),
  warning:a.review.warnings[0]||'',next:a.review.checks[0]||'',
  status:a.canDraft?'conceptual':a.research.length?'research':'insufficient'
 }));
 const scenarios=['A','B'].map(slot=>{
  const s=project.scenarios?.[slot],items=s?.markers||[];
  return {slot,count:items.length,mode:scenarioMode(s),notes:items.filter(x=>x.notes?.trim()).slice(0,3).map(x=>x.notes.trim())};
 });
 return {observed,details,interpretations,steps:steps.slice(0,6),evidence,evidenceLabel,regions,scenarios,
  marks:marks.length,areaCount:plan.regions.length,candidateCount:candidates.size,researchCount:research.size,
  risk:plan.regions.some(a=>a.reviewPriority),hasPhoto:Boolean(project.image),
  markNotes:marks.filter(a=>a.notes?.trim()).slice(0,4).map(a=>a.notes.trim())};
}
