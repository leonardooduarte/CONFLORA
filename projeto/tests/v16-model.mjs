import assert from 'node:assert/strict';
import {Store} from '../src/core/store.js';
import {normalizeProject} from '../src/core/project.js';
import {captureScenario,restoreScenario,renderScenarioProject} from '../src/core/scenarios.js';
import {plants,references} from '../src/core/knowledge.js';
import {evidenceClaims,evaluatePlantEvidence} from '../src/core/evidence.js';
import {assessSite} from '../src/core/siteAnalysis.js';

assert.equal(plants.length,19);
const inga=plants.find(p=>p.id==='inga-affinis');
assert(inga&&inga.scientific==='Inga affinis DC.'&&inga.region==='BR');
assert(inga.image?.observation==='https://www.inaturalist.org/observations/410985562'&&inga.image.license==='CC BY-SA 4.0');
assert.equal(inga.evidence,'ecology');
assert.deepEqual(inga.moisture,[]);
assert(inga.sourceIds.every(id=>references[id]?.url));
assert.equal(evidenceClaims.species[inga.id].floodResponse.matching,false);
assert.equal(evaluatePlantEvidence(inga,{regionCode:'BR',sun:'full',moisture:'wet'}).status,'research');
assert(!assessSite({regionCode:'BR',sun:'full',moisture:'wet'},'pt').selection.candidates.some(x=>x.plant.id==='inga-affinis'));
assert.equal(assessSite({regionCode:'IA',sun:'full',duration:'persistent',building:'near'},'pt').status,'assessment');

const p=Store.newProject('space');
p.image='data:image/png;base64,aGVsbG8=';
p.context.regionCode='BR';
p.annotations=[
 {id:'old-pool',type:'pool',x:75,y:90,size:1,kind:'point',notes:'Original',conditions:{regionCode:'BR',duration:'persistent',building:'near'}},
 {id:'old-path',type:'roof',kind:'path',x:100,y:100,size:1,points:[{x:100,y:100},{x:160,y:170}],notes:'Path'},
 {id:'garden-a',type:'garden',x:220,y:300,size:1,kind:'point',notes:'A garden'}
];
assert(captureScenario(p,'A'));
const original=p.image;
p.annotations=p.annotations.filter(a=>a.id!=='garden-a');
p.annotations.push({id:'garden-b',type:'garden',x:400,y:420,size:1,kind:'point',notes:'B garden'});
assert(captureScenario(p,'B'));
assert.equal(p.scenarios.A.markers[0].id,'garden-a');
assert.equal(p.scenarios.B.markers[0].id,'garden-b');
assert(restoreScenario(p,'A'));
assert.deepEqual(p.annotations.map(a=>a.id),['old-pool','old-path','garden-a']);
p.annotations[2].x=700;
assert.equal(p.scenarios.A.markers[0].x,220,'Loaded markers must not mutate the snapshot');
assert.equal(p.scenarios.B.markers[0].x,400,'Other scenario remains intact');
assert.equal(p.image,original);
assert.equal(p.annotations[0].conditions.building,'near');
assert.equal(p.annotations[1].points.length,2);
assert(captureScenario(p,'A'));
assert.equal(p.scenarios.A.markers[0].x,700);
assert(restoreScenario(p,'B'));
assert.equal(p.annotations[2].id,'garden-b');
assert.equal(p.scenarios.A.markers[0].x,700);
assert.deepEqual(renderScenarioProject(p,'original').annotations.map(a=>a.id),['old-pool','old-path']);
const imported=normalizeProject(JSON.parse(JSON.stringify(p)));
assert.equal(imported.scenarios.A.markers[0].x,700);
assert.equal(imported.scenarios.B.markers[0].id,'garden-b');
assert.equal(imported.image,original);
const old=Store.newProject();delete old.scenarios;
assert.deepEqual(normalizeProject(old).scenarios,{A:null,B:null});
assert.equal(restoreScenario(p,'invalid'),false); // invalid slot is non-destructive
console.log('PASS V16 scientific evidence, A/B recovery, original observations, import and compatibility');
