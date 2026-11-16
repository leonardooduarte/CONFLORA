import React from 'react';
import {evaluateAllEvidence} from '../core/evidence.js';
import {say} from '../core/knowledge.js';
const order=['documented','investigate','insufficient','contradiction','research'];
const title={pt:{documented:'Correspondências documentadas',investigate:'Possibilidades a investigar',insufficient:'Dados insuficientes',contradiction:'Contradições documentadas',research:'Fichas para pesquisa (não são sugestões de plantio)'},en:{documented:'Documented matches',investigate:'Possibilities to investigate',insufficient:'Insufficient data',contradiction:'Documented contradictions',research:'Research records (not planting suggestions)'}};
export default function EvidenceInspector({context,lang='pt',onRead}){
 const pt=lang==='pt',hasContext=['BR','IA'].includes(context?.regionCode),rows=hasContext?evaluateAllEvidence(context,lang):[];
 return <details className="evidence-inspector">
  <summary>{pt?'Entenda as evidências e por que outras espécies não foram indicadas':'Inspect supporting evidence and why other species were not selected'}</summary>
  <p>{pt?'As categorias organizam o que está documentado. Não classificam eficiência de absorção de água nem garantem plantio.':'Categories organize documented information. They do not rank water absorption or guarantee planting suitability.'}</p>
  {!hasContext&&<p>{pt?'Para examinar correspondências, escolha Brasil ou Iowa no campo Contexto regional das condições do terreno.':'To inspect plant matches, choose Brazil or Iowa in the site conditions regional context.'}</p>}
  {hasContext&&order.map(status=>{
   const group=rows.filter(x=>x.status===status);
   return group.length>0&&<section className="evidence-inspector__group" key={status}>
     <h4>{title[lang][status]} <span>({group.length})</span></h4>
     <div className="evidence-inspector__grid">{group.map(({plant:p,matches,contradictions,unknown,citations})=><article key={p.id}>
      <h5><i>{p.scientific}</i></h5>
      <p>{say(p.common,lang)}</p>
      {matches.map(x=><p key={'m'+x.field}>✓ {x.text}{x.source&&<>{' · '}<a href={x.source.url} target="_blank" rel="noreferrer">{pt?'Fonte específica':'Field source'}</a></>}</p>)}
      {contradictions.map(x=><p key={'c'+x.field}>! {pt?'A condição informada contradiz a faixa documentada para ':'The observed condition conflicts with documented '}{x.field==='sun'?(pt?'luz.':'sun.'):(pt?'umidade.':'moisture.')}{x.source&&<>{' '}<a href={x.source.url} target="_blank" rel="noreferrer">{pt?'Ver fonte':'View source'}</a></>}</p>)}
      {unknown.slice(0,2).map((x,i)=><p className="fine" key={i}>{x}</p>)}
      {!matches.length&&!contradictions.length&&citations[0]&&<a href={citations[0].url} target="_blank" rel="noreferrer">{pt?'Consultar estudo':'Read study'}</a>}
      {onRead&&<button type="button" className="text-action" onClick={()=>onRead(p.id)}>{pt?'Abrir ficha':'Open record'} ↗</button>}
     </article>)}</div>
    </section>;
  })}
 </details>;
}
