import {cleanConditions,selectPlants} from './selection.js';

/**
 * Rule-based, non-diagnostic interpretation of observations volunteered by a user.
 * Nothing here infers image content, predicts infiltration or sizes stormwater systems.
 */
export function assessSite(raw={}, lang='pt', markType='') {
 const c=cleanConditions(raw),pt=lang==='pt';
 const selection=selectPlants(c,lang);
 const near=c.building==='near',persistent=c.duration==='persistent',slow=c.soil==='slow';
 const warnings=[],observations=[],checks=[],options=[];
 const add=(condition,ptText,enText,arr=observations)=>{if(condition)arr.push(pt?ptText:enText)};
 add(markType==='pool','Ponto de acúmulo registrado pelo usuário.','User marked a pooling observation.');
 add(markType==='paved','Superfície pavimentada observada pelo usuário.','User identified a paved surface.');
 add(markType==='roof','Saída do telhado marcada; a direção do escoamento ainda precisa ser observada.','A roof outlet was marked; the direction of runoff still needs to be observed.');
 add(c.duration==='hours','Segundo o registro, a água permanece por algumas horas.','Water remains for a few hours, according to the observation.');
 add(c.duration==='day','A água pode permanecer por até um dia, conforme relato.','Water may remain for up to one day, as reported.');
 add(persistent,'Foi relatada permanência recorrente ou superior a um dia.','Persistent or recurrent water was reported.');
 add(slow,'A drenagem do solo foi descrita como lenta, sem ensaio de infiltração.','Soil drainage was described as slow without an infiltration test.');
 add(near,'A área foi descrita como próxima de construções.','Area was reported near buildings.');
 add(persistent&&near,'Água persistente próxima a construções: avaliação profissional é prioritária; não escave ou plante como solução isolada.','Persistent water near buildings: professional assessment takes priority; do not excavate or treat planting as a standalone solution.',warnings);
 add(persistent&&!near,'Acúmulo persistente requer investigar origem, drenagem e destino seguro da água antes de considerar intervenções.','Persistent pooling requires investigating the source, drainage and safe overflow before considering interventions.',warnings);
 add(near&&!persistent,'Proximidade de construções exige verificar fundações e afastamentos antes de qualquer solução de infiltração.','Proximity to buildings requires checking foundations and setbacks before any infiltration practice.',warnings);
 add(slow,'A aparente drenagem lenta impede assumir que um jardim de chuva infiltrará água adequadamente.','Apparently slow drainage means rain garden infiltration cannot be presumed.',warnings);
 const needsAssessment=persistent||near;
 const canExplore=selection.sufficient&&!needsAssessment;
 if(c.regionCode==='unknown')checks.push(pt?'Definir o contexto regional para consultar fontes pertinentes.':'Choose a regional context to consult relevant sources.');
 if(c.sun==='unknown')checks.push(pt?'Observar a incidência de luz na área.':'Observe sun exposure at the site.');
 if(c.moisture==='unknown')checks.push(pt?'Descrever a umidade observada, sem confundir com teste de infiltração.':'Describe observed soil moisture, not an infiltration test.');
 if(c.duration==='unknown')checks.push(pt?'Registrar por quanto tempo a água permanece após a chuva.':'Record how long water remains after rainfall.');
 if(c.building==='unknown')checks.push(pt?'Conferir a proximidade de construções e redes enterradas.':'Check nearby structures and buried utilities.');
 checks.push(pt?'Verificar infiltração do solo, origem do escoamento e extravasamento seguro com orientação local.':'Verify soil infiltration, runoff source and safe overflow with local guidance.');
 if(canExplore){
  options.push({id:'vegetated',title:pt?'Cobertura vegetada para investigar':'Vegetated cover to explore',detail:pt?'Investigar proteção do solo, espécies regionais, manutenção e condições reais do local; não equivale a controle comprovado de alagamentos.':'Explore ground cover, regional species, care and local conditions; this is not proven flood control.',source:'epa-bioretention'});
  if(c.soil!=='slow'&&c.duration!=='persistent'){
   options.push({id:'rain',title:pt?'Jardim de chuva — hipótese condicionada':'Rain garden — conditional concept',detail:pt?'Avaliar localização, permeabilidade, entrada e saída da água. Nunca presumir que o ponto já alagado seja adequado.':'Assess siting, permeability, inflow and overflow. Do not assume the pooled location itself is suitable.',source:'epa-bioretention'});
  }
 }else if(!needsAssessment&&selection.sufficient) {
  options.push({id:'vegetated',title:pt?'Estudar vegetação após verificação':'Explore vegetation after verification',detail:pt?'Não há parâmetros suficientes para propor infiltração; investigar solo e drenagem antes.':'There is insufficient evidence for infiltration; investigate soil and drainage first.',source:'epa-bioretention'});
 }
 const status=needsAssessment?'assessment':!selection.sufficient?'incomplete':'exploratory';
 const candidateCount=selection.candidates.length;
 const evidence=pt
 ?(candidateCount? `O Herbário identifica ${candidateCount} espécie(s) com ao menos uma correspondência documentada no contexto regional. Isso não valida o plantio.`:'O Herbário não identificou espécies com correspondência documental suficiente para estas condições.')
 :(candidateCount?`The herbarium found ${candidateCount} species with at least one documented match in the regional context. This does not validate planting.`:'The herbarium did not find species with sufficient documented matches for these conditions.');
 return {status,context:c,observations,warnings,checks,options,evidence,candidateCount,selection,needsAssessment};
}
