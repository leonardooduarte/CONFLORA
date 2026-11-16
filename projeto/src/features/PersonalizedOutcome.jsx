import React from 'react';
import {assessSite} from '../core/siteAnalysis.js';
import {plants,references,say} from '../core/knowledge.js';
import {evaluatePlantEvidence} from '../core/evidence.js';
import {hasScenario} from '../core/scenarios.js';

const desc={pt:{assessment:'Avaliação técnica prioritária',incomplete:'Mais informações necessárias',exploratory:'Alternativas para investigar'},en:{assessment:'Professional assessment first',incomplete:'More information needed',exploratory:'Approaches worth exploring'}};
const names={pt:{sun:'Luz',moisture:'Umidade',soil:'Solo',duration:'Duração do acúmulo',building:'Construções próximas'},en:{sun:'Sun',moisture:'Moisture',soil:'Soil',duration:'Pooling duration',building:'Nearby buildings'}};
const known=v=>v&&v!=='unknown';
/** Consolidates documented evidence; never converts plant interest into a planting instruction. */
export default function PersonalizedOutcome({project,lang='pt'}){
 const pt=lang==='pt',annotations=(project.annotations||[]).filter(a=>a.type!=='plants'),areas=annotations.filter(a=>a.type==='pool'||a.type==='space'||a.type==='garden'||a.conditions&&Object.keys(a.conditions).length);
 const entries=areas.map((a,i)=>{
  const context={...project.context,...(a.conditions||{})};
  return {a,number:annotations.indexOf(a)+1,review:assessSite(context,lang,a.type),context};
 });
 const sourceIds=[...new Set((project.plantInterests||[]).map(x=>plants.find(p=>p.id===x.id)).filter(Boolean).flatMap(p=>p.sourceIds))];
 const saved=['A','B'].filter(slot=>hasScenario(project,slot));
 return <section className="personalized-outcome" aria-label={pt?'Resultado preliminar individualizado':'Individualized preliminary result'}>
  <span className="eyebrow">CONFLORA / {pt?'RESULTADO DO MEU TERRENO':'MY SITE REVIEW'}</span>
  <h2>{pt?'O que seu terreno nos permite investigar':'What your observations allow us to explore'}</h2>
  <p>{pt?'Este resumo combina apenas as observações registradas com o catálogo e as fontes verificadas. Não é diagnóstico técnico nem promessa de redução de alagamentos.':'This summary connects your reported observations with documented plant records. It is not a technical diagnosis or a promise of flood reduction.'}</p>
  <div className="personalized-outcome__stats">
   <div><strong>{annotations.length}</strong><span>{pt?'Marcações e observações':'Site annotations'}</span></div>
   <div><strong>{entries.length}</strong><span>{pt?'Áreas com leitura preliminar':'Areas reviewed'}</span></div>
   <div><strong>{saved.length}</strong><span>{pt?'Composições A/B salvas':'Saved A/B proposals'}</span></div>
  </div>
  <h3>{pt?'Por área':'By area'}</h3>
  {entries.length?<div className="personalized-outcome__areas">{entries.map(({a,number,review,context})=><article key={a.id}>
   <div className="personalized-outcome__area-title"><strong>{pt?'Área':'Area'} {String(number).padStart(2,'0')}</strong><span>{desc[lang][review.status]}</span></div>
   <h4>{a.notes||(pt?'Área marcada pelo usuário':'User-marked area')}</h4>
   <p>{pt?'Observações e condições declaradas:':'Reported conditions:'} {Object.entries(names[lang]).filter(([k])=>known(context[k])).map(([k,n])=>`${n}: ${context[k]}`).join(' · ')||(pt?'não especificadas':'not specified')}</p>
   {review.warnings.length>0&&<p className="personalized-outcome__warning">{review.warnings[0]}</p>}
   <p><strong>{pt?'Seleção botânica: ':'Plant evidence: '}</strong>{review.evidence}</p>
   {review.selection.candidates.length>0&&<ul>{review.selection.candidates.slice(0,4).map(({plant:p,reasons})=>{
    const evidence=evaluatePlantEvidence(p,context,lang);
    return <li key={p.id}><i>{p.scientific}</i> — {evidence.label}. {reasons.join(', ')}. <a href={references[p.sourceIds[0]]?.url||p.taxonomyUrl} target="_blank" rel="noreferrer">{pt?'Fonte':'Source'}</a></li>;
   })}</ul>}
   {review.options.length>0&&<p><strong>{pt?'Alternativas: ':'Approaches: '}</strong>{review.options.map(o=>o.title).join(' · ')}</p>}
   <p><strong>{pt?'Próxima verificação: ':'Next check: '}</strong>{review.checks[0]}</p>
  </article>)}</div>:<p>{pt?'Marque as áreas problemáticas no editor e preencha as condições para gerar leituras individuais.':'Mark problem areas in the editor and describe their conditions for individual assessments.'}</p>}
  <h3>{pt?'Espécies que você salvou para pesquisa':'Species you saved for research'}</h3>
  {(project.plantInterests||[]).length?<ul>{project.plantInterests.map((x,i)=>{
   const p=plants.find(p=>p.id===x.id);
   return p?<li key={x.id+'-'+x.areaId+'-'+i}><i>{p.scientific}</i> — {say(p.limits,lang)} <a href={references[p.sourceIds[0]]?.url||p.taxonomyUrl} target="_blank" rel="noreferrer">{pt?'Ler fonte':'Read source'}</a></li>:null;
  })}</ul>:<p>{pt?'Nenhuma espécie foi salva como interesse. A CONFLORA não presume que uma planta foi escolhida para implantação.':'No plant has been saved as an interest. CONFLORA does not assume any planting decision.'}</p>}
  <h3>{pt?'Evidências e próximos passos':'Sources and next steps'}</h3>
  <p>{pt?'Verifique as condições do solo, os caminhos reais da água, possíveis redes enterradas, afastamento das construções e a saída segura do excedente antes de qualquer intervenção.':'Check soil conditions, actual water paths, buried utilities, setbacks and safe overflow before any intervention.'}</p>
  <p className="fine">{pt?'Composições A/B são hipóteses visuais sem escala e não são projetos executivos.':'A/B visuals are not to scale and are not construction-ready designs.'}</p>
  {sourceIds.length>0&&<ul>{sourceIds.filter(id=>references[id]).map(id=><li key={id}><a target="_blank" rel="noreferrer" href={references[id].url}>{references[id].title}</a></li>)}</ul>}
 </section>;
}
