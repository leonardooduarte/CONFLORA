import React,{useEffect,useRef,useState} from 'react';
import StaggeredMenu from '../components/reactbits/StaggeredMenu.jsx';
import {asset} from '../core/knowledge.js';
export default function ConfloraMenu({lang,onNavigate}){
 const [generation,setGeneration]=useState(0),[open,setOpen]=useState(false),root=useRef(null);
 const close=()=>{setOpen(false);setGeneration(n=>n+1)};
 useEffect(()=>{if(!open)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';
 const key=e=>{if(e.key==='Escape'){close();requestAnimationFrame(()=>root.current?.querySelector('.sm-toggle')?.focus())}if(e.key==='Tab'){const els=[...root.current.querySelectorAll('button,a')].filter(e=>e.getClientRects().length),first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};document.addEventListener('keydown',key);return()=>{document.body.style.overflow=before;document.removeEventListener('keydown',key)}},[open]);
 // Localize the vendor labels at the adapter boundary; original animation source stays intact.
 useEffect(()=>{const host=root.current;if(!host)return;const sync=()=>{
  const panel=host.querySelector('.staggered-menu-panel');if(panel)panel.inert=!open;
  const button=host.querySelector('.sm-toggle');const name=lang==='pt'?(open?'Fechar menu':'Abrir menu'):(open?'Close menu':'Open menu');if(button?.getAttribute('aria-label')!==name)button?.setAttribute('aria-label',name);
  const header=host.querySelector('.staggered-menu-header');const label=lang==='pt'?'Navegação principal':'Main navigation';if(header?.getAttribute('aria-label')!==label)header?.setAttribute('aria-label',label);
  host.querySelectorAll('.sm-toggle-line').forEach(el=>{if(lang==='pt'&&el.textContent.trim()==='Close')el.textContent='Fechar'});
 };sync();const observer=new MutationObserver(sync);observer.observe(host,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label']});return()=>observer.disconnect()},[lang,open,generation]);
 const items=(lang==='pt'?[['home','Início'],['editor','Meu espaço'],['plants','Herbário'],['gallery','Explorar'],['journal','Meu jardim'],['kit','Meu kit'],['roots','Chuva às raízes'],['library','Projetos']]:[['home','Home'],['editor','My space'],['plants','Herbarium'],['gallery','Explore'],['journal','My garden'],['kit','My kit'],['roots','Rain to roots'],['library','Projects']]).map(([id,label])=>({label,ariaLabel:label,link:'#conflora-'+id}));
 return <div ref={root} className="conflora-mobile-menu" onClick={e=>{const a=e.target.closest('a[href^="#conflora-"]');if(a){e.preventDefault();const target=a.getAttribute('href').slice(10);close();onNavigate(target)}}}><StaggeredMenu key={generation} isFixed position="right" items={items} socialItems={[]} displaySocials={false} displayItemNumbering colors={['#84CAC8','#0B241D']} logoUrl={asset('conflora-mark.png')} menuButtonColor="#F6F5EF" openMenuButtonColor="#0B241D" accentColor="#4F8066" onMenuOpen={()=>setOpen(true)} onMenuClose={()=>setOpen(false)}/></div>;
}
