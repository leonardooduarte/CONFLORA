import React from 'react';
import {plants,asset} from '../core/knowledge.js';

/** Photo is never changed. Botanical reference photos are displayed only for
 * a plant marker that names exactly that verified species. Not a growth forecast.
 */
export function ProposalVisual({project,slot='A',lang='pt'}){
 const pt=lang==='pt',markers=project?.scenarios?.[slot]?.markers||[];
 const assigned=markers.filter(m=>m.type==='plants'&&plants.some(p=>p.id===m.speciesId&&p.image?.file));
 if(!project?.image)return <p className="v18-visual-note">{pt?'Envie uma fotografia para visualizar a composição sobre o seu terreno.':'Upload a site photo to view a composition over your own space.'}</p>;
 return <figure className="v18-proposal-visual">
   <div className="v18-photo-grid">
    <div className="v18-photo-panel">
      <img className="v18-base-photo" src={project.image} alt={pt?'Fotografia original do terreno':'Original site photo'}/>
      <span className="v18-photo-badge">{pt?'Original':'Original'}</span>
    </div>
    <div className="v18-photo-panel">
      <img className="v18-base-photo" src={project.image} alt={pt?'Fotografia com camadas conceituais de vegetação':'Site photo with conceptual vegetation layers'}/>
      {assigned.map((mark,i)=>{
       const p=plants.find(p=>p.id===mark.speciesId);
       return <div key={mark.id} className="v18-photo-layer" style={{left:String(Number(mark.x)/10)+'%',top:String(Number(mark.y)/6.5)+'%',width:String(Math.max(14,Math.min(27,18*(mark.size||1))))+'%'}}>
        <img src={asset('botanical/'+p.image.file)} alt={pt?'Foto de referência de '+p.scientific:'Reference photo of '+p.scientific} loading="lazy"/>
        <span>{i+1}</span>
       </div>;
      })}
      {markers.filter(m=>m.type==='garden').map((mark,i)=><span key={mark.id} className="v18-garden-zone" style={{left:String(Number(mark.x)/10)+'%',top:String(Number(mark.y)/6.5)+'%'}}>{pt?'Zona conceitual':'Concept zone'}</span>)}
      <span className="v18-photo-badge">{pt?'Proposta '+slot:'Proposal '+slot}</span>
    </div>
   </div>
   <figcaption>{pt?'Montagem ilustrativa com fotografias botânicas de referência. Escala, porte, perspectiva, crescimento e desempenho hidráulico não são previsões.':'Illustrative montage using botanical reference photos. Scale, mature size, perspective, growth and hydrological performance are not predictions.'}</figcaption>
   {assigned.length>0&&<ol className="v18-visual-key">{assigned.map((m,i)=><li key={m.id}><strong>{i+1}.</strong> <i>{plants.find(p=>p.id===m.speciesId)?.scientific}</i></li>)}</ol>}
 </figure>;
}
