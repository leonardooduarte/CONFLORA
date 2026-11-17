import React,{useEffect,useRef,useState} from 'react';
import {asset} from '../core/knowledge.js';
const KEY='conflora-brand-intro-v22';
function firstVisit(){try{return !sessionStorage.getItem(KEY)&&!window.__confloraIntroSeen&&!matchMedia('(prefers-reduced-motion: reduce)').matches}catch{return !window.__confloraIntroSeen&&!matchMedia('(prefers-reduced-motion: reduce)').matches}}
/** A timed introduction, never a loader. The application mounts in parallel. */
export default function BrandIntro(){
 const [visible,setVisible]=useState(firstVisit),skip=useRef(null);
 const pt=!document.documentElement.lang.startsWith('en');
 useEffect(()=>{window.__confloraIntroSeen=true;try{sessionStorage.setItem(KEY,'seen')}catch{}},[]);
 useEffect(()=>{
  if(!visible)return;
  const app=document.getElementById('app-content'),query=matchMedia('(prefers-reduced-motion: reduce)');
  const previous=document.activeElement;app?.setAttribute('inert','');skip.current?.focus({preventScroll:true});
  const finish=()=>setVisible(false),reduced=()=>{if(query.matches)finish()};
  const timer=setTimeout(finish,1850);query.addEventListener('change',reduced);
  return()=>{clearTimeout(timer);query.removeEventListener('change',reduced);app?.removeAttribute('inert');if(previous?.isConnected&&previous!==document.body)previous.focus({preventScroll:true});else app?.querySelector('.brand')?.focus({preventScroll:true})};
 },[visible]);
 if(!visible)return null;
 return <div className="brand-intro" role="dialog" aria-modal="true" aria-label={pt?'Apresentação CONFLORA':'CONFLORA introduction'} onKeyDown={e=>{if(['Escape','Enter',' '].includes(e.key)){e.preventDefault();setVisible(false)}if(e.key==='Tab'){e.preventDefault();skip.current?.focus()}}}>
  <div className="brand-intro__identity"><img src={asset('conflora-mark.png')} width="88" height="88" alt=""/><span>CONFLORA</span></div>
  <button ref={skip} type="button" onClick={()=>setVisible(false)}>{pt?'Pular apresentação':'Skip introduction'} ↗</button>
 </div>;
}
