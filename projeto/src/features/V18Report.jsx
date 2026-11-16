import React from 'react';
import {buildV18Proposal} from '../core/v18Proposal.js';
import V18Proposal from './V18Proposal.jsx';

/** Dedicated A4 report composition; intentionally omits empty A/B blocks and
 * repeated filter screens, and respects project-specific source evidence.
 */
export default function V18Report({project,lang='pt',reportImage}){
 const pt=lang==='pt',proposal=buildV18Proposal(project,lang);
 const types={pool:pt?'Pontos de água acumulada':'Pooling points',roof:pt?'Saídas do telhado':'Roof outlets',paved:pt?'Superfície pavimentada':'Paved areas',space:pt?'Áreas livres':'Open areas',garden:pt?'Intervenções exploradas':'Proposed gardens',plants:pt?'Marcações vegetais':'Plant marks'};
 const observed=(project.annotations||[]).filter(a=>a.type!=='plants'&&a.type!=='garden');
 const groups=Object.entries(types).filter(([key])=>observed.some(a=>a.type===key)).map(([key,label])=>({label,n:observed.filter(a=>a.type===key).length}));
 const location=[project.context?.region||'',project.context?.regionCode==='BR'?'Brasil':project.context?.regionCode==='IA'?'Iowa, EUA':''].filter(Boolean).join(' · ');
 const date=new Intl.DateTimeFormat(pt?'pt-BR':'en-US',{year:'numeric',month:'long',day:'numeric'}).format(new Date());
 return <article className="v18-report" aria-label={pt?'Relatório CONFLORA':'CONFLORA report'}>
  <header className="v18-report__head">
    <div className="v18-report__brand"><span className="v18-report__brand-name">CONFLORA</span><span className="v18-report__edition">{pt?'ESTUDO PRELIMINAR':'PRELIMINARY STUDY'}</span></div>
    <span>{date}</span>
  </header>
  <section className="v18-report__cover">
    <span className="eyebrow">{pt?'MEU TERRENO / OBSERVAÇÃO':'MY SITE / OBSERVATION'}</span>
    <h1>{project.name|| (pt?'Meu espaço':'My space')}</h1>
    <p>{location|| (pt?'Localização não informada':'Location not provided')}{project.context?.area?' · '+project.context.area+' m²':''}</p>
    {project.image?<img className="v18-report__hero" src={project.image} alt={pt?'Fotografia fornecida pelo usuário':'User-provided site photo'}/>:<div className="v18-report__missing-photo">{pt?'Projeto sem fotografia original.':'Project without an uploaded photograph.'}</div>}
    <p className="v18-report__caption">{pt?'Fotografia fornecida pelo usuário. As condições ambientais são declaradas, não inferidas da imagem.':'Photo provided by the user. Site conditions are reported, not inferred from the image.'}</p>
  </section>
  <section className="v18-report__summary">
   <h2>{pt?'Seu terreno em resumo':'Your site at a glance'}</h2>
   <div className="v18-report__metrics"><div><strong>{observed.length}</strong><span>{pt?'Observações registradas':'Recorded observations'}</span></div><div><strong>{proposal.regions.length}</strong><span>{pt?'Áreas avaliadas':'Reviewed areas'}</span></div><div><strong>{proposal.cards.filter(x=>x.status==='candidate').length}</strong><span>{pt?'Correspondências documentadas':'Evidence matches'}</span></div></div>
   <div className="v18-report__conditions">
    {[[pt?'Região':'Region',project.context?.regionCode==='BR'?'Brasil':project.context?.regionCode==='IA'?'Iowa':null],[pt?'Solo':'Soil',({slow:pt?'Aparentemente lento':'Apparently slow',medium:pt?'Intermediário':'Moderate',fast:pt?'Aparentemente rápido':'Apparently fast'})[project.context?.soil]],[pt?'Luz':'Sun',({full:pt?'Muito sol':'Full sun',mixed:pt?'Sol e sombra':'Sun and shade',shade:pt?'Sombra':'Shade'})[project.context?.sun]],[pt?'Umidade':'Moisture',({wet:pt?'Molhado':'Wet',moist:pt?'Úmido':'Moist',mesic:pt?'Intermediária':'Mesic',dry:pt?'Seco':'Dry'})[project.context?.moisture]]].filter(x=>x[1]).map(([key,value])=><div key={key}><b>{key}</b><span>{value}</span></div>)}
   </div>
   {groups.length>0&&<p className="v18-report__observations">{groups.map(g=>g.n+' '+g.label.toLowerCase()).join(' · ')}.</p>}
  </section>
  {reportImage&&<section className="v18-report__annotations">
    <h2>{pt?'Áreas registradas':'Observed areas'}</h2>
    <img src={reportImage} alt={pt?'Foto com marcações e numeração das observações':'Annotated photograph with numbered observations'}/>
    {observed.filter(x=>x.notes?.trim()).length>0&&<ol>{observed.filter(x=>x.notes?.trim()).map(x=><li key={x.id}>{x.notes.trim()}</li>)}</ol>}
  </section>}
  <V18Proposal project={project} lang={lang} report/>
  <section className="v18-report__closing">
    <h2>{pt?'Próximas verificações':'Next checks'}</h2>
    <ol>{[
      pt?'Observar quanto tempo a água permanece após a chuva.':'Observe how long water remains after rain.',
      pt?'Conferir distância de construções, redes enterradas e saída segura do excedente.':'Check building setbacks, underground utilities and safe overflow.',
      pt?'Verificar infiltração real do solo antes de considerar jardins de chuva.':'Test actual soil infiltration before considering rain gardens.',
      pt?'Conferir identificação e disponibilidade regional de espécies com orientação profissional.':'Confirm plant identification and regional availability with professional guidance.'
    ].map(x=><li key={x}>{x}</li>)}</ol>
    <p>{proposal.caveats}</p>
  </section>
  <footer className="v18-report__footer">{pt?'CONFLORA · Relatório de exploração ambiental, não projeto executivo':'CONFLORA · Environmental exploration, not an engineering design'}</footer>
 </article>;
}
