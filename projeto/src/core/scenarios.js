/** Non-destructive conceptual scenario snapshots. Photos remain a single original project image. */
export const slots=['A','B'];
export const isProposal=a=>a?.type==='garden'||(a?.type==='plants'&&Boolean(a.speciesId));
export function getLiveProposals(project){return (project?.annotations||[]).filter(isProposal).map(a=>structuredClone(a));}
export function captureScenario(project,slot){
 if(!slots.includes(slot))throw Error('Unsupported scenario');
 const markers=getLiveProposals(project);
 if(!markers.length)return false;
 project.scenarios={A:null,B:null,...(project.scenarios||{})};
 project.scenarios[slot]={markers,mode:markers.some(m=>m.speciesId)?'botanical':'exploratory',savedAt:Date.now()};
 return true;
}
export function renderScenarioProject(project,slot='original'){
 const baseline=(project.annotations||[]).filter(a=>!isProposal(a));
 const scene=slot==='original'?[]:slot==='current'?getLiveProposals(project):(project.scenarios?.[slot]?.markers||[]);
 return {...project,annotations:[...baseline,...scene]};
}
export function hasScenario(project,slot){return Boolean(project.scenarios?.[slot]&&Array.isArray(project.scenarios?.[slot]?.markers));}

/**
 * Restore a saved proposal as the live editable composition, retaining the
 * source photograph, observed pooling/surfaces/paths and environmental context.
 * Call from the UI only after the user confirms replacing current proposals.
 * The surrounding project change() callback supplies undo/redo history.
 */
export function restoreScenario(project,slot){
 if(!hasScenario(project,slot))return false;
 const originals=(project.annotations||[]).filter(a=>!isProposal(a));
 const snapshot=project.scenarios[slot].markers.map(a=>structuredClone(a));
 const occupied=new Set(originals.map(a=>a.id));
 if(snapshot.some(a=>occupied.has(a.id))||new Set(snapshot.map(a=>a.id)).size!==snapshot.length){
  throw Error('Scenario marker IDs conflict with observed terrain marks');
 }
 project.annotations=[...originals,...snapshot];
 return true;
}
