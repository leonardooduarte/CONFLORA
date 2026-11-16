import React,{useMemo,useEffect,useState} from 'react';
import {Ed} from '../core/editor.js';
import {proposalSVG,dataImage} from '../core/proposalImage.js';
import {plants,asset} from '../core/knowledge.js';
import {captureScenario,restoreScenario,renderScenarioProject,hasScenario,getLiveProposals} from '../core/scenarios.js';

const slotNames={
 pt:{original:'Terreno observado',A:'Composição A',B:'Composição B'},
 en:{original:'Observed site',A:'Composition A',B:'Composition B'}
};
const legend=(mark,lang)=>{
 const plant=plants.find(p=>p.id===mark.speciesId);
 return plant?.scientific||(mark.notes?.trim())||(lang==='pt'?'Jardim conceitual':'Conceptual garden');
};
export default function ScenarioStudio({project,lang='pt',change,onEdit,readOnly=false}){
 const [photos,setPhotos]=useState({});
 useEffect(()=>{let disposed=false;const urls=[...new Set(['A','B'].flatMap(s=>(project.scenarios?.[s]?.markers||[]).map(m=>plants.find(p=>p.id===m.speciesId)?.image?.file).filter(Boolean)).map(file=>asset('botanical/'+file)))];Promise.all(urls.map(async u=>[u,await dataImage(u)])).then(pairs=>{if(!disposed)setPhotos(Object.fromEntries(pairs))}).catch(()=>{});return()=>{disposed=true}},[project.scenarios]);
 const pt=lang==='pt',proposals=getLiveProposals(project),labels=slotNames[lang];
 const snapshots=useMemo(()=>['original','A','B'].map(slot=>{
  const exists=slot==='original'||hasScenario(project,slot);
  const current=exists?renderScenarioProject(project,slot):null;
  const svg=current?(slot!=='original'&&project.image?proposalSVG(project,slot,lang,photos):Ed.svgContent(current,{labelMode:'numbers',svgLabel:labels[slot]})):null;
  return {slot,exists,uri:svg?'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg):null,markers:slot==='original'?[]:project.scenarios?.[slot]?.markers||[]};
 }),[project,lang,photos]);
 const save=slot=>{
  if(hasScenario(project,slot)&&!window.confirm(pt?`Substituir a composição ${slot} salva pelas marcações atuais? A outra composição não será alterada.`:`Replace saved composition ${slot} with current marks? The other composition is unchanged.`))return;
  change(p=>captureScenario(p,slot));
 };
 const restore=slot=>{
  if(!hasScenario(project,slot))return;
  const current=JSON.stringify(proposals),saved=JSON.stringify(project.scenarios[slot].markers);
  if(current!==saved&&!window.confirm(pt?`Carregar a composição ${slot} para edição? As marcações de proposta atualmente no editor serão substituídas. A outra composição, a foto e as observações originais permanecem salvas.`:`Load composition ${slot} for editing? Current proposed marks in the editor will be replaced. The other composition, photo and observed marks stay intact.`))return;
  change(p=>restoreScenario(p,slot));
  onEdit?.();
 };
 return <section className="scenario-studio" aria-label={pt?'Composições conceituais do terreno':'Conceptual site compositions'}>
  <header><span className="eyebrow">CONFLORA / {pt?'CENÁRIOS VISUAIS':'VISUAL SCENARIOS'}</span>
   <h3>{pt?'Uma fotografia. Duas alternativas editáveis.':'One photograph. Two editable alternatives.'}</h3>
   <p>{pt?'Crie marcas de jardim ou plantas no editor, salve A e B e carregue qualquer composição para continuar editando. Nenhuma ação altera a fotografia original.':'Create garden or plant marks in the editor, save A and B, and load either composition to keep editing. The original photograph is never changed.'}</p>
  </header>
  <div className="scenario-studio__grid">{snapshots.map(item=><article key={item.slot}>
   <div className="scenario-studio__label"><strong>{labels[item.slot]}</strong>{item.slot!=='original'&&<small>{item.exists?(pt?`${item.markers.length} ${item.markers.length===1?'elemento':'elementos'}`:`${item.markers.length} ${item.markers.length===1?'element':'elements'}`):(pt?'Não salva':'Not saved')}</small>}</div>
   {item.exists?<img src={item.uri} alt={pt?`Prévia de ${labels[item.slot]}`:`Preview of ${labels[item.slot]}`} loading="lazy"/>:<div className="scenario-studio__placeholder">{pt?'Crie uma composição no editor e salve aqui.':'Create a proposal in the editor and save here.'}</div>}
   {item.slot!=='original'&&item.exists&&<div className="scenario-studio__legend"><strong>{pt?'Elementos desta proposta':'Elements in this proposal'}</strong>
    <ol>{item.markers.map((m,i)=><li key={m.id}><span>{String(i+1).padStart(2,'0')}</span>{legend(m,lang)}</li>)}</ol></div>}
   {!readOnly&&item.slot!=='original'&&<div className="scenario-studio__buttons">
    {item.exists&&<button type="button" className="btn secondary" onClick={()=>restore(item.slot)}>{pt?'Carregar para editar':'Load to edit'} {item.slot}</button>}
    <button type="button" className="btn secondary" disabled={!proposals.length} onClick={()=>save(item.slot)}>{item.exists?(pt?'Atualizar composição':'Update composition'):(pt?'Salvar composição':'Save composition')} {item.slot}</button>
   </div>}
  </article>)}</div>
  {!readOnly&&<div className="scenario-studio__actions">{onEdit&&<button type="button" className="text-action" onClick={onEdit}>{pt?'Voltar ao editor do terreno':'Back to site editor'} ↗</button>}
   <p>{pt?'Depois de salvar A/B, use também “Salvar” no projeto para manter as composições ao reabrir o navegador.':'After saving A/B, also save the project to keep both when reopening the browser.'}</p>
   {!proposals.length&&<p>{pt?'Adicione primeiro uma marca de jardim ou uma planta identificada para criar uma proposta.':'Add a garden or identified plant marker before saving a proposal.'}</p>}
  </div>}
  <p className="fine">{pt?'Comparação conceitual, sem escala física, crescimento simulado ou previsão de redução de alagamentos.':'Conceptual comparison without physical scale, simulated growth or predicted flood reduction.'}</p>
 </section>;
}
