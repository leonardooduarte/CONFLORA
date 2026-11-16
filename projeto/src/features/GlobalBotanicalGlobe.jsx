import React,{useEffect,useMemo,useRef,useState} from 'react';
import createGlobe from 'cobe';
import {asset} from '../core/knowledge.js';
import {globeGallery} from '../data/globeGallery.js';
import './GlobalBotanicalGlobe.css';

/*
 * The globe is the gallery: all Polaroids are geographic COBE markers.
 * This closely follows the original example's position-anchor and
 * --cobe-visible-* mechanics. No independently rotating photo carousel,
 * guessed camera longitude, or separate bottom thumbnail list.
 *
 * Botanical records in this visual experience are NOT planting advice.
 */
const canAnchor=()=>typeof CSS!=='undefined'&&CSS.supports('position-anchor: --cobe-example');
const prefersLessMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));

export default function GlobalBotanicalGlobe({lang='pt'}){
 const pt=lang==='pt',records=useMemo(()=>globeGallery,[]);
 const canvas=useRef(null),root=useRef(null),cardMap=useRef(new Map()),instance=useRef(null);
 const phase=useRef(.32),tilt=useRef(.14),drag=useRef(null),playing=useRef(true);
 const visible=useRef(false),reduce=useRef(false),raf=useRef(0);
 const [credits,setCredits]=useState(false);
 const [paused,setPaused]=useState(false);
 const [supported,setSupported]=useState(true);
 const [anchors,setAnchors]=useState(true);

 useEffect(()=>{playing.current=!paused},[paused]);
 useEffect(()=>{
   setAnchors(canAnchor());
   const query=window.matchMedia('(prefers-reduced-motion: reduce)');
   const sync=()=>{reduce.current=query.matches};sync();
   query.addEventListener?.('change',sync);
   return()=>query.removeEventListener?.('change',sync);
 },[]);

 useEffect(()=>{
  const surface=canvas.current,host=root.current;
  if(!surface||!host)return;
  let disposed=false,last=0,lastCheck=0,lastWidth=0;
  const io=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting},{threshold:0,rootMargin:'70px'});
  io.observe(host);
  const create=()=>{
   if(disposed)return;
   const width=Math.round(surface.getBoundingClientRect().width);
   if(width<150||width===lastWidth&&instance.current)return;
   lastWidth=width;
   instance.current?.destroy();
   instance.current=null;
   const pixelRatio=Math.min(window.devicePixelRatio||1,1.7);
   try{
    instance.current=createGlobe(surface,{
      devicePixelRatio:pixelRatio,
      width:Math.round(width*pixelRatio),
      height:Math.round(width*pixelRatio),
      phi:phase.current,theta:tilt.current,
      dark:0,diffuse:1.54,
      mapSamples:17500,mapBrightness:7.5,
      baseColor:[.95,.95,.89],
      glowColor:[.78,.73,.61],
      markerColor:[.30,.55,.44],
      markerElevation:0,
      markers:records.map(item=>({id:item.id,location:item.location,size:.021})),
      arcs:[],opacity:.92
    });
    setSupported(true);
   }catch(err){
    console.warn('CONFLORA globe unavailable:',err);
    setSupported(false);
   }
  };
  const ro=new ResizeObserver(create);ro.observe(surface);create();

  /* COBE itself controls each Polaroid's front/back visibility with its
   * --cobe-visible-ID variable. Read the computed opacity from that same
   * source instead of inferring camera direction from longitude.
   */
  function arrange(){
   if(!canAnchor())return;
   const scene=host.querySelector('.globe-orbit__scene');
   if(!scene)return;
   const stage=scene.getBoundingClientRect();
   const narrow=stage.width<430;
   const max=narrow?4:7;
   const threshold=narrow?.25:.18;
   const candidates=[];
   for(let i=0;i<records.length;i++){
    const item=records[i],el=cardMap.current.get(item.id);
    if(!el)continue;
    const opacity=Number.parseFloat(getComputedStyle(el).opacity)||0;
    const r=el.getBoundingClientRect();
    const inside=r.width>32&&r.height>42&&r.right>stage.left-14&&r.left<stage.right+14&&r.bottom>stage.top-47&&r.top<stage.bottom+20;
    if(opacity>threshold&&inside)candidates.push({el,id:item.id,r,opacity,i});
    el.classList.add('globe-orbit__polaroid--hidden');
   }
   // Prefer photographs already visible and markers facing the camera. The
   // priority is intentionally modest: overlapping Polaroids are part of the
   // reference composition, so we only remove severe overlaps.
   candidates.sort((a,b)=>b.opacity-a.opacity || a.i-b.i);
   const selected=[];
   const overlaps=(a,b)=>{
    const w=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));
    const h=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
    return w*h/(Math.min(a.width*a.height,b.width*b.height)||1)>.41;
   };
   for(const c of candidates){
    if(selected.length>=max)break;
    if(selected.every(x=>!overlaps(x.r,c.r)))selected.push(c);
   }
   for(const c of selected)c.el.classList.remove('globe-orbit__polaroid--hidden');
   host.dataset.visibleCount=String(selected.length);
   host.dataset.visibleIds=selected.map(x=>x.id).join(',');
   host.dataset.rotation=phase.current.toFixed(2);
  }

  const tick=time=>{
    if(disposed)return;
    const dt=last?Math.min(time-last,52):16;last=time;
    if(instance.current&&visible.current&&!document.hidden){
      if(playing.current&&!reduce.current&&!drag.current){
       // One revolution in ~29 seconds, like the measured reference sequence.
       phase.current+=dt*.000216;
      }
      instance.current.update({phi:phase.current,theta:tilt.current});
      if(time-lastCheck>155){lastCheck=time;arrange()}
    }
    raf.current=requestAnimationFrame(tick);
  };
  raf.current=requestAnimationFrame(tick);
  return()=>{
    disposed=true;
    cancelAnimationFrame(raf.current);
    ro.disconnect();io.disconnect();
    instance.current?.destroy();instance.current=null;
  };
 },[records]);

 const down=e=>{
   if(e.pointerType==='mouse'&&e.button!==0)return;
   drag.current={id:e.pointerId,x:e.clientX,y:e.clientY};
   e.currentTarget.setPointerCapture?.(e.pointerId);
 };
 const move=e=>{
   const last=drag.current;
   if(!last)return;
   phase.current+=(e.clientX-last.x)/260;
   tilt.current=clamp(tilt.current+(e.clientY-last.y)/650,-.7,.7);
   drag.current={...last,x:e.clientX,y:e.clientY};
 };
 const up=e=>{
   drag.current=null;
   if(e.currentTarget.hasPointerCapture?.(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 };
 return <div className="globe-orbit" ref={root} data-gallery-total={records.length}>
  <div className="globe-orbit__eyebrow">{pt?'FLORA PELO MUNDO':'FLORA AROUND THE WORLD'}</div>
  <div className="globe-orbit__scene" aria-label={pt?'Globo giratório com fotografias Polaroid de plantas ao redor do planeta':'Rotating globe surrounded by Polaroid photographs of global plants'}>
   <div className="globe-orbit__ambient" aria-hidden="true"/>
   {!supported&&<div className="globe-orbit__fallback" role="img" aria-label={pt?'Representação do globo':'Globe representation'}/>}
   <canvas className="globe-orbit__canvas" ref={canvas} aria-hidden="true"
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/>
   {records.map((item,i)=><div key={item.id}
     ref={el=>{if(el)cardMap.current.set(item.id,el);else cardMap.current.delete(item.id)}}
     className={'globe-orbit__polaroid globe-orbit__polaroid--'+(i%5)}
     data-polaroid-id={item.id}
     role="img"
     aria-label={item.name+' — '+(pt?item.region:item.regionEn)}
     style={{
       positionAnchor:'--cobe-'+item.id,
       bottom:'anchor(top)',
       left:'anchor(center)',
       translate:'-50% 0',
       opacity:'var(--cobe-visible-'+item.id+', 0)',
       filter:'blur(calc((1 - var(--cobe-visible-'+item.id+', 0)) * 6px))',
       '--orbit-rotation':item.rotate+'deg'
     }}>
     <img src={asset(item.file)} alt="" loading={i<9?'eager':'lazy'} draggable="false"/>
     <span>{pt?item.namePt:item.labelEn}</span>
   </div>)}
   {!anchors&&<div className="globe-orbit__anchor-fallback" aria-hidden="true">
      {records.slice(2,8).map((item,i)=><figure key={item.id} style={{'--i':i}}>
       <img src={asset(item.file)} alt=""/><figcaption>{pt?item.namePt:item.labelEn}</figcaption>
      </figure>)}
   </div>}
  </div>
  <div className="globe-orbit__footer">
    <span>{pt?'Um planeta, muitas formas de vida.':'One planet, many forms of life.'}</span>
    <div>
     <button type="button" onClick={()=>setPaused(p=>!p)} aria-pressed={paused}>
      {paused?(pt?'Continuar':'Resume'):(pt?'Pausar':'Pause')}
     </button>
     <button type="button" onClick={()=>setCredits(p=>!p)} aria-expanded={credits}>
      {pt?'Créditos':'Credits'}
     </button>
    </div>
  </div>
  {credits&&<aside className="globe-orbit__credits" aria-label={pt?'Créditos da galeria botânica':'Botanical gallery credits'}>
    <header><strong>{pt?'Fontes das fotografias':'Photo sources'}</strong><button type="button" onClick={()=>setCredits(false)} aria-label={pt?'Fechar créditos':'Close credits'}>×</button></header>
    <p>{pt?'Galeria visual internacional; os pontos indicam locais ou contextos documentados, não recomendações para plantio nem a distribuição natural de cada espécie.':'International visual gallery; pins show documented photographic or research contexts, not planting recommendations or native species distributions.'}</p>
    <ul>{records.map(item=><li key={item.id}><i>{item.name}</i> · {item.author} · {item.license} — <a target="_blank" rel="noreferrer" href={item.source}>{pt?'Fonte':'Source'}</a></li>)}</ul>
  </aside>}
 </div>;
}