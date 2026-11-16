/** Non-destructive conceptual scenario snapshots. Photos remain a single original project image. */
export const slots=['A','B'];
export const isProposal=a=>a?.type==='garden'||(a?.type==='plants'&&Boolean(a.speciesId));
export function getLiveProposals(project){return (project?.annotations||[]).filter(isProposal).map(a=>structuredClone(a));}
export function captureScenario(project,slot){
 if(!slots.includes(slot))throw Error('Unsupported scenario');
 const markers=getLiveProposals(project);
 if(!markers.length)return false;
 project.scenarios={A:null,B:null,...(project.scenarios||{})};
 project.scenarios[slot]={markers,savedAt:Date.now()};
 return true;
}
export function renderScenarioProject(project,slot='original'){
 const baseline=(project.annotations||[]).filter(a=>!isProposal(a));
 const scene=slot==='original'?[]:slot==='current'?getLiveProposals(project):(project.scenarios?.[slot]?.markers||[]);
 return {...project,annotations:[...baseline,...scene]};
}
export function hasScenario(project,slot){return Boolean(project.scenarios?.[slot]&&Array.isArray(project.scenarios?.[slot]?.markers));}
