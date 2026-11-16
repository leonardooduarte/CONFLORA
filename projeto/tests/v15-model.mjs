import assert from 'node:assert/strict';
import {plants,references} from '../src/core/knowledge.js';
import {evidenceClaims,evaluatePlantEvidence,evaluateAllEvidence} from '../src/core/evidence.js';
import {captureScenario,renderScenarioProject,hasScenario} from '../src/core/scenarios.js';
import {Store} from '../src/core/store.js';
import {normalizeProject} from '../src/core/project.js';
import {Ed} from '../src/core/editor.js';

assert.equal(plants.length,18);
assert.equal(Object.keys(evidenceClaims.species).length,18);
assert.equal(new Set(plants.map(p=>p.id)).size,18);
for(const p of plants){
 const claims=evidenceClaims.species[p.id];assert(claims?.taxonomy?.sourceUrl===p.taxonomyUrl);
 assert(claims.region.value===p.region);
 assert(p.sourceIds.every(id=>Boolean(references[id]?.url)));
 for(const field of ['sun','moisture']){
  const c=claims[field];
  if(c?.matching){assert(p.evidence==='guide');assert(c.sourceId==='ia');assert(c.values.length);assert(references[c.sourceId]);}
 }
}
for(const id of ['alternanthera-brasiliana','rhynchanthera-grandiflora','arachis-repens','cyperus-giganteus']){
 const p=plants.find(x=>x.id===id);assert(p&&p.region==='BR'&&p.evidence==='ecology'&&!p.image);
 const evaluation=evaluatePlantEvidence(p,{regionCode:'BR',sun:'full',moisture:'wet'});
 assert.equal(evaluation.status,'research');assert(evaluation.citations.length);
}
const guide=plants.find(x=>x.id==='penstemon-digitalis');
assert(['documented','investigate'].includes(evaluatePlantEvidence(guide,{regionCode:'IA',sun:'full',moisture:'moist'}).status));
assert.equal(evaluatePlantEvidence(guide,{regionCode:'BR',sun:'full'}).status,'outside');
assert.equal(evaluatePlantEvidence(guide,{regionCode:'unknown'}).status,'insufficient');
assert(!evaluateAllEvidence({regionCode:'BR',sun:'full'}).some(x=>x.plant.region==='IA'));

const p=Store.newProject('space');
p.image='data:image/png;base64,aGVsbG8=';
p.annotations=[
 {id:'observed',type:'pool',x:100,y:100,kind:'point',size:1,notes:'Water mark'},
 {id:'garden-1',type:'garden',x:280,y:280,kind:'point',size:1,notes:'Vegetated concept'},
 {id:'species-1',type:'plants',speciesId:'commelina',x:350,y:310,kind:'point',size:1,notes:'Plant symbol'}
];
assert(captureScenario(p,'A'));assert(hasScenario(p,'A'));
assert.equal(p.scenarios.A.markers.length,2);
p.annotations=p.annotations.filter(x=>x.id!=='garden-1');
p.annotations.push({id:'garden-2',type:'garden',x:510,y:410,kind:'point',size:1,notes:'Alternative'});
assert(captureScenario(p,'B'));
assert.equal(p.scenarios.A.markers.length,2);
assert.equal(p.scenarios.B.markers.length,2);
assert.notDeepEqual(p.scenarios.A.markers,p.scenarios.B.markers);
const a=renderScenarioProject(p,'A'),b=renderScenarioProject(p,'B'),original=renderScenarioProject(p,'original');
assert.deepEqual(original.annotations.map(x=>x.id),['observed']);
assert(a.annotations.some(x=>x.id==='garden-1')&&!a.annotations.some(x=>x.id==='garden-2'));
assert(b.annotations.some(x=>x.id==='garden-2')&&!b.annotations.some(x=>x.id==='garden-1'));
assert.equal(a.image,p.image);assert.equal(b.image,p.image);
const imported=normalizeProject(JSON.parse(JSON.stringify(p)));
assert.equal(imported.scenarios.A.markers.length,2);
assert.equal(imported.scenarios.B.markers.length,2);
assert.deepEqual(imported.scenarios.A.markers.map(x=>x.id),p.scenarios.A.markers.map(x=>x.id));
assert.equal(imported.image,p.image);
assert(Ed.svgContent(renderScenarioProject(imported,'A')).includes('garden-1'));
assert(!Ed.svgContent(renderScenarioProject(imported,'A')).includes('garden-2'));
const legacy=Store.newProject('space');delete legacy.scenarios;
const migrated=normalizeProject(legacy);
assert.deepEqual(migrated.scenarios,{A:null,B:null});
const malicious={...p,scenarios:{A:{markers:[{id:'x',type:'not-a-marker',x:0,y:0},{id:'good',type:'garden',x:420,y:380,kind:'point',notes:'<script>'}],savedAt:Date.now()},B:null}};
const safe=normalizeProject(malicious);
assert.equal(safe.scenarios.A.markers.length,1);
assert.equal(safe.scenarios.A.markers[0].id,'good');
console.log('PASS V15 model: field citations, research-only Brazil, A/B independence, geometry migration, old projects');
