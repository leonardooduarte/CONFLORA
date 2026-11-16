import assert from 'node:assert/strict';
import {plants} from '../src/core/knowledge.js';
import {selectPlants} from '../src/core/selection.js';

assert.equal(plants.length,14);
assert.equal(new Set(plants.map(p=>p.id)).size,plants.length);
const ids=['penstemon-digitalis','zizia-aurea','mertensia-virginica','panicum-virgatum'];
for(const id of ids){
 const p=plants.find(p=>p.id===id);
 assert(p&&p.region==='IA'&&p.evidence==='guide'&&p.taxonomyUrl&&p.sourceIds.includes('ia'));
 assert.equal(p.image,null,'No unlicensed stock image should be substituted');
}
const evidence=selectPlants({regionCode:'IA',sun:'full',moisture:'moist'},'pt');
assert(evidence.candidates.some(c=>c.plant.id==='penstemon-digitalis'));
assert(evidence.candidates.every(c=>c.plant.region==='IA'));
assert(!selectPlants({regionCode:'BR',moisture:'wet'},'pt').candidates.some(x=>x.plant.region==='IA'));
assert.equal(selectPlants({regionCode:'IA'},'pt').sufficient,false);
assert(selectPlants({regionCode:'IA',duration:'persistent',building:'near',sun:'full'},'pt').risk);
console.log('PASS science: catalog, evidence filters, regional separation, safety and photo provenance');
