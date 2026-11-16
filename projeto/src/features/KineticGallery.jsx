import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { asset } from '../core/knowledge.js';
import './KineticGallery.css';

/**
 * Scroll-responsive editorial gallery. Uses actual pixel/second scroll velocity,
 * NOT scrollYProgress mapped to a constant skew. Uses project-owned visual assets.
 * Educational/illustrative images are never presented as planting recommendations.
 */
const gallery = [
 { src: 'conflora-courtyard.webp', pt: 'O espaço', en: 'The space', subPt: 'Observação do terreno', subEn: 'Site observation', type: 'concept' },
 { src: 'conflora-water-roots.webp', pt: 'Água e raízes', en: 'Water and roots', subPt: 'Relações naturais', subEn: 'Natural interactions', type: 'concept' },
 { src: 'botanical/commelina-erecta.webp', pt: 'Commelina erecta', en: 'Commelina erecta', subPt: 'Registro botânico', subEn: 'Botanical record', type: 'botanical' },
 { src: 'conflora-groundcover.webp', pt: 'Cobertura viva', en: 'Living groundcover', subPt: 'Solo e vegetação', subEn: 'Soil and vegetation', type: 'concept' },
 { src: 'rain-garden.webp', pt: 'Jardim de chuva', en: 'Rain garden', subPt: 'Possibilidade conceitual', subEn: 'Conceptual possibility', type: 'concept' },
 { src: 'botanical/echinacea-pallida.webp', pt: 'Echinacea pallida', en: 'Echinacea pallida', subPt: 'Registro botânico · Iowa', subEn: 'Botanical record · Iowa', type: 'botanical' },
 { src: 'conflora-paving.webp', pt: 'Superfícies', en: 'Surfaces', subPt: 'Caminhos possíveis da água', subEn: 'Possible water pathways', type: 'concept' },
 { src: 'botanical/lobelia-siphilitica.webp', pt: 'Lobelia siphilitica', en: 'Lobelia siphilitica', subPt: 'Registro botânico · Iowa', subEn: 'Botanical record · Iowa', type: 'botanical' },
 { src: 'conflora-observe.webp', pt: 'Observar antes de agir', en: 'Observe before acting', subPt: 'Da observação ao plano', subEn: 'From observation to plan', type: 'concept' }
];

function KineticTile({ item, index, skew, reduced, lang }) {
 const pt = lang === 'pt';
 return <motion.figure className={'kinetic-tile kinetic-tile--' + (index % 4)} style={{ skewX: reduced ? 0 : skew }}>
   <img src={asset(item.src)} alt={pt ? item.pt : item.en} loading="lazy" decoding="async"/>
   <figcaption>
     <span className="kinetic-tile__index">{String(index+1).padStart(2,'0')}</span>
     <span><strong>{pt ? item.pt : item.en}</strong><small>{pt ? item.subPt : item.subEn}</small></span>
   </figcaption>
 </motion.figure>;
}

export default function KineticGallery({ lang = 'pt', onExplore }) {
 const pt = lang === 'pt';
 const section = useRef(null);
 const { scrollY } = useScroll();
 const velocity = useVelocity(scrollY);
 const smoothed = useSpring(velocity, { stiffness: 90, damping: 36, mass: 0.18 });
 const skew = useTransform(smoothed, [-1800, 0, 1800], [-8, 0, 8]);
 const reduced = useReducedMotion();
 return <section ref={section} className="kinetic-gallery" aria-labelledby="kinetic-title">
   <div className="kinetic-gallery__intro">
     <div>
       <span className="eyebrow">CONFLORA / {pt ? 'ATLAS EM MOVIMENTO' : 'ATLAS IN MOTION'}</span>
       <h2 id="kinetic-title">{pt ? 'A natureza não fica parada.' : 'Nature is never still.'}</h2>
     </div>
     <div className="kinetic-gallery__lede">
       <p>{pt ? 'Explore diferentes paisagens e formas de observar a água, o solo e as plantas. Percorra a galeria: as imagens respondem suavemente ao ritmo da rolagem.' : 'Explore landscapes and ways of observing water, soil and plants. As you scroll, the images respond gently to your movement.'}</p>
       <button className="btn secondary kinetic-gallery__cta" type="button" onClick={onExplore}>{pt ? 'Explorar espécies e fontes' : 'Explore plants and sources'} ↗</button>
     </div>
   </div>
   <div className="kinetic-gallery__grid">
     {gallery.map((item,index)=><KineticTile key={item.src} item={item} index={index} skew={skew} reduced={reduced} lang={lang}/>)}
   </div>
   <p className="kinetic-gallery__footnote">{pt ? 'Imagens conceituais e registros botânicos identificados. Esta galeria é educativa; nenhuma imagem indica adequação de plantio ou desempenho hidráulico.' : 'Conceptual imagery and identified botanical records. This gallery is educational and does not endorse planting suitability or hydraulic performance.'}</p>
 </section>;
}
