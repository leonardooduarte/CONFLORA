import React from 'react';
import {buildV18Proposal} from '../core/v18Proposal.js';
import {plants,asset,references,say} from '../core/knowledge.js';
import {ProposalVisual} from './V18Visual.jsx';

/** One source of truth for the site proposal and the compact PDF botanical
 * frame. Research-only species are clearly not planting recommendations.
 */
export default function V18Proposal({project,lang='pt',onGenerate,onEdit,report=false,proposalData,VisualComponent=ProposalVisual,change,extraActions,referenceNumbers={}}){
 const pt=lang==='pt',proposal=proposalData||buildV18Proposal(project,lang);
 const available=['A','B'].filter(slot=>Array.isArray(project.scenarios?.[slot]?.markers)&&project.scenarios[slot].markers.length);
 const documented=proposal.cards.filter(x=>x.status==='candidate');
 const research=proposal.cards.filter(x=>x.status==='research');
 // The printed report groups truly identical observations instead of wasting
 // pages repeating the same text for separate pooling markers.
 const displayAreas=proposal.groups|| (report?Object.values(proposal.regions.reduce((acc,area)=>{
   const signature=JSON.stringify({
    conditions:['regionCode','sun','moisture','soil','duration','building'].map(k=>area.context[k]||'unknown'),
    warnings:area.review.warnings,
    status:area.review.status,
    candidates:area.candidates.map(x=>x.plant.id),
    note:area.mark.notes||''
   });
   if(!acc[signature])acc[signature]={...area,areaNumbers:[]};
   acc[signature].areaNumbers.push(area.number);
   return acc;
 },{})):proposal.regions.map(area=>({...area,areaNumbers:[area.number]})));
 return <section className={'v18-proposal'+(report?' v18-proposal--report':'')} aria-label={pt?'Minha proposta CONFLORA':'My CONFLORA proposal'}>
  <header className="v18-proposal__header">
   <span className="eyebrow">CONFLORA / {pt?'PROPOSTA PRELIMINAR':'PRELIMINARY PROPOSAL'}</span>
   <h2>{pt?'Minha proposta CONFLORA':'My CONFLORA proposal'}</h2>
   <p>{pt?'As opções abaixo se baseiam exclusivamente nas suas observações e nas evidências registradas. Uma espécie estudada em vasos não se torna, por isso, uma recomendação de plantio.':'The options below are based only on your observations and the documented evidence. Being studied in a pot does not make a species an installation recommendation.'}</p>
   <div className="v18-summary"><div><strong>{proposal.regions.length}</strong><span>{pt?'Áreas analisadas':'Areas reviewed'}</span></div><div><strong>{documented.length}</strong><span>{pt?'Espécies com correspondência':'Documented matches'}</span></div><div><strong>{available.length}</strong><span>{pt?'Composições salvas':'Saved compositions'}</span></div></div>
  </header>
  <div className="v18-area-list">
   <h3>{pt?'O que cada área permite investigar':'What each area allows us to explore'}</h3>
   {displayAreas.map(area=><article key={area.id} className="v18-area">
    <div className="v18-area__head"><strong>{area.areaNumbers[0]===null?(pt?'Visão geral':'Overall site'):(area.areaNumbers.length>1?(pt?'Áreas ':'Areas '):(pt?'Área ':'Area '))+area.areaNumbers.map(n=>String(n).padStart(2,'0')).join(', ')}</strong><span className={'v18-status '+(area.reviewPriority?'v18-status--risk':'')}>{area.category&&area.category+' · '}{area.reviewPriority?(pt?'Verificação técnica prioritária':'Professional review priority'):area.candidates.length?(pt?'Correspondência documentada':'Documented matching'):(pt?'Pesquisa e verificações':'Research and checks')}</span></div>
    <p>{area.mark.notes|| (pt?'Área identificada nas marcações do usuário.':'Area marked by the user.')}</p>
    {area.review.warnings.length>0&&<p className="v18-warning">{area.review.warnings[0]}</p>}
    {area.candidates.length>0?<p>{pt?'Espécies com correspondência documental: ':'Species with documented matches: '}{area.candidates.map(x=>x.plant.scientific).join('; ')}. {pt?'A implantação exige avaliação local.':'Local assessment is still required.'}</p>:<p>{pt?'Nenhuma espécie foi validada para plantio nesta área com os dados atuais. Os registros botânicos a seguir são apenas referências de pesquisa.':'No species is validated for planting in this area from the current data. The botanical records below are for research only.'}</p>}
    {area.review.options.length>0&&<details className="v19-options" open={report}><summary>{pt?'Possibilidades para investigar':'Possibilities to investigate'}</summary>{area.review.options.map(o=><p key={o.id}><strong>{o.title}</strong><br/>{o.detail} <a href={references[o.source]?.url} target="_blank" rel="noreferrer">{pt?'Fonte técnica':'Technical source'}</a></p>)}</details>}
    <p className="v18-check"><strong>{pt?'Próxima verificação: ':'Next check: '}</strong>{area.review.checks[0]||(pt?'Conferir as condições locais com profissional habilitado.':'Verify local conditions with a qualified professional.')}</p>
   </article>)}
  </div>
  <section className="v18-botanical">
   <div className="v18-section-heading"><h3>{documented.length?(pt?'Plantas para considerar':'Plants to consider'):(pt?'Plantas para conhecer e investigar':'Plants to explore and research')}</h3><p>{documented.length?(pt?'Correspondências documentais, não aprovação de plantio.':'Evidence matches, not planting approval.'):(pt?'Nenhuma recomendação de plantio foi gerada. As fichas abaixo são exemplos estudados no contexto brasileiro, sem correspondência comprovada para seu terreno.':'No planting recommendation was generated. The records below were studied in Brazil but have not been shown to fit your site.')}</p></div>
   {proposal.cards.length>0?<div className="v18-plant-grid">{proposal.cards.map(x=>{
    const p=x.plant,src=p.image?.file?asset('botanical/'+p.image.file):null;
    return <article key={p.id} className="v18-plant-card">
     {src?<img className="v18-plant-card__photo" src={src} alt={pt?'Fotografia verificada de '+p.scientific:'Verified photograph of '+p.scientific} loading="lazy"/>:<div className="v18-plant-card__placeholder">{pt?'Fotografia indisponível':'Photo not available'}</div>}
     <div className="v18-plant-card__body">
       <span className="v18-plant-card__status">{x.status==='candidate'?(pt?'Correspondência documental':'Documented match'):(pt?'Somente pesquisa':'Research only')}</span>
       <h4><i>{p.scientific}</i></h4>
       <p className="v18-plant-common">{say(p.common,lang)}</p>
       <p>{x.reason}</p>
       {x.areas.length>0&&<p className="v18-plant-areas">{pt?'Áreas: ':'Areas: '}{x.areas.join(', ')}</p>}
       <a href={x.source?.url||p.taxonomyUrl} target="_blank" rel="noreferrer">{referenceNumbers[p.sourceIds[0]]?'['+referenceNumbers[p.sourceIds[0]]+'] ':''}{pt?'Fonte científica':'Scientific source'}</a>
       {p.image&&<small className="v18-credit">{pt?'Foto: ':'Photo: '}<a href={p.image.source} target="_blank" rel="noreferrer">{p.image.author}</a> · <a href={p.image.licenseUrl} target="_blank" rel="noreferrer">{p.image.license}</a></small>}
     </div>
    </article>;
   })}</div>:<p>{pt?'A base ainda não reúne registros pertinentes com imagens verificadas para as condições informadas.':'The database has no relevant records with verified photographs for the reported context.'}</p>}
   {proposal.unpictured?.length>0&&<p className="v18-disclaimer">{pt?'Registros documentais sem fotografia verificada, fora da fotocomposição: ':'Documented records without verified photos, omitted from the photo composition: '}{proposal.unpictured.map(c=>c.plant.scientific).join('; ')}.</p>}
   {research.length>0&&<p className="v18-disclaimer">{pt?'Atenção: as plantas classificadas como “Somente pesquisa” não são propostas de implantação, mesmo quando possuem fotografia.':'Attention: plants marked “Research only” are not installation proposals, even when photographs are shown.'}</p>}
  </section>
  <section className="v18-visual-section">
   <h3>{pt?'Como o espaço poderia ficar':'How the space might look'}</h3>
   {extraActions&&!report&&extraActions}{available.length>0?<div className="v18-visual-list">{available.map(slot=><VisualComponent key={slot} project={project} slot={slot} lang={lang} change={report?null:change} compact={report}/>)}</div>:<p className="v18-empty">{pt?'Ainda não há uma alternativa salva. A plataforma só gera automaticamente elementos associados a espécies com correspondência documental, sem alertas prioritários e com informações suficientes sobre drenagem, duração do acúmulo e afastamento de construções.':'No botanical composition is saved. Automatic placement requires documented matches, no priority warnings, and sufficient information on drainage, pooling duration and distance from buildings.'}</p>}
   {!report&&<div className="v18-actions">
    {onGenerate&&<><button className="btn" type="button" onClick={()=>onGenerate('A')}>{pt?'Gerar proposta para meu terreno':'Generate my site proposal'}</button><button className="btn secondary" type="button" onClick={()=>onGenerate('B')}>{pt?'Criar alternativa B':'Create alternative B'}</button></>}
    {onEdit&&<button type="button" className="btn secondary" onClick={onEdit}>{pt?'Editar no ateliê':'Edit in atelier'}</button>}
   </div>}
   <p className="v18-disclaimer">{proposal.caveats}</p>
  </section>
 </section>;
}
