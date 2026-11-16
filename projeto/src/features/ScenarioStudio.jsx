import React,{useMemo} from 'react';
import {Ed} from '../core/editor.js';
import {captureScenario,renderScenarioProject,hasScenario,getLiveProposals} from '../core/scenarios.js';
const slotNames={pt:{original:'Terreno observado',A:'Composição A',B:'Composição B'},en:{original:'Observed site',A:'Composition A',B:'Composition B'}};
export default function ScenarioStudio({project,lang='pt',change,onEdit,readOnly=false}){
 const pt=lang==='pt',proposals=getLiveProposals(project),labels=slotNames[lang];
 const snapshots=useMemo(()=>['original','A','B'].map(slot=>{
  const exists=slot==='original'||hasScenario(project,slot);
  const current=exists?renderScenarioProject(project,slot):null;
  const svg=current?Ed.svgContent(current,{labelMode:'numbers',svgLabel:labels[slot]}):null;
  return {slot,exists,uri:svg?'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg):null,marks:slot==='original'?0:project.scenarios?.[slot]?.markers.length||0};
 }),[project,lang]);
 return <section className="scenario-studio" aria-label={pt?'Composições conceituais do terreno':'Conceptual site compositions'}>
  <header><span className="eyebrow">CONFLORA / {pt?'CENÁRIOS VISUAIS':'VISUAL SCENARIOS'}</span><h3>{pt?'Uma fotografia. Duas possibilidades para comparar.':'One photograph. Two alternatives to compare.'}</h3>
   <p>{pt?'Adicione marcas de jardim ou de plantas com espécie no editor. Salve os elementos atuais como A ou B; a fotografia e as observações originais não são modificadas.':'Add garden or species planting markers in the editor. Save current proposed elements as A or B; the original photo and observations remain unchanged.'}</p>
  </header>
  <div className="scenario-studio__grid">{snapshots.map(item=><article key={item.slot}>
   <div className="scenario-studio__label"><strong>{labels[item.slot]}</strong>{item.slot!=='original'&&<small>{item.exists?(pt?`${item.marks} marcações salvas`:`${item.marks} saved marks`):(pt?'Ainda não salva':'Not yet saved')}</small>}</div>
   {item.exists?<img src={item.uri} alt={pt?`Visualização conceitual: ${labels[item.slot]}`:`Conceptual view: ${labels[item.slot]}`} loading="lazy"/>:<div className="scenario-studio__placeholder">{pt?'Crie uma composição no editor e salve aqui.':'Create a composition in the editor and save here.'}</div>}
   {!readOnly&&item.slot!=='original'&&<button type="button" className="btn secondary" disabled={!proposals.length} onClick={()=>change(p=>captureScenario(p,item.slot))}>{item.exists?(pt?'Atualizar composição':'Update composition'):(pt?'Salvar composição':'Save composition')} {item.slot}</button>}
  </article>)}</div>
  {!readOnly&&<div className="scenario-studio__actions">{onEdit&&<button type="button" className="text-action" onClick={onEdit}>{pt?'Editar marcações no terreno':'Edit site markers'} ↗</button>}{!proposals.length&&<p>{pt?'Para salvar A ou B, primeiro adicione uma marca de jardim ou escolha uma espécie e posicione-a no editor.':'To save A or B, add a garden marker or position a selected plant in the editor.'}</p>}</div>}
  <p className="fine">{pt?'Comparação conceitual sem escala física, simulação de crescimento ou previsão de redução de alagamentos.':'Conceptual comparison, without physical scale, growth simulation or predicted flood reduction.'}</p>
 </section>;
}
