import React,{Suspense,lazy,useEffect,useRef,useState} from 'react';
const Ripple=lazy(()=>import('./reactbits/RippleDistortion.jsx'));
class Boundary extends React.Component{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?this.props.fallback:this.props.children}}
export default function EnvironmentalImage({src,alt}){
 const node=useRef(null),[enabled,setEnabled]=useState(false);
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
  let supported=false;try{const c=document.createElement('canvas'),gl=c.getContext('webgl2')||c.getContext('webgl');supported=!!gl;gl?.getExtension('WEBGL_lose_context')?.loseContext()}catch{}
  const sync=()=>setEnabled(supported&&visible&&!reduced.matches);const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync()},{rootMargin:'100px'});observer.observe(node.current);reduced.addEventListener('change',sync);
  return()=>{observer.disconnect();reduced.removeEventListener('change',sync)};
 },[]);
 const still=<img className="environment-static" src={src} alt={alt}/>;
 return <div ref={node} className="environment-image">{enabled?<Boundary fallback={still}><Suspense fallback={still}><Ripple src={src} brushSize={100} strength={0.08} swirl={0.3} rings={3} grayscale={false}/></Suspense></Boundary>:still}</div>;
}
