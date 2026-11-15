import React, {useEffect,useRef,useState} from 'react';
import MorphSlider from './reactbits/MorphSlider.jsx';

class SliderBoundary extends React.Component {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 componentDidCatch(){this.props.onError()}
 render(){return this.state.failed?null:this.props.children}
}

// Keep the original engine intact. Cover its fallback texture until real pixels render.
export default function GallerySlider({items,lang}){
 const root=useRef(null),[attempt,setAttempt]=useState(0),[status,setStatus]=useState('loading'),[loaded,setLoaded]=useState(false);
 useEffect(()=>{
  let active=true,raf=0,timer;const images=[];let detach=()=>{};
  setStatus('loading');setLoaded(false);
  const fail=()=>{if(active){setStatus('error');cancelAnimationFrame(raf)}};
  Promise.all(items.map(item=>new Promise((resolve,reject)=>{
   const img=new Image();images.push(img);img.onload=()=>img.decode().then(resolve,reject);img.onerror=reject;img.src=item.image;
  }))).then(()=>{if(active)setLoaded(true)},fail);
  const start=performance.now();
  const check=()=>{
   if(!active)return;
   const canvas=root.current?.querySelector('canvas');
   if(canvas){
    if(!canvas.dataset.observed){canvas.dataset.observed='true';canvas.addEventListener('webglcontextlost',fail);detach=()=>canvas.removeEventListener('webglcontextlost',fail)}
    const gl=canvas.getContext('webgl2')||canvas.getContext('webgl');
    if(gl&&!gl.isContextLost()){
     const pixel=new Uint8Array(4);let min=765,max=0;
     for(const x of [.2,.5,.8])for(const y of [.2,.5,.8]){
      gl.readPixels(Math.floor(gl.drawingBufferWidth*x),Math.floor(gl.drawingBufferHeight*y),1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);
      const sum=pixel[0]+pixel[1]+pixel[2];min=Math.min(min,sum);max=Math.max(max,sum);
     }
     if(max-min>15){setStatus('ready');return}
    }
   }
   if(performance.now()-start>12000){fail();return}
   raf=requestAnimationFrame(check);
  };
  timer=setTimeout(()=>{raf=requestAnimationFrame(check)},0);
  return()=>{active=false;cancelAnimationFrame(raf);clearTimeout(timer);detach();images.forEach(img=>{img.onload=null;img.onerror=null})};
 },[items,attempt]);
 return <div ref={root} className="morph-wrapper" data-status={status} aria-busy={status==='loading'}>
  {loaded&&<SliderBoundary key={attempt} onError={()=>setStatus('error')}><MorphSlider items={items} transition="melt" intensity={0.55} aberration={0.35} drift={0.4} autoplay={false}/></SliderBoundary>}
  {status!=='ready'&&<div className="gallery-cover"><img src={items[0].image} alt={lang==='pt'?'Prévia ilustrativa':'Illustrative preview'}/><div role="status"><p>{status==='error'?(lang==='pt'?'Não foi possível iniciar a galeria animada.':'The animated gallery could not start.'):(lang==='pt'?'Carregando possibilidades…':'Loading possibilities…')}</p>{status==='error'&&<button className="btn" onClick={()=>setAttempt(n=>n+1)}>{lang==='pt'?'Tentar novamente':'Try again'}</button>}</div></div>}
 </div>;
}
