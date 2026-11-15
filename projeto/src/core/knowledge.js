import plants from '../data/plants.json' with {type:'json'};
import references from '../data/references.json' with {type:'json'};
export {plants,references};
export const say=(v,lang='pt')=>typeof v==='object'&&v!==null?(v[lang]||v.pt):v;
export const asset=p=>import.meta.env.BASE_URL+p.replace(/^\//,'');
export const labels={pt:{full:'Muito sol',mixed:'Sol e sombra',shade:'Sombra',wet:'Molhado',moist:'Úmido',mesic:'Umidade intermediária',dry:'Seco',seasonal:'Alagamentos episódicos no ensaio',unknown:'Não verificado',native:'Nativa no contexto',introduced:'Não nativa no contexto',herb:'Herbácea',climber:'Trepadeira',sedge:'Ciperácea',small:'Até 0,61 m',medium:'Até 0,91 m',guide:'Guia técnico regional',studied:'Uso estudado em protótipos'},en:{full:'Full sun',mixed:'Sun and part shade',shade:'Shade',wet:'Wet',moist:'Moist',mesic:'Mesic',dry:'Dry',seasonal:'Episodic flooding in trial',unknown:'Not verified',native:'Native in context',introduced:'Non-native in context',herb:'Herbaceous',climber:'Climber',sedge:'Sedge',small:'Up to 0.61 m',medium:'Up to 0.91 m',guide:'Regional technical guide',studied:'Studied in prototypes'}};
export function matchReasons(plant,context,lang){
 const t=labels[lang];const reasons=[];
 if(context.regionCode===plant.region)reasons.push(lang==='pt'?'Mesmo contexto regional informado.':'Matches the selected regional context.');
 if(plant.sun.includes(context.sun))reasons.push((lang==='pt'?'Luz documentada: ':'Documented light: ')+t[context.sun]);
 if(plant.moisture.includes(context.moisture))reasons.push((lang==='pt'?'Umidade documentada: ':'Documented moisture: ')+t[context.moisture]);
 return reasons;
}
export function buildPlan(p,lang='pt'){
 const pt=lang==='pt',a=p.annotations||[],out=[];
 const add=(id,condition,observation,check,source)=>{if(condition)out.push({id,observation,check,source})};
 add('pool',a.some(x=>x.type==='pool'&&x.kind!=='path')||p.context.pooling==='yes',pt?'Você registrou acúmulo de água.':'You recorded standing water.',pt?'Registre duração e frequência; não assuma que o ponto de acúmulo é adequado para infiltração.':'Record duration and frequency; do not assume the pooling location is suitable for infiltration.','isu');
 add('surface',a.some(x=>x.type==='paved'),pt?'Há superfície pavimentada marcada.':'A paved surface is marked.',pt?'Investigue material, compactação e destino do escoamento; a imagem não mede permeabilidade.':'Investigate material, compaction and runoff destination; the image does not measure permeability.','epa');
 add('path',a.some(x=>x.kind==='path'),pt?'Você desenhou caminhos de água observados.':'You drew observed water paths.',pt?'Confira sentidos durante chuva segura e registre incertezas; as setas não são cálculo hidráulico.':'Verify direction during safe rain observation and record uncertainties; arrows are not a hydraulic calculation.','isu');
 add('garden',a.some(x=>x.type==='garden')||p.solutions?.includes('rain'),pt?'Você explorou uma intervenção vegetada.':'You explored a vegetated intervention.',pt?'Verifique redes enterradas, fundações, solo, extravasamento e regras locais com apoio habilitado.':'Verify utilities, foundations, soil, overflow and local rules with qualified support.','ia');
 add('plants',p.plantInterests?.length,pt?'Há espécies na sua lista de interesse.':'There are species on your interest list.',pt?'Confirme identificação, origem regional, manejo e posição; interesse não é decisão de plantio validada.':'Confirm identity, regional origin, maintenance and position; interest is not a validated planting decision.','ia');
 const unknown=['regionCode','area','soil','sun','moisture'].filter(k=>!p.context[k]||p.context[k]==='unknown');
 return {items:out,unknown,next:pt?'Registre uma observação após chuva, complete os dados desconhecidos e leve as hipóteses a uma avaliação local.':'Record an observation after rain, fill unknown data and take hypotheses to a local assessment.'};
}
