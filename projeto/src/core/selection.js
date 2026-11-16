import {plants,labels} from './knowledge.js';
export const conditionOptions={regionCode:['unknown','BR','IA'],soil:['unknown','slow','medium','fast'],sun:['unknown','full','mixed','shade'],moisture:['unknown','wet','moist','mesic','dry'],duration:['unknown','hours','day','persistent'],building:['unknown','near','away'],space:['unknown','small','large'],maintenance:['unknown','low','regular']};
export function cleanConditions(raw={}){return Object.fromEntries(Object.entries(conditionOptions).map(([k,v])=>[k,v.includes(raw[k])?raw[k]:'unknown']))}
export function selectPlants(context={},lang='pt'){
 const c=cleanConditions(context),pt=lang==='pt',t=labels[lang],missing=Object.keys(conditionOptions).filter(k=>c[k]==='unknown');
 const sufficient=c.regionCode!=='unknown'&&(c.sun!=='unknown'||c.moisture!=='unknown');
 const candidates=sufficient?plants.filter(p=>p.region===c.regionCode).flatMap(p=>{
 const reasons=[],checks=[];if(c.sun!=='unknown'&&p.sun.length&&!p.sun.includes(c.sun))return[];
 // Seasonal flooding in a pot experiment is NOT evidence of persistent saturation.
 if(c.moisture!=='unknown'&&p.moisture.length&&!p.moisture.includes(c.moisture))return[];
 for(const k of ['sun','moisture']){if(c[k]!=='unknown'&&p[k].includes(c[k]))reasons.push(t[c[k]]);else checks.push(pt?`Conferir ${k==='sun'?'luz':'umidade'} local e evidência da espécie.`:`Verify local ${k} and species evidence.`)}
 if(!reasons.length)return[];
 checks.push(pt?'Solo, espaço para porte adulto e manutenção não têm critérios quantitativos suficientes nesta base.':'Soil, mature spread and maintenance lack sufficient quantitative criteria in this catalog.');
 return[{plant:p,reasons,checks,direct:p.evidence==='guide',context:c}];
 }):[];
 return {context:c,missing,sufficient,candidates,risk:c.duration==='persistent'&&c.building==='near'};
}
