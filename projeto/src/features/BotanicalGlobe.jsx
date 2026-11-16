import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react';
import createGlobe from 'cobe';
import {asset,plants} from '../core/knowledge.js';
import './BotanicalGlobe.css';

/**
 * The coordinates below are locations of documented source CONTEXTS:
 * BR = Bauru/SP, where the PLURIS 2024 pot experiment took place;
 * IA = an approximate centre of the state of Iowa, whose regional guide
 * describes species. Neither marker claims natural origin, a verified
 * occurrence at that point, or validated planting suitability.
 */
const SOURCE_CONTEXTS=[
 {id:'br',location:[-22.3245,-49.0726],plantIds:['commelina','distimake','trimezia'],spin:-6,
  label:{pt:'Bauru · São Paulo',en:'Bauru · São Paulo'},
  source:{pt:'Pesquisa em protótipos',en:'Prototype research'}},
 {id:'ia',location:[42.03,-93.47],plantIds:['monarda','carex','lobelia'],spin:6,
  label:{pt:'Iowa · Estados Unidos',en:'Iowa · United States'},
  source:{pt:'Guia técnico regional',en:'Regional technical guide'}}
];
const clamp=(x,lo,hi)=>Math.max(lo,Math.min(hi,x));
const lookup=id=>plants.find(p=>p.id===id);
const supportsAnchors=()=>typeof CSS!=='undefined'&&CSS.supports?.('position-anchor','--cobe-br')===true;
const supportsWebgl=canvas=>{try{return Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl'))}catch{return false}};

export default function BotanicalGlobe({lang='pt',onOpen}){
 const pt=lang==='pt';
 const canvasRef=useRef(null),mountRef=useRef(null);
 const activeRef=useRef(true),dragRef=useRef(null);
 const offset=useRef({phi:0,theta:0});
 const [choice,setChoice]=useState({br:0,ia:0});
 const [paused,setPaused]=useState(false);
 const [webgl,setWebgl]=useState(true);
 const [anchored,setAnchored]=useState(false);
 const reduced=useRef(false),pausedRef=useRef(paused);
 useEffect(()=>{pausedRef.current=paused},[paused]);
 const entries=useMemo(()=>SOURCE_CONTEXTS.map(region=>({
   ...region,
   item:lookup(region.plantIds[choice[region.id]%region.plantIds.length])
 })),[choice]);
 const changePhoto=useCallback(id=>setChoice(old=>({...old,[id]:(old[id]+1)%SOURCE_CONTEXTS.find(r=>r.id===id).plantIds.length})),[]);
 useEffect(()=>{
  const q=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{reduced.current=q.matches};
  sync();q.addEventListener('change',sync);
  setAnchored(supportsAnchors());
  return()=>q.removeEventListener('change',sync);
 },[]);
 useEffect(()=>{
  const canvas=canvasRef.current,root=mountRef.current;
  if(!canvas||!root)return;
  let globe=null,raf=0,mounted=true,initWidth=0;
  if(!supportsWebgl(canvas)){setWebgl(false);return}
  const build=()=>{
   const width=Math.floor(canvas.getBoundingClientRect().width);
   if(width<20||!mounted||width===initWidth&&globe)return;
   if(globe){globe.destroy();globe=null}
   initWidth=width;
   const dpr=Math.min(devicePixelRatio||1,1.75);
   try{
    globe=createGlobe(canvas,{
     devicePixelRatio:dpr,
     width:Math.round(width*dpr),height:Math.round(width*dpr),
     phi:offset.current.phi,theta:offset.current.theta-.17,
     dark:1,diffuse:1.45,scale:1,
     mapSamples:18000,mapBrightness:2.9,
     baseColor:[.12,.31,.24],
     markerColor:[.91,.67,.39],
     glowColor:[.27,.23,.16],
     markerElevation:.015,
     markers:SOURCE_CONTEXTS.map(r=>({id:r.id,location:r.location,size:.072})),
     arcs:[],opacity:.98
    });
    setWebgl(true);
   }catch(err){
    console.warn('CONFLORA globe unavailable',err);
    setWebgl(false);
   }
  };
  const ro=new ResizeObserver(build);ro.observe(canvas);build();
  const io=new IntersectionObserver(([e])=>{activeRef.current=e.isIntersecting},{threshold:.06});io.observe(root);
  let last=0;
  const animate=t=>{
   if(!mounted)return;
   if(globe&&activeRef.current&&!document.hidden){
    if(!pausedRef.current&&!reduced.current&&!dragRef.current){
     const delta=last?Math.min(t-last,64):16;
     offset.current.phi+=delta*.00011;
    }
    globe.update({phi:offset.current.phi,theta:offset.current.theta-.17});
   }
   last=t;
   raf=requestAnimationFrame(animate);
  };
  raf=requestAnimationFrame(animate);
  return()=>{mounted=false;cancelAnimationFrame(raf);io.disconnect();ro.disconnect();globe?.destroy()};
 },[]);
 const onDown=e=>{
  if(e.button!==0&&e.pointerType==='mouse')return;
  dragRef.current={x:e.clientX,y:e.clientY};
  e.currentTarget.setPointerCapture?.(e.pointerId);
 };
 const onMove=e=>{
  const prev=dragRef.current;
  if(!prev)return;
  offset.current.phi+=(e.clientX-prev.x)/210;
  offset.current.theta=clamp(offset.current.theta+(e.clientY-prev.y)/400,-.85,.85);
  dragRef.current={x:e.clientX,y:e.clientY};
 };
 const onUp=e=>{dragRef.current=null;if(e.currentTarget.hasPointerCapture?.(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)};
 return <div className="botanical-globe" ref={mountRef} aria-label={pt?'Globo interativo do Herbário CONFLORA':'CONFLORA Herbarium interactive globe'}>
   <header className="botanical-globe__mast">
     <span>CONFLORA / {pt?'CARTOGRAFIA BOTÂNICA':'BOTANICAL CARTOGRAPHY'}</span>
     <strong>{pt?'A flora tem territórios.':'Flora has a geography.'}</strong>
   </header>
   <div className={'botanical-globe__scene'+(!webgl?' botanical-globe__scene--fallback':'')}>
    {!webgl&&<div className="botanical-globe__fallback" aria-hidden="true"><div className="botanical-globe__fallback-sphere">✦</div></div>}
    <canvas ref={canvasRef} className="botanical-globe__canvas" aria-hidden="true"
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}/>
    {anchored&&webgl&&entries.map(region=><button type="button"
      key={region.id} className={'botanical-globe__polaroid botanical-globe__polaroid--'+region.id}
      style={{positionAnchor:'--cobe-'+region.id,opacity:'var(--cobe-visible-'+region.id+', 0)',transform:'rotate('+region.spin+'deg)'}}
      aria-label={(pt?'Ver próximo registro de ':'See next record from ')+region.label[lang]}
      onClick={()=>changePhoto(region.id)}>
       <img src={asset('botanical/'+region.item.image.file)} alt={region.item.scientific} loading="eager"/>
       <span><i>{region.item.scientific}</i></span>
       <small>{region.label[lang]}</small>
    </button>)}
   </div>
   <div className="botanical-globe__index">
    {entries.map(region=><div className="botanical-globe__entry" key={region.id}>
      <button type="button" className="botanical-globe__thumbnail" onClick={()=>changePhoto(region.id)}
        aria-label={(pt?'Próxima planta de ':'Next plant from ')+region.label[lang]}>
       <img src={asset('botanical/'+region.item.image.file)} alt=""/>
       <span aria-hidden="true">↻</span>
      </button>
      <div className="botanical-globe__entry-text">
       <b>{region.label[lang]}</b>
       <i>{region.item.scientific}</i>
       <small>{region.source[lang]} · {choice[region.id]+1}/{region.plantIds.length}</small>
      </div>
    </div>)}
   </div>
   <footer className="botanical-globe__footer">
    <p>{pt?'Os pontos indicam contextos dos estudos e guias utilizados, não a origem ou a distribuição natural das plantas.':'Pins indicate the locations or regions of cited research and guides, not native plant origins or verified occurrence points.'}</p>
    <div className="botanical-globe__controls">
     <button type="button" onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>
      {paused?(pt?'Retomar':'Resume'):(pt?'Pausar':'Pause')} <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span>
     </button>
     <button type="button" onClick={onOpen}>{pt?'Abrir Herbário':'Open Herbarium'} <span aria-hidden="true">↗</span></button>
    </div>
   </footer>
 </div>;
}
