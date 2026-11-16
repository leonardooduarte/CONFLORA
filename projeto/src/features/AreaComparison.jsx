import React from 'react';
import {assessSite} from '../core/siteAnalysis.js';

export default function AreaComparison({project,lang='pt'}){
 const pt=lang==='pt';
 const items=project.annotations.map((a,index)=>({
  ...a,originalIndex:index,review:assessSite({...project.context,...(a.conditions||{})},lang,a.type)
 })).filter(a=>a.conditions&&Object.values(a.conditions).some(v=>v&&v!=='unknown')&&a.type!=='plants');
 if(items.length<2)return null;
 const status={assessment:pt?'Verificação profissional prioritária':'Professional assessment first',incomplete:pt?'Dados ainda insuficientes':'Insufficient information',exploratory:pt?'Possibilidades documentais para investigar':'Documented possibilities to explore'};
 return <section className="area-comparison" aria-label={pt?'Comparação de áreas':'Area comparison'}>
  <span className="eyebrow">CONFLORA / {pt?'OLHAR COMPARATIVO':'COMPARATIVE VIEW'}</span>
  <h3>{pt?'Áreas diferentes, cuidados diferentes.':'Different areas, different precautions.'}</h3>
  <div className="area-comparison__grid">{items.map((a,i)=><article key={a.id}>
   <span className="eyebrow">{pt?'ÁREA':'AREA'} {String(a.originalIndex+1).padStart(2,'0')}</span>
   <h4>{a.notes||(pt?'Marcação sem descrição':'Unlabeled observation')}</h4>
   <p><strong>{status[a.review.status]}</strong></p>
   <p>{pt?'Correspondências botânicas documentadas: ':'Documented botanical matches: '}{a.review.candidateCount}</p>
   <p className="fine">{a.review.warnings[0]||a.review.checks[0]}</p>
  </article>)}</div>
  <p className="fine">{pt?'Comparação qualitativa baseada nas observações, não medição de desempenho de drenagem.':'Qualitative comparison based on user observations, not measured drainage performance.'}</p>
 </section>;
}
