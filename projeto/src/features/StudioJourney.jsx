import React,{useState} from 'react';
import {Conditions,conditionNames} from './TerrainSelection.jsx';
import {selectPlants} from '../core/selection.js';
import {v212Journey} from '../core/v212Experience.js';
import SiteReview from './SiteReview.jsx';

/**
 * V21.2 uses the original five existing actions on one project state.
 * A "ready" status only means the next investigation can be opened;
 * it NEVER indicates a site has been approved for planting or construction.
 */
export default function StudioJourney({project,lang,selected,onChoose,onPhoto,onMark,onCondition,onPlants,onPlan}){
 const pt=lang==='pt';
 const [showConditions,setShowConditions]=useState(false);
 const [scope,setScope]=useState('area');
 const observations=project.annotations.filter(a=>a.type!=='plants'||!a.speciesId);
 const area=observations.find(a=>a.id===selected)||observations[0];
 const editingArea=Boolean(area)&&scope==='area';
 const context=editingArea?{...project.context,...(area.conditions||{})}:project.context;
 const result=selectPlants(context,lang),journey=v212Journey(project,lang);
 const status=(i)=>journey.statuses[i]==='done'?(pt?'Registrado':'Recorded'):journey.statuses[i]==='partial'?(pt?'Parcial':'Partial'):
  journey.statuses[i]==='optional'?(pt?'Opcional':'Optional'):journey.statuses[i]==='ready'?(pt?'Disponível':'Available'):(pt?'A completar':'To complete');
 const progress=journey.statuses.filter(s=>s==='done').length;
 const next=journey.next==='observations'?onMark:journey.next==='conditions'?()=>{setShowConditions(true);setScope(area?'area':'site')}:onPlan;
 return <section className="studio-journey v212-journey" aria-label={pt?'Jornada de investigação preliminar':'Preliminary site investigation'}>
  <header><span className="eyebrow">CONFLORA / {pt?'DO TERRENO ÀS PLANTAS':'FROM SITE TO PLANTS'}</span>
   <h2>{pt?'Onde a água se acumula? Vamos investigar.':'Where does water collect? Let’s investigate.'}</h2>
   <p>{pt?'Cinco etapas, um único projeto. Descreva o que observou e consulte o que as fontes permitem investigar.':'Five stages, one project. Report your observations, then review what the sources support.'}</p>
  </header>
  <div className="v212-journey__progress" role="group" aria-label={pt?'Progresso das observações':'Observation progress'}>
   <span>{progress} / 3 {pt?'registros essenciais preenchidos':'core records completed'}</span>
   <div className="v212-journey__track" aria-hidden="true"><span style={{width:(progress/3*100)+'%'}}/></div>
   <small>{pt?'Investigação e planejamento não são etapas de aprovação técnica.':'Investigation and planning do not indicate technical approval.'}</small>
  </div>
  <div className="studio-journey-steps">
   <div data-stage="photo" data-status={journey.statuses[0]}><strong>01</strong><b>{pt?'Conhecer meu espaço':'Record my space'}</b><small>{project.image?(pt?'Imagem adicionada':'Photo added'):(pt?'Foto opcional — continue com o esquema':'Photo optional — use the diagram')}</small><button type="button" className="text-action" onClick={onPhoto}>{pt?(project.image?'Trocar fotografia':'Enviar fotografia'):(project.image?'Change photo':'Upload photo')} ↗</button><em>{status(0)}</em></div>
   <div data-stage="observations" data-status={journey.statuses[1]}><strong>02</strong><b>{pt?'Observar a água':'Observe the water'}</b><small>{journey.observations} {pt?(journey.observations===1?'marcação registrada':'marcações registradas'):(journey.observations===1?'observation recorded':'observations recorded')}</small><button type="button" className="text-action" onClick={onMark}>{pt?'Marcar água na imagem':'Mark water on image'} ↗</button><em>{status(1)}</em></div>
   <div data-stage="conditions" data-status={journey.statuses[2]}><strong>03</strong><b>{pt?'Descrever condições':'Describe conditions'}</b><small>{journey.hasContext?(pt?'Contexto inicial informado':'Initial context recorded'):(pt?'Região, luz e umidade ajudam na consulta':'Region, light and moisture are needed')}</small><button type="button" className="text-action" onClick={()=>setShowConditions(v=>!v)} aria-expanded={showConditions}>{pt?'Informar condições':'Describe conditions'} ↗</button><em>{status(2)}</em></div>
   <div data-stage="investigation" data-status={journey.statuses[3]}><strong>04</strong><b>{pt?'Investigar espécies':'Explore species'}</b><small>{pt?'Comparar informações com as fontes do Herbário':'Compare observations with Herbarium sources'}</small><button type="button" className="text-action" onClick={()=>onPlants(area?.id||'')}>{pt?'Consultar espécies e fontes':'Review plants and sources'} ↗</button><em>{status(3)}</em></div>
   <article className="studio-journey-final" data-stage="results" data-status={journey.statuses[4]}><strong>05</strong><b>{pt?'Organizar meu plano':'Organize my plan'}</b><small>{pt?'Reunir resultados, limites e próximos passos':'Bring findings, limits and next steps together'}</small><button type="button" className="text-action" onClick={onPlan}>{pt?'Consultar síntese do terreno':'Review site summary'} ↗</button><em>{status(4)}</em></article>
  </div>
  {observations.length>0&&<label className="studio-journey-area">{pt?'Qual ponto/área quer investigar?':'Which observation should we investigate?'}
   <select value={area?.id||''} onChange={e=>onChoose(e.target.value)}>{observations.map((a,i)=><option key={a.id} value={a.id}>{String(i+1).padStart(2,'0')} · {a.notes||(pt?'Marcação sem descrição':'Unlabeled mark')}</option>)}</select>
  </label>}
  {showConditions&&<div className="studio-journey-conditions">
   {area&&<div className="v212-journey__scope" role="group" aria-label={pt?'Aplicar condições a':'Apply conditions to'}>
    <button type="button" aria-pressed={editingArea} onClick={()=>setScope('area')}>{pt?'Esta marcação':'This observation'}</button>
    <button type="button" aria-pressed={!editingArea} onClick={()=>setScope('site')}>{pt?'Terreno inteiro':'Whole site'}</button>
   </div>}
   <p className="studio-journey-conditions__origin"><strong>{editingArea?(pt?'Condições da marcação selecionada':'Conditions for the selected mark'):(pt?'Condições do terreno inteiro':'Whole-site conditions')}</strong> · {editingArea?(pt?'Os campos sem informação específica usam as condições gerais do terreno.':'Fields without area-specific information use the whole-site conditions.'):(pt?'Valores gerais são usados nas áreas sem informação local.':'Whole-site values apply to areas without specific information.')}</p>
   {editingArea&&Object.keys(area.conditions||{}).length>0&&<small>{pt?'Campos alterados somente nesta área: ':'Area-specific fields: '}{Object.keys(area.conditions).map(k=>conditionNames[lang][k]||k).join(', ')}</small>}
   <Conditions context={context} lang={lang} onChange={(key,value)=>onCondition(editingArea?area?.id:null,key,value)}/>
   <p className="fine">{pt?'As respostas valem para a marcação ou o terreno selecionado. Deixe “Não sei” quando não houver informação.':'Answers apply to the selected observation or whole site. Choose “Not sure” when the information is unavailable.'}</p>
  </div>}
  {(area&&(result.sufficient||['hours','day','persistent'].includes(context.duration)||context.building==='near'))&&<SiteReview context={context} lang={lang} markType={area.type} onPlants={()=>onPlants(area.id)} compact/>}
  <div className="v212-journey__next" role="status">
   <div><strong>{pt?'Próxima ação sugerida':'Suggested next action'}</strong><p>{journey.summary}</p></div>
   <button type="button" className="btn" onClick={next}>{journey.next==='observations'? (pt?'Marcar observações':'Mark observations'):journey.next==='conditions'?(pt?'Revisar condições':'Review conditions'):(pt?'Ver resultados integrados':'View integrated results')} ↗</button>
  </div>
  <p className="fine">{result.risk?(pt?'Água persistente perto de construções requer avaliação profissional; não escave com base neste estudo.':'Persistent water near buildings requires professional assessment; do not dig based on this study.'):journey.info}</p>
 </section>;
}
