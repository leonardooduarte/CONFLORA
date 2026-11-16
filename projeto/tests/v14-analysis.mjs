import assert from 'node:assert/strict';
import {assessSite} from '../src/core/siteAnalysis.js';
import {plants,references} from '../src/core/knowledge.js';
import {Store} from '../src/core/store.js';
import {normalizeProject} from '../src/core/project.js';

const danger=assessSite({regionCode:'IA',sun:'full',moisture:'moist',duration:'persistent',building:'near'},'pt','pool');
assert.equal(danger.status,'assessment');
assert.equal(danger.options.length,0,'No intervention proposal near foundations with persistent water');
assert(danger.warnings.some(x=>x.includes('avaliação profissional')));
const ordinary=assessSite({regionCode:'IA',sun:'full',moisture:'moist',duration:'hours',building:'away'},'pt','pool');
assert.equal(ordinary.status,'exploratory');
assert(ordinary.options.some(x=>x.id==='rain'));
assert(ordinary.candidateCount>0);
const slow=assessSite({regionCode:'IA',sun:'full',moisture:'moist',duration:'hours',building:'away',soil:'slow'},'pt','pool');
assert(!slow.options.some(x=>x.id==='rain'));
assert(slow.warnings.some(x=>x.includes('drenagem lenta')));
const unsure=assessSite({regionCode:'unknown',duration:'hours'},'pt','pool');
assert.equal(unsure.status,'incomplete');assert.equal(unsure.candidateCount,0);
const brazil=assessSite({regionCode:'BR',sun:'full',moisture:'wet',duration:'hours',building:'away'},'pt','pool');
assert(!brazil.selection.candidates.some(c=>c.plant.region==='IA'));
assert(brazil.evidence.includes('não identificou'));
const eco=plants.find(p=>p.id==='cyperus-giganteus');
assert(eco?.evidence==='ecology'&&eco.image?.author&&eco.image?.license&&eco.image?.source);
assert(eco.sourceIds.every(id=>references[id]?.url));
assert(!brazil.selection.candidates.some(c=>c.plant.id===eco.id),'A morphological study must not turn into a rain-garden recommendation');
const original=Store.newProject('space');
original.annotations=[
 {id:'a',type:'pool',x:100,y:200,size:1,kind:'point',notes:'Near home',conditions:{regionCode:'IA',sun:'full',duration:'persistent',building:'near'}},
 {id:'b',type:'garden',x:500,y:300,size:1,kind:'point',notes:'Garden',conditions:{regionCode:'IA',sun:'full',moisture:'moist',duration:'hours',building:'away'}}
];
const reopened=normalizeProject(original);
const areaA=assessSite({...reopened.context,...reopened.annotations[0].conditions},'pt','pool');
const areaB=assessSite({...reopened.context,...reopened.annotations[1].conditions},'pt','garden');
assert.equal(areaA.status,'assessment');assert.equal(areaB.status,'exploratory');
assert.equal(reopened.annotations[1].conditions.moisture,'moist');
assert.equal(assessSite({regionCode:'IA',sun:'full',duration:'hours',building:'away'},'en').status,'exploratory');
console.log('PASS V14 site analysis: risk, soil, region, unknown evidence, data migration, divergent areas');
