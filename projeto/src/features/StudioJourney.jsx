import React,{useState} from 'react';
import {Conditions} from './TerrainSelection.jsx';
import {selectPlants} from '../core/selection.js';

/**
 * Non-diagnostic guided connection between the existing editor, documented
 * environmental observations, the herbarium and the plan.
 * Photos remain local: this component does not upload or infer their contents.
 */
export default function StudioJourney({project,lang,selected,onChoose,onPhoto,onMark,onCondition,onPlants,onPlan}){
 const pt=lang==='pt';
 const [showConditions,setShowConditions]=useState(false);
 const annotations=project.annotations.filter(a=>a.type!=='plants'||!a.speciesId);
 const area=annotations.find(a=>a.id===selected)||annotations[0];
 const context=area?{...project.context,...(area.conditions||{})}:project.context;
 const result=selectPlants(context,lang);
 return <section className="studio-journey" aria-label={pt?'Análise preliminar do terreno':'Preliminary site review'}>
  <header><span className="eyebrow">CONFLORA / {pt?'DO TERRENO ÀS PLANTAS':'FROM SITE TO PLANTS'}</span>
   <h2>{pt?'Onde a água se acumula? Vamos investigar.':'Where does water collect? Let’s investigate.'}</h2>
   <p>{pt?'Envie uma foto, marque suas observações e informe as condições. O Herbário apresenta espécies documentadas para investigar, não um projeto de drenagem.':'Add a photo, mark what you observe and describe conditions. The herbarium returns documented species to investigate, not a drainage design.'}</p>
  </header>
  <div className="studio-journey-steps">
   <div><strong>01</strong><b>{pt?'Fotografia':'Photo'}</b><small>{project.image?(pt?'Imagem adicionada':'Photo added'):(pt?'Ainda sem foto':'No photo yet')}</small><button type="button" className="text-action" onClick={onPhoto}>{pt?(project.image?'Trocar fotografia':'Enviar fotografia'):(project.image?'Change photo':'Upload photo')} ↗</button></div>
   <div><strong>02</strong><b>{pt?'Área observada':'Observed area'}</b><small>{annotations.length} {pt?'marcações':'marks'}</small><button type="button" className="text-action" onClick={onMark}>{pt?'Marcar água na imagem':'Mark water on image'} ↗</button></div>
   <div><strong>03</strong><b>{pt?'Condições':'Conditions'}</b><small>{result.sufficient?(pt?'Dados iniciais suficientes':'Initial conditions available'):(pt?'Precisamos de região, luz ou umidade':'Region, sun or moisture needed')}</small><button type="button" className="text-action" onClick={()=>setShowConditions(v=>!v)} aria-expanded={showConditions}>{pt?'Informar condições':'Describe conditions'} ↗</button></div>
  </div>
  {annotations.length>0&&<label className="studio-journey-area">{pt?'Qual ponto/área quer investigar?':'Which observation should we investigate?'}
   <select value={area?.id||''} onChange={e=>onChoose(e.target.value)}>{annotations.map((a,i)=><option key={a.id} value={a.id}>{String(i+1).padStart(2,'0')} · {a.notes|| (pt?'Marcação sem descrição':'Unlabeled mark')}</option>)}</select>
  </label>}
  {showConditions&&<div className="studio-journey-conditions">
   <Conditions context={context} lang={lang} onChange={(key,value)=>onCondition(area?.id,key,value)}/>
   <p className="fine">{pt?'As respostas ficam associadas à marcação selecionada. Campos desconhecidos não viram compatibilidade presumida.':'Responses are linked to the selected mark. Unknown values do not become assumed matches.'}</p>
  </div>}
  <div className="studio-journey-actions">
    <button type="button" className="btn" onClick={()=>onPlants(area?.id||'')}>{pt?'Encontrar plantas para esta área':'Find plants for this area'} ↗</button>
    <button type="button" className="btn secondary" onClick={onPlan}>{pt?'Organizar meu plano':'Organize my plan'}</button>
  </div>
  <p className="fine">{result.risk?(pt?'Atenção: água persistente perto de construções requer avaliação profissional.':'Warning: persistent water near buildings requires professional assessment.'):(pt?'Não há identificação automática pela foto, nem cálculo de infiltração ou garantia de redução de alagamentos.':'No automatic photo diagnosis, infiltration calculation or flood reduction guarantee.')}</p>
 </section>;
}
