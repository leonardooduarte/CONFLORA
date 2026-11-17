import React from 'react';
import {reviewBotanicalV21} from '../core/v21Botanical.js';
import {asset,say} from '../core/knowledge.js';
import './V21Botanical.css';

const pick=(lang,pt,en)=>lang==='pt'?pt:en;
const origin=(x,lang)=>x.origin==='area'?pick(lang,'da área','area-specific'):x.origin==='site'?pick(lang,'do terreno','inherited from site'):pick(lang,'não informado','not reported');

export default function V21Botanical({project,lang='pt',compact=false}){
 const result=reviewBotanicalV21(project,lang);
 if(!result)return null;
 return <section className={'v21-botanical'+(compact?' v21-botanical--compact':'')} aria-label={pick(lang,'Investigação botânica V21','V21 botanical investigation')} data-version="21">
  <header className="v21-botanical__intro">
   <span className="eyebrow">CONFLORA / V21 · {pick(lang,'INTELIGÊNCIA BOTÂNICA','BOTANICAL EVIDENCE')}</span>
   <h2>{pick(lang,'O que a ciência permite investigar aqui?','What can the evidence help us investigate?')}</h2>
   <p>{result.explanation}</p>
   <div className="v21-botanical__figures">
    <div><strong>{result.regions.length}</strong><span>{pick(lang,'áreas analisadas','areas reviewed')}</span></div>
    <div><strong>{result.matchCount}</strong><span>{pick(lang,'espécies com correspondência documental','species with documentary matches')}</span></div>
    <div><strong>{result.researchCount}</strong><span>{pick(lang,'registros para pesquisa','research records')}</span></div>
   </div>
  </header>
  <div className="v21-botanical__regions">
   {result.regions.map((area,i)=><details key={area.id} className="v21-botanical__area" open={!compact&&i===0}>
    <summary><span className="v21-botanical__number">{area.number===null?'00':String(area.number).padStart(2,'0')}</span>
     <span><strong>{area.number===null?pick(lang,'Terreno inteiro','Whole site'):pick(lang,'Área observada','Observed area')+' '+String(area.number).padStart(2,'0')}</strong><small>{area.message}</small></span>
     <span className="v21-botanical__count">{area.matchCount} {pick(lang,'correspondências','matches')}</span>
    </summary>
    <div className="v21-botanical__body">
     {area.notes&&<p className="v21-botanical__notes">{area.notes}</p>}
     <h3>{pick(lang,'Condições consideradas','Conditions used')}</h3>
     <dl className="v21-botanical__conditions">
      {area.conditions.map(c=><div key={c.key}><dt>{c.label}</dt><dd>{c.display} <span>· {origin(c,lang)}</span></dd></div>)}
     </dl>
     {area.constraints&&<p role="note" className="v21-botanical__warning">{pick(lang,'Há condições que exigem avaliação local (drenagem aparente, duração da água ou proximidade de construções). Não inferimos segurança de implantação.','Site conditions require local assessment (reported drainage, pooling duration, or nearby buildings). No installation safety is inferred.')}</p>}
     {area.investigate.length>0&&<div className="v21-botanical__results">
      <h3>{pick(lang,'Correspondências para investigar','Documentary matches to investigate')}</h3>
      <div className="v21-botanical__cards">
       {area.investigate.slice(0,compact?2:5).map(item=><PlantEvidenceCard key={item.id} item={item} lang={lang}/>)}
      </div>
     </div>}
     {area.research.length>0&&<div className="v21-botanical__research">
      <h3>{pick(lang,'Literatura para pesquisa — não indicação de plantio','Literature for research — not planting advice')}</h3>
      <div className="v21-botanical__cards">
       {area.research.slice(0,compact?2:4).map(item=><PlantEvidenceCard key={item.id} item={item} lang={lang} research/>)}
      </div>
     </div>}
     {area.outOfRange.length>0&&<details className="v21-botanical__excluded">
      <summary>{area.outOfRange.length} {pick(lang,'espécies fora das faixas documentadas nos guias','species outside documented guide ranges')}</summary>
      <p>{pick(lang,'Fora da faixa publicada não prova intolerância biológica. As espécies não entram nas correspondências preliminares.','Outside the published guide range is not proof of biological intolerance. These species are not included as preliminary matches.')}</p>
      <ul>{area.outOfRange.map(p=><li key={p.id}><i>{p.name}</i> · {p.fields.join(' / ')}</li>)}</ul>
     </details>}
     {area.needs.length>0&&<div className="v21-botanical__next"><h3>{pick(lang,'O que verificar antes de avançar','What to verify next')}</h3><ul>{area.needs.map((n,k)=><li key={k}>{n}</li>)}</ul></div>}
     {!area.investigate.length&&!area.research.length&&<p>{pick(lang,'Não há espécies suficientemente documentadas para este contexto. Não vamos inventar uma indicação.','No species is sufficiently documented for this context. No planting suggestion is invented.')}</p>}
    </div>
   </details>)}
  </div>
  <p className="v21-botanical__footer">{pick(lang,'A literatura orienta perguntas; somente avaliação local apropriada permite decidir sobre uma intervenção. A fotografia e as marcações não medem infiltração.','Literature guides questions; appropriate local assessment is necessary before an intervention. Photos and markers do not measure infiltration.')}</p>
 </section>;
}

function PlantEvidenceCard({item,lang,research=false}){
 const p=item.plant;
 return <article className="v21-botanical__card" data-evidence={research?'research':'documentary'}>
  <div className="v21-botanical__card-image">
   {p.image?<><img loading="lazy" src={asset('botanical/'+p.image.file)} alt={p.scientific}/><small>{pick(lang,'Foto','Photo')}: <a href={p.image.source} target="_blank" rel="noreferrer">{p.image.author}</a> · {p.image.license}</small></>:<p>{pick(lang,'Fotografia verificada indisponível','Verified photograph unavailable')}</p>}
  </div>
  <div className="v21-botanical__card-copy">
   <span className="eyebrow">{research?pick(lang,'SOMENTE PESQUISA','RESEARCH ONLY'):item.level==='documented-context'?pick(lang,'LUZ E UMIDADE DOCUMENTADAS','DOCUMENTED SUN & MOISTURE'):pick(lang,'CORRESPONDÊNCIA PARCIAL','PARTIAL MATCH')}</span>
   <h4><i>{p.scientific}</i></h4><p>{say(p.common,lang)} · {p.family}</p>
   {item.agree.length>0&&<p><strong>{pick(lang,'Por que apareceu:','Why shown:')}</strong> {item.agree.map(c=>c.field==='sun'?pick(lang,'luz documentada','documented sun'):pick(lang,'umidade documentada','documented moisture')).join(' · ')}.</p>}
   {item.literature&&<p><strong>{pick(lang,'Evidência adicional:','Additional evidence:')}</strong> {item.literature.claim}</p>}
   {item.unknown.length>0&&<p>{pick(lang,'Lacunas:','Unknowns:')} {item.unknown.join(' ')}</p>}
   <p className="v21-botanical__caution">{item.caution}</p>
   <details><summary>{pick(lang,'Fontes e limitações','Sources and limits')}</summary>
    <ul>{item.citations.map(s=><li key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul>
    <p>{say(p.limits,lang)}</p>
   </details>
  </div>
 </article>;
}
