import {useEffect} from 'react';
/** Translates labels emitted by original React Bits components at the integration boundary.
 * Observe only labels/text structure, never canvas frames or animation styles.
 */
export function useEffectLabels(lang){
 useEffect(()=>{
  const pt=lang==='pt';
  const sync=()=>{
   const attr=(selector,value)=>document.querySelectorAll(selector).forEach(el=>{const next=typeof value==='function'?value(el):value;if(el.getAttribute('aria-label')!==next)el.setAttribute('aria-label',next)});
   attr('.morph-slider-stage[aria-label]',pt?'Galeria de imagens':'Image gallery');
   attr('.morph-slider-btn[aria-label="Previous slide"],.morph-slider-btn[aria-label="Imagem anterior"]',pt?'Imagem anterior':'Previous slide');
   attr('.morph-slider-btn[aria-label="Next slide"],.morph-slider-btn[aria-label="Próxima imagem"]',pt?'Próxima imagem':'Next slide');
   attr('.morph-slider-indicators',pt?'Imagens':'Slides');
   attr('.morph-slider-indicators button',el=>(pt?'Ir para a imagem ':'Go to slide ')+(Array.from(el.parentElement.children).indexOf(el)+1));
   attr('.accordion-gallery',pt?'Galeria de fotografias':'Photo gallery');
   attr('.masonry-lightbox__close',pt?'Fechar fotografia':'Close');
   attr('.masonry-lightbox__prev',pt?'Fotografia anterior':'Previous');
   attr('.masonry-lightbox__next',pt?'Próxima fotografia':'Next');
   attr('.infinite-menu__action',el=>{const title=el.closest('.infinite-menu')?.querySelector('.infinite-menu__title')?.textContent||'';return (pt?'Abrir ficha ':'Open record ')+title});
   attr('[class*="stepper"] [aria-label^="Step "],[class*="stepper"] [aria-label^="Etapa "]',el=>el.getAttribute('aria-label').replace(/^(Step|Etapa) /,pt?'Etapa ':'Step '));
   document.querySelectorAll('.masonry-lightbox__caption a').forEach(el=>{const node=Array.from(el.childNodes).find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());const next=pt?'Abrir fonte ':'Open source ';if(node&&node.textContent!==next)node.textContent=next});
  };
  sync();const observer=new MutationObserver(sync);observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label']});return()=>observer.disconnect();
 },[lang]);
}
