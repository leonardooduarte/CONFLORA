import React,{useMemo,useState} from 'react';
import {v212Results} from '../core/v212Experience.js';
import {asset,say} from '../core/knowledge.js';
import './IntegratedResults.css';

const pick=(pt,a,b)=>pt?a:b;
const pretty=(n)=>String(n).padStart(2,'0');
export default function IntegratedResults({project,lang='pt',onEdit,onArea,onPlants,onCompare,onReport}){
 const pt=lang==='pt',data=useMemo(()=>v212Results(project,lang),[project,lang]);
 const [selected,setSelected]=useState(null);
 if(!data)return null;
 const region=data.regions.find(a=>a.id===selected)||data.regions[0];
 const countTexts=[
  ['pool',pick(pt,'Água acumulada','Pooling water')],
  ['roof',pick(pt,'Saídas de telhado','Roof outlets')],
  ['paved',pick(pt,'Superfícies pavimentadas','Paved surfaces')],
  ['space',pick(pt,'Áreas demarcadas','Marked spaces')]
 ].filter(([key])=>data.counts[key]);
 const formatArea=r=>r.displayNumber===null?pick(pt,'Terreno inteiro','Whole site'):pick(pt,'Área ','Area ')+pretty(r.displayNumber);
 return <section className="v212-result" aria-label={pick(pt,'Leitura integrada do terreno','Integrated site reading')} data-version="21.2">
  <header className="v212-result__header">
   <span className="eyebrow">CONFLORA / {pick(pt,'LEITURA INTEGRADA','INTEGRATED READING')}</span>
   <div className="v212-result__header-row">
    <div><h2>{pick(pt,'O que você registrou sobre o terreno.','Your site observations, brought together.')}</h2>
     <p>{pick(pt,'Observações do terreno, evidências científicas e próximos passos reunidos para orientar sua investigação.','Your observations, documentary evidence and next steps together in one place.')}</p>
    </div>
    <span className="v212-result__edition">{pick(pt,'ESTUDO PRELIMINAR','PRELIMINARY STUDY')}</span>
   </div>
  </header>
  <div className="v212-result__summary">
   {data.image?<figure><img src={data.image} alt={pick(pt,'Fotografia ou imagem do terreno fornecida pelo usuário','Site image supplied by the user')}/><figcaption>{pick(pt,'Imagem fornecida pelo usuário · não interpretada automaticamente','User-supplied image · not automatically interpreted')}</figcaption></figure>:<div className="v212-result__no-photo"><strong>{pick(pt,'Sem fotografia','No photograph')}</strong><p>{pick(pt,'O esquema e suas observações continuam válidos para esta investigação.','You can still work with a diagram and your reported observations.')}</p></div>}
   <div className="v212-result__summary-text">
    <span className="eyebrow">{pick(pt,'SÍNTESE DO ESPAÇO','SITE SUMMARY')}</span>
    <h3>{data.site}</h3>
    {data.area&&<p>{pick(pt,'Área informada: ','Reported area: ')}{data.area} m² · {pick(pt,'valor informado, não medido','reported, not measured')}</p>}
    <div className="v212-result__stats">
     <div><strong>{data.marks}</strong><small>{pick(pt,'observações','observations')}</small></div>
     <div><strong>{data.regionalAreas}</strong><small>{pick(pt,'áreas examinadas','areas reviewed')}</small></div>
     <div><strong>{data.documentedCount}</strong><small>{pick(pt,'correspondências documentais','documentary matches')}</small></div>
    </div>
    {countTexts.length?<ul className="v212-result__observations">{countTexts.map(([key,name])=><li key={key}><b>{data.counts[key]}</b> {name}</li>)}</ul>:<p className="v212-result__empty">{pick(pt,'Nenhuma marcação registrada. Você ainda pode iniciar sua observação no editor.','No marks recorded yet. You can begin observing in the editor.')}</p>}
    <button className="v212-result__inline" type="button" onClick={onEdit}>{pick(pt,'Revisar observações no editor','Review observations in editor')} ↗</button>
   </div>
  </div>
  <div className="v212-result__finding" aria-live="polite">
   <div><span className="eyebrow">{pick(pt,'SITUAÇÃO DA INVESTIGAÇÃO','INVESTIGATION STATUS')}</span>
    <h3>{data.headline}</h3><p>{data.description}</p></div>
   <ul aria-label={pick(pt,'Limitações e verificações','Limits and checks')}>
    {data.statuses.missing&&<li>{pick(pt,'Algumas condições continuam não informadas.','Some conditions remain unreported.')}</li>}
    {data.statuses.localAssessment&&<li>{pick(pt,'Há condições que exigem avaliação local antes de qualquer intervenção.','Some reported conditions require local assessment before intervention.')}</li>}
    <li>{pick(pt,'Nenhuma correspondência documental é aprovação de plantio.','No documentary match is planting approval.')}</li>
   </ul>
  </div>
  <div className="v212-result__area">
   <div className="v212-result__area-heading"><div><span className="eyebrow">{pick(pt,'POR ÁREA','BY OBSERVATION')}</span><h3>{pick(pt,'Consulte as condições de cada área.','Review the conditions for each area.')}</h3></div>
    <p>{pick(pt,'Selecione uma marcação para ver condições herdadas, diferenças locais e fontes vinculadas.','Select an observation for inherited conditions, local differences and relevant sources.')}</p>
   </div>
   <div className="v212-result__tabs" role="group" aria-label={pick(pt,'Selecionar área','Select observation')}>
    {data.regions.map(a=><button key={a.id} type="button" aria-pressed={region.id===a.id} onClick={()=>setSelected(a.id)}>
     {formatArea(a)}{a.conditions.some(c=>c.origin==='area')&&<span aria-label={pick(pt,'Condições específicas','Area-specific conditions')} title={pick(pt,'Condições específicas','Area-specific conditions')}> •</span>}
    </button>)}
   </div>
   <article className="v212-result__area-content" key={region.id}>
    <div className="v212-result__area-context">
     <h4>{formatArea(region)}</h4>
     {region.notes&&<p>{region.notes}</p>}
     <dl>{region.conditions.map(c=><div key={c.key}><dt>{c.label}</dt><dd>{c.display}<span>{c.origin==='area'?pick(pt,'Desta marcação','Specific to this mark'):c.origin==='site'?pick(pt,'Herdada do terreno','Inherited from site'):pick(pt,'Não informada','Not reported')}</span></dd></div>)}</dl>
     <button type="button" className="v212-result__inline" onClick={()=>onArea?.(region.id)}>{pick(pt,'Editar condições e marcação','Edit observation and conditions')} ↗</button>
    </div>
    <div className="v212-result__area-evidence">
     <h4>{pick(pt,'O que a documentação permite investigar','What the documentation helps investigate')}</h4>
     {region.duplicateOf&&<p className="v212-result__shared">{pick(pt,'As evidências desta área são equivalentes às da área ','Evidence for this observation matches area ')}{pretty(region.duplicateOf.displayNumber)}. {pick(pt,'O vínculo e as condições individuais foram preservados.','Individual observations and conditions are preserved.')}</p>}
     {region.investigate.length>0&&<div className="v212-result__plant-list"><span className="eyebrow">{pick(pt,'CORRESPONDÊNCIA DOCUMENTAL','DOCUMENTARY MATCH')}</span>
      {region.investigate.slice(0,2).map(r=><EvidenceMini key={r.id} item={r} pt={pt}/>)}
     </div>}
     {region.research.length>0&&<div className="v212-result__plant-list"><span className="eyebrow">{pick(pt,'SOMENTE PESQUISA','RESEARCH ONLY')}</span>
      {region.research.slice(0,2).map(r=><EvidenceMini key={r.id} item={r} pt={pt}/>)}
     </div>}
     {!region.investigate.length&&!region.research.length&&<p>{pick(pt,'Não há correspondências suficientemente documentadas para esta área.','No sufficiently documented matches are available for this observation.')}</p>}
     {region.needs.length>0&&<details className="v212-result__unknowns"><summary>{pick(pt,'Verificações e lacunas desta área','Checks and unknowns for this observation')} ({region.needs.length})</summary><ul>{region.needs.map((s,i)=><li key={i}>{s}</li>)}</ul></details>}
     <button type="button" className="v212-result__inline" onClick={()=>onPlants?.(region.id==='whole-site'?'':region.id)}>{pick(pt,'Consultar o Herbário e todas as fontes','Explore the Herbarium and all sources')} ↗</button>
    </div>
   </article>
  </div>
  <div className="v212-result__closing">
   <div><span className="eyebrow">{pick(pt,'O QUE VERIFICAR AGORA','WHAT TO CHECK NEXT')}</span>
    <ol>{data.next.map(s=><li key={s.id}><strong>{s.label}</strong><p>{s.how}</p></li>)}</ol>
   </div>
   <div className="v212-result__actions">
    <span className="eyebrow">{pick(pt,'ORGANIZAR O PLANO','ORGANIZE YOUR PLAN')}</span>
    <p>{pick(pt,'Compare representações exploratórias e exporte seu relatório. Os desenhos não representam desempenho hidráulico comprovado.','Compare exploratory concepts and export your report. Drawings do not prove drainage performance.')}</p>
    <div><button className="btn" type="button" onClick={onReport}>{pick(pt,'Abrir relatório preliminar','Open preliminary report')} ↗</button>
     <button className="btn secondary" type="button" onClick={onCompare}>{pick(pt,'Ver comparação visual','View visual comparison')} ↗</button>
    </div>
    <small>{data.scenarios.map(s=>s.slot+': '+(s.count?String(s.count)+' '+pick(pt,'elementos','visual elements'):pick(pt,'não criada','not created'))).join(' · ')}</small>
   </div>
  </div>
  <p className="v212-result__limit">{data.limit}</p>
  <nav className="v212-result__links" aria-label={pick(pt,'Análises detalhadas','Detailed reviews')}>
   <a href="#v212-site-details">{pick(pt,'Análise ambiental detalhada','Detailed environmental review')}</a>
   <a href="#v212-botanical-details">{pick(pt,'Evidências botânicas completas','Full botanical evidence')}</a>
   <a href="#v212-scenario-details">{pick(pt,'Alternativas e estudos visuais','Alternatives and visual studies')}</a>
  </nav>
 </section>;
}
function EvidenceMini({item,pt}){
 const plant=item.plant;
 return <div className="v212-result__plant">
  {plant.image?.file&&<img loading="lazy" src={asset('botanical/'+plant.image.file)} alt={plant.scientific}/>}
  <div><strong><i>{plant.scientific}</i></strong><small>{say(plant.common,pt?'pt':'en')}</small>
   {item.agree?.length>0&&<p>{pick(pt,'Condições documentadas: ','Documented matches: ')}{item.agree.map(a=>a.field==='sun'?pick(pt,'luz','light'):pick(pt,'umidade','moisture')).join(' · ')}</p>}
   {item.literature?.claim&&<p>{item.literature.claim}</p>}
   <details><summary>{pick(pt,'Fontes e limites','Sources and limits')}</summary>
    <ul>{item.citations.map(source=><li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul>
    <p>{item.caution}</p>
   </details>
  </div>
 </div>;
}
