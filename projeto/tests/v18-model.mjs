import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Store} from '../src/core/store.js';
import {normalizeProject} from '../src/core/project.js';
import {buildV18Proposal,makeV18Scenario} from '../src/core/v18Proposal.js';
import {plants,references} from '../src/core/knowledge.js';
import {evaluatePlantEvidence} from '../src/core/evidence.js';

const br=Store.newProject();
br.context={...br.context,regionCode:'BR',region:'Itapeva',area:'20',soil:'slow',sun:'full',moisture:'wet',duration:'unknown',building:'unknown'};
br.annotations=[
 {id:'roof1',type:'roof',x:100,y:200,kind:'point',size:1,notes:''},
 {id:'pool1',type:'pool',x:300,y:430,kind:'point',size:1,notes:'Água após chuva'},
 {id:'pool2',type:'pool',x:520,y:420,kind:'point',size:1,notes:''}
];
const plan=buildV18Proposal(br,'pt');
assert.equal(plan.regions.length,2,'Two marked pooling areas, not every observation type');
assert.equal(plan.eligibleCount,0,'Slow drainage and missing data must prevent automated planting');
assert.equal(plan.cards.filter(c=>c.status==='candidate').length,0);
assert(plan.cards.some(c=>c.status==='research'),'Must show research plants as research, not invent matches');
assert(plan.cards.every(c=>c.plant.region==='BR'),'Never transfer Iowa species to Brazil');
const ids=new Set();
for(const c of plan.cards){
 assert(!ids.has(c.plant.id));ids.add(c.plant.id);
 assert(c.source?.url,'A specific source must exist for every research record');
 assert(c.plant.image?.file,'Every displayed plant record must have a verified photo');
 assert(c.plant.image?.author&&c.plant.image?.license&&c.plant.image?.source,'Full photo credit required');
 assert(fs.existsSync(new URL('../public/botanical/'+c.plant.image.file,import.meta.url)),'Botanical photo must exist');
}
const original=JSON.stringify(br);
const no=makeV18Scenario(br,'A','pt');
assert.equal(no.created,false);
assert.equal(JSON.stringify(br),original,'No invented visual proposal when evidence or safety is insufficient');

const ia=Store.newProject();
ia.context={...ia.context,regionCode:'IA',sun:'full',moisture:'wet',soil:'medium',duration:'hours',building:'away'};
ia.annotations=[{id:'pool1',type:'pool',x:500,y:400,kind:'point',size:1,notes:'A',conditions:{}}];
const response=buildV18Proposal(ia,'en');
assert(response.regions[0].candidates.length>0,'Grounded Iowa wet full-sun guide should provide matching choices');
assert(response.regions[0].candidates.every(c=>evaluatePlantEvidence(c.plant,ia.context,'en').status==='documented'));
assert(response.canDraft);
assert(makeV18Scenario(ia,'A','en').created);
assert(makeV18Scenario(ia,'B','en').created);
assert(ia.scenarios.A.markers.length>0&&ia.scenarios.B.markers.length>0);
assert(ia.scenarios.A.markers.every(m=>plants.some(p=>p.id===m.speciesId&&p.region==='IA')));
assert(ia.scenarios.A.markers.every(m=>m.type==='plants'&&m.x>=40&&m.x<=960));
assert.notDeepEqual(ia.scenarios.A.markers,ia.scenarios.B.markers,'Alternatives should differ visually');
assert.equal(ia.annotations.length,1,'Original mark remains untouched');
const imp=normalizeProject(JSON.parse(JSON.stringify(ia)));
assert.equal(imp.scenarios.A.markers.length,ia.scenarios.A.markers.length);
assert.equal(imp.scenarios.B.markers.length,ia.scenarios.B.markers.length);
assert.equal(imp.annotations.length,1);
const risk=Store.newProject();
risk.context={...ia.context,regionCode:'IA',duration:'persistent',building:'near'};
risk.annotations=ia.annotations.map(a=>structuredClone(a));
assert.equal(buildV18Proposal(risk,'en').canDraft,false);
assert.equal(makeV18Scenario(risk,'B','en').created,false);
const missing=Store.newProject();
missing.context.regionCode='unknown';
assert.equal(buildV18Proposal(missing,'pt').cards.length,0);
for(const r of Object.values(references)){assert(r.url.startsWith('https://'),'References must be explicit URLs')}
console.log('PASS V18 source-grounded BR research vs candidate classification, 2 areas, safety, generated A/B, import compatibility, 4 verified photo credits');
