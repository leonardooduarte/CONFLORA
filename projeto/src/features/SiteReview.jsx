import React from 'react';
import {assessSite} from '../core/siteAnalysis.js';
import {references} from '../core/knowledge.js';

/** Accessible scientific summary for an individual user-observed site area. */
export default function SiteReview({context,lang='pt',markType='',onPlants,compact=false}){
 const pt=lang==='pt',review=assessSite(context,lang,markType);
 return <section className={'site-review'+(compact?' site-review--compact':'')} aria-label={pt?'Leitura preliminar da área':'Preliminary area review'}>
  <div className="site-review__head"><span className="eyebrow">CONFLORA / {pt?'LEITURA DA ÁREA':'AREA REVIEW'}</span><h3>{pt?'O que sabemos sobre esta área':'What we know about this area'}</h3></div>
  {review.observations.length?<ul>{review.observations.map(x=><li key={x}>{x}</li>)}</ul>:<p>{pt?'As informações ainda são limitadas. Observe o terreno e descreva os sinais após chuvas.':'Information is still limited. Observe the site and describe conditions after rain.'}</p>}
  {review.warnings.map(x=><p className="notice-box" role="alert" key={x}>{x}</p>)}
  <p className="site-review__evidence"><strong>{pt?'Seleção botânica: ':'Plant matching: '}</strong>{review.evidence}</p>
  <h4>{pt?'Possibilidades a investigar':'Possible approaches to investigate'}</h4>
  {review.options.length?<ul className="site-review__options">{review.options.map(o=><li key={o.id}><strong>{o.title}</strong><p>{o.detail}</p></li>)}</ul>:<p>{review.needsAssessment?(pt?'Antes de escolher espécies ou intervenções, investigue a situação com profissional habilitado.':'Before choosing plants or interventions, consult a qualified professional.'):(pt?'Preencha ao menos região e luz ou umidade para investigar possibilidades documentadas.':'Enter the region and sun or moisture conditions to explore documented possibilities.')}</p>}
  <h4>{pt?'O que ainda verificar':'What remains to be checked'}</h4>
  <ul>{review.checks.map(x=><li key={x}>{x}</li>)}</ul>
  <p className="fine">{pt?'As condições são relatos do usuário; a fotografia não mede infiltração, vazão ou redução de alagamento.':'Conditions are user reports; photographs do not measure infiltration, flow or flood reduction.'} <a href={references['epa-bioretention'].url} target="_blank" rel="noreferrer">{pt?'Referência técnica EPA':'EPA technical reference'}</a></p>
  {onPlants&&<button type="button" className="btn secondary" onClick={onPlants}>{pt?'Consultar espécies e fontes no Herbário':'Read species and sources in the Herbarium'} ↗</button>}
 </section>;
}
