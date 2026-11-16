import React,{useEffect,useMemo,useRef,useState} from 'react';
import createGlobe from 'cobe';
import {asset} from '../core/knowledge.js';
import {globeGallery} from '../data/globeGallery.js';
import './GlobalBotanicalGlobe.css';

const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
const safeAnchors=()=>typeof CSS!=='undefined'&&CSS.supports?.('position-anchor: --cobe-test')===true;

export default function GlobalBotanicalGlobe({lang='pt'}){
 const pt=lang==='pt';
 const [supported,setSupported]=useState(true);
 const [anchors,setAnchors]=useState(true);
 const [paused,setPaused]=useState(false);
 const [credits,setCredits]=useState(false);
 const canvas=useRef(null),stage=useRef(null),sphere=useRef(null);
 const cards=useRef(new Map()),frame=useRef(null);
 const phi=useRef(.46),theta=useRef(.12),drag=useRef(null),active=useRef(false);
 const lastFrame=useRef(0),lastLayout=useRef(0),pause=useRef(false),reduced=useRef(false);
 const kept=useRef(new Set());
 const gallery=useMemo(()=>globeGallery,[]);
 useEffect(()=>{pause.current=paused},[paused]);
 useEffect(()=>{
  setAnchors(safeAnchors());
  const mq=window.matchMedia('(prefers-reduced-motion:reduce)');
  const sync=()=>{reduced.current=mq.matches};sync();
  mq.addEventListener('change',sync);
  return()=>mq.removeEventListener('change',sync);
 },[]);
 useEffect(()=>{
  const element=canvas.current,root=stage.current;
  if(!element||!root)return;
  let instance=null,disposed=false;
  const observer=new IntersectionObserver(([entry])=>{active.current=entry.isIntersecting},{rootMargin:'100px',threshold:0});
  observer.observe(root);
  const destroy=()=>{if(instance){instance.destroy();instance=null}};
  const initialize=()=>{
   const size=element.getBoundingClientRect().width;
   if(!size||disposed)return;
   const n=Math.round(size);
   if(n<150)return;
   destroy();
   const ratio=Math.min(window.devicePixelRatio||1,1.6);
   try{
    instance=createGlobe(element,{
     devicePixelRatio:ratio,
     width:Math.round(n*ratio),
     height:Math.round(n*ratio),
     phi:phi.current,
     theta:theta.current,
     dark:0,
     diffuse:1.68,
     mapSamples:17500,
     mapBrightness:7.5,
     baseColor:[.95,.95,.91],
     markerColor:[.42,.66,.48],
     glowColor:[.76,.67,.52],
     markerElevation:0.017,
     markers:gallery.map(record=>({id:record.id,location:record.location,size:.032})),
     arcs:[],
     opacity:.94,
    });
    setSupported(true);
   }catch(error){
    console.warn('CONFLORA: optional globe rendering unavailable',error);
    setSupported(false);
   }
  };
  const ro=new ResizeObserver(entries=>{
   const size=entries[0]?.contentRect?.width||0;
   if(size>100&&(!sphere.current||Math.abs(sphere.current-size)>4)){
    sphere.current=size;initialize();
   }
  });
  ro.observe(element);initialize();
  const rectsOverlap=(a,b,gap=7)=>a.left<b.right+gap&&a.right+gap>b.left&&a.top<b.bottom+gap&&a.bottom+gap>b.top;
  const declutter=()=>{
   if(!safeAnchors())return;
   const scene=root.querySelector('.globe-orbit__scene');
   if(!scene)return;
   const board=scene.getBoundingClientRect();
   const small=board.width<410;
   const limit=small?4:6;
   const candidates=[];
   for(const record of gallery){
    const element=cards.current.get(record.id);
    if(!element)continue;
    const style=getComputedStyle(element);
    // COBE v2 exposes DOM anchor positions; derive front-hemisphere opacity
    // independently so cards never appear on the back if the optional
    // --cobe-visible-* CSS variables are not inherited in this DOM context.
    const lat=record.location[0]*Math.PI/180;
    const lon=record.location[1]*Math.PI/180;
    const cameraLon=-Math.PI/2-phi.current;
    const angular=Math.atan2(Math.sin(lon-cameraLon),Math.cos(lon-cameraLon));
    const depth=Math.cos(lat)*Math.cos(angular);
    const v=clamp((depth-.025)/.17,0,1);
    const bbox=element.getBoundingClientRect();
    if(v<.35||bbox.width<8||bbox.height<8||bbox.right<board.left-7||bbox.left>board.right+7||bbox.bottom<board.top-4||bbox.top>board.bottom+4){
     element.style.opacity='0';
     element.setAttribute('aria-hidden','true');
     continue;
    }
    const center=bbox.left+bbox.width/2;
    const previous=kept.current.has(record.id);
    const proximity=Math.abs(center-(board.left+board.width/2))/board.width;
    candidates.push({record,element,bbox,v,score:(previous?40:0)+v*24-proximity*8});
   }
   root.dataset.candidates=JSON.stringify(candidates.map(c=>({id:c.record.id,v:+c.v.toFixed(2),x:Math.round(c.bbox.x),y:Math.round(c.bbox.y)})));
   candidates.sort((a,b)=>b.score-a.score);
   const accepted=[],next=new Set();
   for(const item of candidates){
    const fits=accepted.every(other=>!rectsOverlap(item.bbox,other,6));
    if(accepted.length<limit&&fits){
     accepted.push(item.bbox);next.add(item.record.id);
     item.element.style.opacity=String(item.v);
     item.element.removeAttribute('aria-hidden');
    }else{
     item.element.style.opacity='0';
     item.element.setAttribute('aria-hidden','true');
    }
   }
   kept.current=next;
   root.dataset.visibleCount=String(next.size);
   root.dataset.visibleIds=[...next].join(',');
   root.dataset.phi=phi.current.toFixed(3);
  };
  const animate=(time)=>{
   if(disposed)return;
   const elapsed=Math.min(time-(lastFrame.current||time),50);
   lastFrame.current=time;
   if(instance&&active.current&&!document.hidden){
    if(!pause.current&&!drag.current&&!reduced.current){
     // ~22s per revolution: moving photo constellation as in the reference.
     phi.current+=elapsed*.00028;
    }
    instance.update({phi:phi.current,theta:theta.current});
    if(time-lastLayout.current>170){
     lastLayout.current=time;
     declutter();
    }
   }
   frame.current=requestAnimationFrame(animate);
  };
  frame.current=requestAnimationFrame(animate);
  return()=>{
   disposed=true;
   cancelAnimationFrame(frame.current);
   observer.disconnect();ro.disconnect();destroy();
  };
 },[gallery]);
 const down=e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
  drag.current={id:e.pointerId,x:e.clientX,y:e.clientY};
  e.currentTarget.setPointerCapture?.(e.pointerId);
 };
 const move=e=>{
  const current=drag.current;
  if(!current)return;
  phi.current+=(e.clientX-current.x)/230;
  theta.current=clamp(theta.current+(e.clientY-current.y)/440,-.58,.58);
  drag.current={...current,x:e.clientX,y:e.clientY};
 };
 const up=e=>{
  drag.current=null;
  if(e.currentTarget.hasPointerCapture?.(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 };
 return <div className="globe-orbit" ref={stage} data-gallery-total={gallery.length}>
  <div className="globe-orbit__topline">
   <span>CONFLORA <span aria-hidden="true">/</span> {pt?'ATLAS VIVO':'LIVING ATLAS'}</span>
   <span>{String(gallery.length).padStart(2,'0')} {pt?'REGISTROS VISUAIS':'VISUAL RECORDS'}</span>
  </div>
  <div className="globe-orbit__scene" aria-label={pt?'Planeta giratório com Polaroids de flores e plantas de diferentes regiões do mundo':'Rotating globe with Polaroid photographs of plants from different world regions'}>
   <div className="globe-orbit__halo" aria-hidden="true"/>
   {!supported&&<div className="globe-orbit__fallback" role="img" aria-label={pt?'Representação decorativa do planeta':'Decorative globe representation'}/>}
   <canvas className="globe-orbit__canvas" ref={canvas}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-hidden="true"/>
   {gallery.map((item,i)=><div
      ref={el=>{if(el)cards.current.set(item.id,el);else cards.current.delete(item.id)}}
      key={item.id}
      className={'globe-orbit__polaroid globe-orbit__polaroid--'+(i%4)}
      data-polaroid-id={item.id}
      aria-label={item.name+' — '+(pt?item.region:item.regionEn)}
      style={{
       positionAnchor:'--cobe-'+item.id,
       left:'anchor(center)',bottom:'anchor(top)',
       '--orbit-rotation':item.rotate+'deg',
       opacity:0
      }}>
     <div className="globe-orbit__photo">
      <img src={asset(item.file)} alt={item.name} loading={i<8?'eager':'lazy'} draggable="false"/>
     </div>
     <div className="globe-orbit__label">
      <span>{pt?item.namePt:item.labelEn}</span>
      <small>{pt?item.region:item.regionEn}</small>
     </div>
    </div>)}
   {!anchors&&<div className="globe-orbit__anchor-fallback" aria-hidden="true">
      {[gallery[2],gallery[3],gallery[5],gallery[10]].map((item,i)=><figure key={item.id} style={{'--i':i}}>
       <img src={asset(item.file)} alt=""/><figcaption>{item.name}</figcaption>
      </figure>)}
   </div>}
  </div>
  <div className="globe-orbit__footnote">
   <span>{pt?'Explore a flora pelo planeta.':'Discover flora across the planet.'}</span>
   <div className="globe-orbit__actions">
    <button type="button" onClick={()=>setPaused(v=>!v)} aria-pressed={paused} title={pt?'Pausar ou retomar a rotação':'Pause or resume rotation'}>
     {paused?(pt?'Reproduzir':'Play'):(pt?'Pausar':'Pause')} <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span>
    </button>
    <button type="button" className="globe-orbit__credit-trigger" onClick={()=>setCredits(v=>!v)} aria-expanded={credits}>
      {pt?'Créditos':'Credits'} <span aria-hidden="true">↗</span>
    </button>
   </div>
  </div>
  {credits&&<div className="globe-orbit__credits" role="region" aria-label={pt?'Fontes e licenças fotográficas':'Photo sources and licenses'}>
   <div className="globe-orbit__credit-head">
    <strong>{pt?'Fotografias e procedência':'Photographs and provenance'}</strong>
    <button type="button" onClick={()=>setCredits(false)} aria-label={pt?'Fechar créditos':'Close credits'}>×</button>
   </div>
   <p>{pt?'O globo é uma galeria de imagens, não um catálogo de recomendações. Os pontos representam locais de fotografias ou contextos documentais indicados; não demonstram a origem natural das espécies.':'This globe is a photo gallery, not a planting guide. Pins indicate documented image locations or research contexts, not natural plant origins.'}</p>
   <ul>{gallery.map(item=><li key={item.id}><i>{item.name}</i> · {item.author} · {item.license} · <a href={item.source} rel="noreferrer" target="_blank">{pt?'Fonte':'Source'} ↗</a></li>)}</ul>
  </div>}
 </div>;
}
