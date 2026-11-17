/**
 * Presentation-only deduplication of scientific area reviews.
 * A single shared evidence display never changes the underlying mark IDs,
 * application selection, project data or scientific eligibility.
 */
export function presentV211Regions(regions){
 const seen=new Map();
 return regions.map((area,index)=>{
  const displayNumber=area.number===null?null:index+1;
  const identity=JSON.stringify({
   type:area.markType,
   note:(area.notes||'').trim(),
   conditions:(area.conditions||[]).map(c=>[c.key,c.value,c.origin]),
   matches:(area.investigate||[]).map(x=>[x.id,x.level,x.agree.map(y=>y.field)]),
   research:(area.research||[]).map(x=>x.id),
   excluded:(area.outOfRange||[]).map(x=>x.id),
   needs:area.needs||[],
   constraints:area.constraints
  });
  const prior=seen.get(identity);
  if(!prior)seen.set(identity,{id:area.id,displayNumber});
  return {...area,displayNumber,duplicateOf:prior||null};
 });
}
export function summarizeV211Regions(regions){
 const display=presentV211Regions(regions);
 const checks=[...new Set(display.flatMap(r=>r.needs||[]))];
 return {areas:display.length,shared:display.filter(r=>r.duplicateOf).length,unique:display.filter(r=>!r.duplicateOf).length,
  constraints:display.some(r=>r.constraints),checks:checks.slice(0,3),display};
}
