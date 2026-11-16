import assert from 'node:assert/strict';
import {site} from './v19-fixtures.mjs';
import {buildV19Proposal,makeV19Scenario,updateScenarioMarker,scenarioEvidenceCurrent} from '../src/core/v19Proposal.js';
import {normalizeProject} from '../src/core/project.js';
import {captureScenario,restoreScenario} from '../src/core/scenarios.js';
import {plants} from '../src/core/knowledge.js';
import {evaluatePlantEvidence,evidenceClaims} from '../src/core/evidence.js';
const br=site(),photo=br.image,annotations=JSON.stringify(br.annotations),p=buildV19Proposal(br);
assert.equal(p.regions.length,3);assert.equal(p.groups.length,1);assert.deepEqual(p.groups[0].areaNumbers,[1,2,3]);assert.equal(p.groups[0].category,'D');
assert.equal(p.cards.filter(c=>c.status==='candidate').length,0);assert.equal(p.cards.length,3);assert(p.cards.every(c=>c.plant.region==='BR'&&c.status==='research'));
assert(!makeV19Scenario(br,'A','botanical').created);assert(makeV19Scenario(br,'A','exploratory').created);assert(makeV19Scenario(br,'B','exploratory').created);
assert(br.scenarios.A.markers.every(m=>!m.speciesId&&m.studyKind==='review'));assert.equal(br.image,photo);assert.equal(JSON.stringify(br.annotations),annotations);
const b=JSON.stringify(br.scenarios.B);updateScenarioMarker(br,'A',br.scenarios.A.markers[0].id,{x:350,rotation:20,opacity:.4,perspective:.7,size:1.2});assert.equal(JSON.stringify(br.scenarios.B),b);
assert.equal(br.scenarios.A.markers[0].points[0].x,276);
const imp=normalizeProject(JSON.parse(JSON.stringify(br)));assert.equal(imp.scenarios.A.mode,'exploratory');assert.equal(imp.scenarios.A.markers[0].rotation,20);assert.equal(imp.image,photo);assert.equal(imp.annotations.length,7);
assert(restoreScenario(imp,'A'));assert.equal(imp.annotations.filter(m=>!m.studyKind).length,7);assert(captureScenario(imp,'A'));assert.equal(imp.scenarios.A.mode,'exploratory');assert.equal(JSON.stringify(imp.scenarios.B.markers),JSON.stringify(normalizeProject(br).scenarios.B.markers));
for(const [field,value]of [['notes','Differentiating observation'],['conditions',{maintenance:'low'}],['conditions',{space:'small'}],['conditions',{duration:'persistent'}],['type','space']]){const q=site();q.annotations[1][field]=value;assert.equal(buildV19Proposal(q).groups.length,2,field+' must prevent inappropriate grouping');}
const risk=site();risk.context.duration='persistent';risk.context.building='near';makeV19Scenario(risk,'A');assert(risk.scenarios.A.markers.every(m=>m.studyKind==='exclusion'));assert(!makeV19Scenario(risk,'B','botanical').created);
const ia=site('IA');assert(makeV19Scenario(ia,'A','botanical','en').created);assert(makeV19Scenario(ia,'B','botanical','en').created);assert.notDeepEqual(ia.scenarios.A.markers,ia.scenarios.B.markers);assert(ia.scenarios.A.markers.every(m=>plants.some(p=>p.id===m.speciesId&&p.region==='IA'&&evaluatePlantEvidence(p,ia.context,'en').status==='documented')));
const weak=site('IA');weak.context.moisture='unknown';assert(!buildV19Proposal(weak).canDraft);assert.equal(evaluatePlantEvidence(plants.find(p=>p.region==='IA'&&p.sun.includes('full')),weak.context,'en').status,'investigate');
for(const id of ['commelina','distimake','trimezia','syngonium']){const plant=plants.find(p=>p.id.startsWith(id));assert(plant);assert.deepEqual(plant.moisture,[]);assert.equal(evidenceClaims.species[plant.id].moisture.matching,false)}
for(const version of [11,12]){const old=site();old.version=version;delete old.scenarios;assert.equal(normalizeProject(old).version,12)}
console.log('PASS V19: equivalent areas, differentiated risks, no BR recommendation, exploratory and botanical A/B, editing independence, local image preserved, legacy migration, strict evidence');

assert(scenarioEvidenceCurrent(ia,'A'));const changed=structuredClone(ia);changed.context.regionCode='BR';assert(!scenarioEvidenceCurrent(changed,'A'),'Changing region must invalidate a saved documented label');
for(const sun of ['full','mixed','shade'])for(const moisture of ['wet','moist','mesic','dry']){const q=site('IA');Object.assign(q.context,{sun,moisture});const model=buildV19Proposal(q);assert(model.cards.every(c=>c.plant.image),'No empty photo cards');if(makeV19Scenario(q,'A','botanical').created)assert(q.scenarios.A.markers.every(m=>plants.find(p=>p.id===m.speciesId).image),'No invented illustration for an unpictured species')}
console.log('PASS V19 photo provenance gates and saved-composition revalidation across 12 conditions');
