import React from 'react';
import V18Report from './V18Report.jsx';
import V19Proposal from './V19Proposal.jsx';
import {buildV19Proposal,sourceBibliography} from '../core/v19Proposal.js';
import {references,say} from '../core/knowledge.js';
export default function V19Report({project,lang,reportImage}){
 const proposal=buildV19Proposal(project,lang),ids=sourceBibliography(project,proposal),numbers=Object.fromEntries(ids.map((id,i)=>[id,i+1]));
 return <V18Report project={project} lang={lang} reportImage={reportImage} proposalData={proposal} ProposalComponent={V19Proposal} referenceNumbers={numbers} closingChecks={[...new Set(proposal.regions.flatMap(a=>a.review.checks))]} bibliography={<section className="v19-bibliography"><h2>{lang==='pt'?'Referências e alcance':'References and scope'}</h2><ol>{ids.map(id=><li key={id}><strong>{references[id].title}</strong><p>{say(references[id].scope,lang)}</p><a href={references[id].url}>{references[id].url}</a></li>)}</ol><h3>{lang==='pt'?'Taxonomia e imagens':'Taxonomy and images'}</h3><ul>{proposal.cards.map(c=><li key={c.plant.id}><i>{c.plant.scientific}</i><br/><a href={c.plant.taxonomyUrl}>{c.plant.taxonomyUrl}</a><br/>{c.plant.image.author} · {c.plant.image.license}<br/><a href={c.plant.image.source}>{c.plant.image.source}</a></li>)}</ul><p>{lang==='pt'?'Taxonomia e créditos fotográficos são indicados nos cartões. Fontes gerais sobre sistemas de drenagem não validam espécies para o terreno.':'Taxonomy and image credits are identified in the cards. General drainage sources do not validate species for this site.'}</p></section>}/>;
}
