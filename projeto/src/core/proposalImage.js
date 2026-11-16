import {plants,asset} from './knowledge.js';
import {Ed} from './editor.js';
import {scenarioMode} from './v19Proposal.js';
const cache=new Map();
export function dataImage(url){if(!url||url.startsWith('data:'))return Promise.resolve(url);if(!cache.has(url))cache.set(url,fetch(url).then(r=>{if(!r.ok)throw Error('Image unavailable');return r.blob()}).then(b=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(b)})).catch(e=>{cache.delete(url);throw e}));return cache.get(url);}
/** Shared SVG for screen, PNG and PDF. Asset references are inlined before raster export. */
export function proposalSVG(project,slot,lang='pt',images={}){
 const esc=Ed.esc,pt=lang==='pt',s=project.scenarios?.[slot],mode=scenarioMode(s),prefix='v19-'+slot;
 const defs=[`<pattern id="${prefix}-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="12" stroke="#b66d45" stroke-width="4"/></pattern>`];
 const layers=(s?.markers||[]).filter(m=>!m.hidden).map((m,i)=>{
  const x=m.x||500,y=m.y||325,scale=m.size||1,rotation=m.rotation||0,opacity=m.opacity??.8,perspective=m.perspective??1;
  const plant=plants.find(p=>p.id===m.speciesId),url=plant?.image?asset('botanical/'+plant.image.file):null;
  let art='';
  if(mode==='botanical'&&url){
   defs.push(`<clipPath id="${prefix}-clip-${i}"><ellipse cx="0" cy="-22" rx="77" ry="83"/></clipPath>`);
   art=`<ellipse cy="51" rx="80" ry="15" fill="#102e24" opacity=".2"/><image x="-78" y="-105" width="156" height="166" preserveAspectRatio="xMidYMid slice" href="${esc(images[url]||url)}" clip-path="url(#${prefix}-clip-${i})"/>`;
  }else{
   const color=m.studyKind==='exclusion'?'#b55240':m.studyKind==='review'?'#b88945':'#3e8262';
   const points=m.points?.length>2?m.points.map(p=>`${p.x-x},${p.y-y}`).join(' '):'-85,-42 85,-42 85,42 -85,42';
   art=`<polygon points="${points}" fill="${color}" fill-opacity=".22" stroke="${color}" stroke-width="3" stroke-dasharray="10 6"/>${m.studyKind==='green'?'':`<polygon points="${points}" fill="url(#${prefix}-hatch)" fill-opacity=".45"/>`}`;
  }
  return `<g data-proposal-id="${esc(m.id)}" role="img" aria-label="${esc(plant?.scientific||m.notes)}" transform="translate(${x} ${y})"><g opacity="${opacity}" transform="rotate(${rotation}) scale(${scale} ${scale*perspective})">${art}</g><circle r="15" fill="#102e24" stroke="#f6f5ef" stroke-width="2"/><text y="5" text-anchor="middle" fill="white" font-family="Arial" font-size="14">${i+1}</text></g>`;
 }).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" role="img" aria-label="${pt?'Estudo conceitual':'Conceptual study'} ${slot}" preserveAspectRatio="xMidYMid meet"><defs>${defs.join('')}</defs><rect width="1000" height="650" fill="#e9ece3"/><image width="1000" height="650" preserveAspectRatio="xMidYMid meet" href="${esc(project.image||'')}"/>${layers}</svg>`;
}
export async function proposalPNG(project,slot,lang='pt'){
 if(!project.image)throw Error('Photo required');const refs={};
 for(const m of project.scenarios?.[slot]?.markers||[]){const p=plants.find(p=>p.id===m.speciesId);if(p?.image){const u=asset('botanical/'+p.image.file);refs[u]=await dataImage(u)}}
 const svg=proposalSVG(project,slot,lang,refs),img=new Image();
 return new Promise((resolve,reject)=>{img.onload=()=>{try{const c=document.createElement('canvas');c.width=1500;c.height=975;c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/png'))}catch(e){reject(e)}};img.onerror=()=>reject(Error('Could not render proposal'));img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
}
