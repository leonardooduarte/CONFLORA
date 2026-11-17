import React,{useRef,useState} from 'react';
import {plants} from '../core/knowledge.js';
import {proposalSVG,proposalPNG} from '../core/proposalImage.js';
import {scenarioMode,exploratoryNotice,updateScenarioMarker,scenarioEvidenceCurrent} from '../core/v19Proposal.js';
export default function V19Visual({project,slot='A',lang='pt',change,compact=false}){
 const pt=lang==='pt',scenario=project.scenarios?.[slot],mode=scenarioMode(scenario),markers=scenario?.markers||[],current=scenarioEvidenceCurrent(project,slot);
 const [selected,setSelected]=useState(''),[drag,setDrag]=useState(null),[fraction,setFraction]=useState(100),[error,setError]=useState('');const ref=useRef(null),origin=useRef(null);
 const active=markers.find(m=>m.id===selected)||markers[0];
 const display=drag?{...project,scenarios:{...project.scenarios,[slot]:{...scenario,markers:markers.map(m=>m.id===drag.id?{...m,x:drag.x,y:drag.y,points:m.points?.map(p=>({x:p.x+drag.x-m.x,y:p.y+drag.y-m.y}))}:m)}}}:project;
 const patch=props=>change?.(p=>updateScenarioMarker(p,slot,active.id,props));
 const pos=e=>{const svg=ref.current?.querySelector('svg');const point=svg?.createSVGPoint();if(!point)return null;point.x=e.clientX;point.y=e.clientY;return point.matrixTransform(svg.getScreenCTM().inverse())};
 const down=e=>{const id=e.target.closest('[data-proposal-id]')?.dataset.proposalId;if(!id||!change)return;setSelected(id);const p=pos(e),m=markers.find(m=>m.id===id);origin.current={id,x:m.x,y:m.y,px:p.x,py:p.y};e.currentTarget.setPointerCapture(e.pointerId)};
 const move=e=>{if(!origin.current)return;const p=pos(e),o=origin.current;setDrag({id:o.id,x:Math.max(20,Math.min(980,o.x+p.x-o.px)),y:Math.max(20,Math.min(630,o.y+p.y-o.py))})};
 const up=()=>{if(drag&&change)change(p=>updateScenarioMarker(p,slot,drag.id,{x:drag.x,y:drag.y}));origin.current=null;setDrag(null)};
 if(!project.image)return <p>{pt?'Envie a fotografia original para explorar uma proposta.':'Upload the original photo to explore a proposal.'}</p>;
 return <figure className={'v19-visual v18-proposal-visual '+mode}>
 <header><strong>{mode==='exploratory'?(pt?'Estudo exploratório ':'Exploratory study '):(current?(pt?'Proposta botânica documental ':'Documented botanical proposal '):(pt?'Composição salva · reavaliar ':'Saved composition · reassess '))}{slot}</strong><span>{markers.length} {pt?(markers.length===1?'elemento':'elementos'):(markers.length===1?'element':'elements')}</span></header>
 <div className="v19-comparison" ref={ref}>
  <img src={project.image} alt={pt?'Fotografia original preservada':'Preserved original photo'}/>
  <div className="v19-svg" style={{clipPath:`inset(0 ${100-fraction}% 0 0)`}} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} dangerouslySetInnerHTML={{__html:proposalSVG(display,slot,lang)}}/>
 </div>
 {mode==='botanical'&&!current&&<p className="v18-warning">{pt?'As condições atuais não sustentam a correspondência desta composição salva. Reavalie as evidências antes de considerar implantação.':'Current conditions do not support the matches in this saved composition. Reassess evidence before considering installation.'}</p>}
 <figcaption>{mode==='exploratory'?exploratoryNotice[lang]:(pt?'Fotocolagem conceitual com fotografias de referência identificadas. Recorte oval, escala visual e perspectiva ilustrativas; sem previsão de crescimento ou desempenho.':'Conceptual collage with identified reference photographs. Oval crops, visual scale and perspective are illustrative, without growth or performance predictions.')}</figcaption>
 {!compact&&<label className="v19-swipe">{pt?'Original / proposta':'Original / proposal'} {slot}<input type="range" min="0" max="100" value={fraction} onChange={e=>setFraction(+e.target.value)} aria-label={(pt?'Comparar original e ':'Compare original and ')+slot}/></label>}
 <ol className="v19-legend">{markers.map((m,i)=><li key={m.id}>{i+1}. {plants.find(p=>p.id===m.speciesId)?.scientific||m.notes}</li>)}</ol>
 {change&&!compact&&active&&<details className="v19-edit"><summary>{pt?'Editar elementos da alternativa ':'Edit elements in alternative '}{slot}</summary><label>{pt?'Elemento':'Element'}<select value={active.id} onChange={e=>setSelected(e.target.value)}>{markers.map((m,i)=><option key={m.id} value={m.id}>{i+1}. {plants.find(p=>p.id===m.speciesId)?.scientific||m.notes}</option>)}</select></label><p>{pt?'Arraste um elemento na imagem ou ajuste os controles. As medidas são visuais, sem escala real.':'Drag an element or use the controls. Measurements are visual, not physical.'}</p><div className="v19-controls">{[['x',20,980,1,'X'],['y',20,630,1,'Y'],['size',.55,2.4,.05,pt?'Escala visual':'Visual scale'],['rotation',-45,45,1,pt?'Rotação':'Rotation'],['perspective',.35,1.2,.05,pt?'Perspectiva visual':'Visual perspective'],['opacity',.2,1,.05,pt?'Opacidade':'Opacity']].map(([k,min,max,step,label])=><label key={k}>{label} {slot}<input type={k==='x'||k==='y'?'number':'range'} min={min} max={max} step={step} value={active[k]??(k==='opacity'?.8:k==='size'||k==='perspective'?1:0)} onChange={e=>patch({[k]:+e.target.value})}/></label>)}</div><button className="btn secondary" onClick={()=>change(p=>{p.scenarios[slot].markers=p.scenarios[slot].markers.filter(m=>m.id!==active.id)})}>{pt?'Remover elemento':'Remove element'}</button></details>}
 {!compact&&<button className="btn secondary" onClick={async()=>{try{const a=document.createElement('a');a.href=await proposalPNG(project,slot,lang);a.download='conflora-v19-'+slot+'.png';a.click();setError('')}catch{setError(pt?'Não foi possível exportar a imagem. Confira se as fotos carregaram.':'Unable to export. Check the photographs have loaded.')}}}>{pt?'Baixar proposta ':'Download proposal '}{slot} · PNG</button>}
 {error&&<p role="alert">{error}</p>}
 </figure>;
}
