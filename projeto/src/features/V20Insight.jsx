import React from 'react';
import {buildV20Insight} from '../core/v20Insight.js';
import './V20Insight.css';

const pick=(pt,a,b)=>pt?a:b;
const conditionNames={soil:['Solo','Soil'],sun:['Luz','Sun'],moisture:['Umidade','Moisture'],duration:['Duração da água','Water duration'],building:['Construções','Buildings']};
const conditionValues={unknown:['Não informado','Unknown'],slow:['Parece drenar devagar','Seems slow-draining'],medium:['Intermediária','Moderate'],fast:['Parece drenar rápido','Seems fast-draining'],full:['Muito sol','Full sun'],mixed:['Sol e sombra','Sun and shade'],shade:['Sombra','Shade'],wet:['Molhado','Wet'],moist:['Úmido','Moist'],mesic:['Intermediária','Mesic'],dry:['Seco','Dry'],hours:['Algumas horas','A few hours'],day:['Até um dia','Up to one day'],persistent:['Mais de um dia ou recorrente','Over one day or recurring'],near:['Próximo de construções','Near buildings'],away:['Afastado de construções','Away from buildings']};
const label=(data,pt)=>data?.[pt?0:1]||data?.[0]||'—';

export function V20Comparison({project,lang='pt',report=false}){
 const d=buildV20Insight(project,lang),pt=lang==='pt';
 if(!d?.scenarios.some(x=>x.count))return null;
 return <section className={'v20-comparison'+(report?' v20-comparison--print':'')} aria-label={pick(pt,'Alternativas registradas','Recorded alternatives')}>
  <h3>{pick(pt,'O que muda entre A e B?','What differs between A and B?')}</h3>
  <p>{pick(pt,'Este resumo compara elementos efetivamente salvos, não eficiência de drenagem.','This compares saved visual elements, not drainage performance.')}</p>
  <div className="v20-comparison__grid">
   {d.scenarios.map(s=><article key={s.slot}>
    <strong>{pick(pt,'Alternativa ','Alternative ')}{s.slot}</strong>
    <span>{s.count?String(s.count)+' '+pick(pt,'elementos visuais','visual elements'):pick(pt,'Ainda não criada','Not created')}</span>
    {s.count>0&&<span>{s.mode==='exploratory'?pick(pt,'Estudo espacial exploratório','Exploratory spatial study'):pick(pt,'Composição botânica documental','Documented botanical composition')}</span>}
    {s.notes.length>0?<ul>{s.notes.map((n,i)=><li key={i}>{n}</li>)}</ul>:s.count>0&&<small>{pick(pt,'Elementos sem descrição adicional.','Elements without additional notes.')}</small>}
   </article>)}
  </div>
  <p className="v20-comparison__caution">{pick(pt,'Quantidade, posição e aparência não indicam superioridade hidráulica.','Number, placement and appearance do not imply hydraulic superiority.')}</p>
 </section>;
}

export default function V20Insight({project,lang='pt',onEdit,onPlan,onReport,compact=false,report=false}){
 const d=buildV20Insight(project,lang),pt=lang==='pt';
 if(!d)return null;
 return <section className={'v20-insight'+(report?' v20-insight--report':'')+(compact?' v20-insight--compact':'')} data-version="20" aria-label={pick(pt,'Meu terreno: o que sabemos e o que investigar','My site: what we know and what to investigate')}>
  <header className="v20-insight__header">
   <span className="eyebrow">CONFLORA / {pick(pt,'SÍNTESE DO TERRENO','SITE INSIGHT')}</span>
   <h2>{pick(pt,'O que já sabemos sobre seu espaço','What we know about your space')}</h2>
   <p>{pick(pt,'Uma leitura das informações que você registrou — sem medir o terreno ou interpretar automaticamente a fotografia.','A summary of your own observations — without measuring the site or interpreting the photo automatically.')}</p>
  </header>
  <div className="v20-insight__main">
   <div className="v20-insight__observed">
    <h3>{pick(pt,'Suas observações','Your observations')}</h3>
    {d.observed.length?<ul>{d.observed.map((x,i)=><li key={i}>{x}</li>)}</ul>:<p>{pick(pt,'Nenhuma marcação registrada. Você pode começar pelo editor.','No marks yet. You can begin in the editor.')}</p>}
    {d.details.length>0&&<ul className="v20-insight__details">{d.details.map((x,i)=><li key={i}>{x}</li>)}</ul>}
    {d.markNotes.length>0&&<details open={report}><summary>{pick(pt,'Notas do usuário','User notes')}</summary><ul>{d.markNotes.map((n,i)=><li key={i}>{n}</li>)}</ul></details>}
   </div>
   <div className="v20-insight__meaning">
    <h3>{pick(pt,'O que isso permite investigar','What this helps investigate')}</h3>
    <ul>{d.interpretations.map((x,i)=><li key={i}>{x}</li>)}</ul>
   </div>
  </div>
  <div className="v20-insight__evidence" data-status={d.evidence}>
   <strong>{pick(pt,'Estado da evidência botânica','Botanical evidence status')}</strong>
   <p>{d.evidenceLabel}</p>
   <small>{pick(pt,'Pesquisa não equivale a recomendação de plantio. As fotografias não medem infiltração.','Research is not a planting recommendation. Photographs do not measure infiltration.')}</small>
  </div>
  <div className="v20-insight__next">
   <div className="v20-insight__next-head"><h3>{pick(pt,'O que verificar agora','What to check next')}</h3><span>{d.steps.length} {pick(pt,'verificações','checks')}</span></div>
   <div className="v20-insight__tasks">
    {d.steps.map((task,i)=><article key={task.id}>
     <div className="v20-insight__task-head"><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span><strong>{task.label}</strong>{task.priority==='essential'&&<small>{pick(pt,'Prioritária','Priority')}</small>}</div>
     <p><b>{pick(pt,'Por quê?','Why?')}</b> {task.why}</p>
     <p><b>{pick(pt,'Como registrar?','How to record?')}</b> {task.how}</p>
     {!compact&&<p className="v20-insight__after">{task.follow}</p>}
    </article>)}
   </div>
  </div>
  {!compact&&d.regions.length>0&&<details className="v20-insight__regions" open={report}>
   <summary>{pick(pt,'De onde vêm as condições de cada área?','Where do area conditions come from?')}</summary>
   <p>{pick(pt,'Uma condição específica substitui a geral somente naquela área; valores ausentes permanecem desconhecidos.','Area-specific values override site values only in that area; unknown values stay unknown.')}</p>
   {d.regions.map((region,i)=><div key={region.id} className="v20-insight__region">
    <h4>{region.number===null?pick(pt,'Terreno inteiro','Whole site'):pick(pt,'Área ','Area ')+String(region.number||i+1).padStart(2,'0')}</h4>
    <dl>{region.origin.map(c=><div key={c.key}>
     <dt>{label(conditionNames[c.key],pt)}</dt><dd>{label(conditionValues[c.value],pt)} · <em>{pick(pt,c.origin==='area'?'Específica desta área':c.origin==='site'?'Do terreno':'Não informada',c.origin==='area'?'Area-specific':c.origin==='site'?'Inherited from site':'Not reported')}</em></dd>
    </div>)}</dl>
   </div>)}
  </details>}
  {!report&&<div className="v20-insight__actions">
   {onEdit&&<button type="button" className="btn secondary" onClick={onEdit}>{pick(pt,'Revisar minhas observações','Review my observations')} ↗</button>}
   {onPlan&&<button type="button" className="btn" onClick={onPlan}>{pick(pt,'Organizar meu plano','Organize my plan')} ↗</button>}
   {onReport&&<button type="button" className="btn secondary" onClick={onReport}>{pick(pt,'Abrir relatório','Open report')} ↗</button>}
  </div>}
  {report&&<p className="v20-insight__report-note">{pick(pt,'Síntese baseada em dados declarados pelo usuário, não em medições ou validação de campo.','Summary based on user-reported information, not measurement or field verification.')}</p>}
 </section>;
}
