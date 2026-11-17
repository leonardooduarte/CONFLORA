import React, {useRef} from 'react';
import {motion,useReducedMotion,useScroll,useSpring,useTransform,useVelocity} from 'motion/react';
import {asset,plants,say} from '../core/knowledge.js';
import './KineticGallery.css';

/**
 * V21.1 image direction: this gallery contains identified documentary photographs.
 * Conceptual courtyard, workbook and paving artwork stay in their explanatory modules.
 * No documentary image implies performance in a rain garden.
 */
export const gallerySpeciesIds=[
 'cyperus-giganteus','carex','rhynchanthera-grandiflora',
 'panicum-virgatum','alternanthera-brasiliana','echinacea',
 'arachis-repens','zizia-aurea','inga-affinis'
];
const gallery=gallerySpeciesIds.map(id=>plants.find(p=>p.id===id)).filter(p=>p?.image);
function KineticTile({p,index,skew,reduced,lang}){
 const pt=lang==='pt';
 return <motion.figure className={'kinetic-tile kinetic-tile--'+(index%4)} style={{skewX:reduced?0:skew}}>
  <img src={asset('botanical/'+p.image.file)} alt={p.scientific} loading={index<3?'eager':'lazy'} decoding="async"/>
  <figcaption>
   <span className="kinetic-tile__index">{String(index+1).padStart(2,'0')}</span>
   <span>
    <strong><i>{p.scientific}</i></strong>
    <small>{say(p.common,lang)} · {p.region==='BR'? (pt?'Registro botânico · Brasil':'Botanical record · Brazil'):(pt?'Registro botânico · Iowa':'Botanical record · Iowa')}</small>
    <small className="kinetic-tile__credit"><a href={p.image.source} target="_blank" rel="noreferrer">{p.image.author} · {p.image.license}</a></small>
   </span>
  </figcaption>
 </motion.figure>;
}
export default function KineticGallery({lang='pt',onExplore}){
 const pt=lang==='pt',section=useRef(null);
 const {scrollY}=useScroll(),velocity=useVelocity(scrollY);
 const smoothed=useSpring(velocity,{stiffness:85,damping:40,mass:.22});
 const skew=useTransform(smoothed,[-1800,0,1800],[-2.4,0,2.4]);
 const reduced=useReducedMotion();
 return <section ref={section} className="kinetic-gallery" aria-labelledby="kinetic-title">
  <div className="kinetic-gallery__intro">
   <div><span className="eyebrow">CONFLORA / {pt?'HERBÁRIO EM MOVIMENTO':'HERBARIUM IN MOTION'}</span><h2 id="kinetic-title">{pt?'A natureza não fica parada.':'Nature is never still.'}</h2></div>
   <div className="kinetic-gallery__lede">
    <p>{pt?'Nove retratos botânicos documentados, dois contextos regionais. Conheça a diversidade sem confundir uma fotografia com uma recomendação de plantio.':'Nine documented botanical portraits, two regional contexts. Explore biodiversity without treating a photograph as planting advice.'}</p>
    <button className="btn secondary kinetic-gallery__cta" type="button" onClick={onExplore}>{pt?'Explorar espécies e fontes':'Explore species and sources'} ↗</button>
   </div>
  </div>
  <div className="kinetic-gallery__grid">{gallery.map((p,index)=><KineticTile key={p.id} p={p} index={index} skew={skew} reduced={reduced} lang={lang}/>)}</div>
  <p className="kinetic-gallery__footnote">{pt?'Fotografias documentais com autoria e licença. Ocorrência e características botânicas não comprovam adequação nem eficiência hidráulica no seu terreno.':'Documentary photographs with attribution. Species distribution and traits do not establish suitability or hydraulic performance on your site.'}</p>
 </section>;
}
