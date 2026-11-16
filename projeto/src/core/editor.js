import {plants} from './knowledge.js';
/* SVG image workspace: normalized coordinates, no automatic inference from uploaded photos. */
export const Ed = (()=>{
 const W=1000,H=650;
 const colors={pool:'#43B8C2',roof:'#3E899F',paved:'#B78466',plants:'#48805F',space:'#C48B5F',garden:'#5E8E65'};
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
 function baseDrawing(){return `<rect width="1000" height="650" fill="#EAE8DB"/>
 <g opacity=".36" stroke="#B1B6A8" stroke-width=".65">${Array.from({length:20},(_,i)=>`<path d="M${i*50} 0 V650"/>`).join('')}${Array.from({length:13},(_,i)=>`<path d="M0 ${i*50} H1000"/>`).join('')}</g>
 <rect x="29" y="29" width="943" height="592" rx="8" fill="none" stroke="#5D746C" stroke-width="3" stroke-dasharray="8 10"/>
 <path d="M58 86 L345 86 L345 545 L58 545 Z" fill="#DAD3C0" stroke="#7F806F" stroke-width="3"/>
 <path d="M58 86 L345 545 M345 86 L58 545" stroke="#BFB7A4" stroke-width="2"/>
 <path d="M330 296 L515 296 L515 378 L330 378" fill="#C7C4B5" stroke="#918C7F" stroke-width="2"/>
 <path d="M515 86 L935 86 L935 546 L515 546 Z" fill="#C8D7BA" opacity=".53"/>
 <path d="M545 105 Q690 172 878 123 M545 510 Q730 433 916 510" fill="none" stroke="#7DA184" stroke-width="3" opacity=".45"/>
 <g fill="#729B76" stroke="#4B755C" stroke-width="2"><circle cx="811" cy="230" r="60"/><circle cx="811" cy="230" r="42" fill="#91B295"/><circle cx="611" cy="475" r="42"/><circle cx="611" cy="475" r="24" fill="#96B79A"/></g>
 <g font-family="Arial,sans-serif" fill="#5B675B" font-size="14" font-weight="700" letter-spacing="2"><text x="86" y="120">CASA / ÁREA COBERTA</text><text x="544" y="117">ÁREA EXTERNA</text></g>
 <g font-family="Arial,sans-serif" fill="#64675D" font-size="12" letter-spacing="1"><text x="68" y="587">ESQUEMA ILUSTRATIVO · SEM ESCALA</text></g>`;}
 function marker(a,labels,selected=false,number=1,mode='full'){
  const x=clamp(+a.x||0,0,W),y=clamp(+a.y||0,0,H),scale=clamp(+a.size||1,.55,2.4),c=a.studyKind==='exclusion'?'#b55240':a.studyKind==='review'?'#b88945':colors[a.type]||'#527766';
  let art='';
  if(a.type==='pool') art=`<g fill="none" stroke="${c}" stroke-width="4"><ellipse rx="54" ry="27"/><ellipse rx="37" ry="17" stroke-width="2"/><ellipse rx="20" ry="8" stroke-width="2"/></g><circle r="5" fill="${c}"/>`;
  else if(a.type==='roof') art=`<path d="M-36 -15 L14 -15 L14 21" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/><path d="M-2 12 L14 30 L30 12" fill="none" stroke="${c}" stroke-width="7" stroke-linejoin="round"/>`;
  else if(a.type==='paved') art=`<rect x="-57" y="-36" width="114" height="72" rx="5" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="3" stroke-dasharray="9 5"/><path d="M-25 -36 V36 M24 -36 V36 M-57 0 H57" stroke="${c}" stroke-width="1.5" opacity=".75"/>`;
  else if(a.type==='plants') art=`<circle r="46" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="2"/><g fill="${c}"><path d="M0 14 Q-43 -10 -25 -35 Q3 -32 0 14"/><path d="M0 14 Q43 -10 25 -35 Q-3 -32 0 14"/></g><path d="M0 20 V-24" stroke="#2E6B4B" stroke-width="4"/>`;
  else if(a.type==='space') art=`<rect x="-77" y="-47" width="154" height="94" rx="16" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="3" stroke-dasharray="9 7"/><path d="M-20 0 H20 M0 -20 V20" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
  else if(a.type==='garden') art=`<path d="M-114 -37 Q-69 -82 12 -70 Q97 -80 121 -24 Q147 33 62 66 Q-3 91 -86 48 Q-143 15 -114 -37Z" fill="#9DC49D" stroke="#3A7656" stroke-width="4"/><path d="M-97 -25 Q-33 -64 56 -46 M-80 38 Q-4 66 81 26" stroke="#477754" stroke-width="2" fill="none" stroke-dasharray="7 5"/><g fill="#265A3D">${[[-64,-6],[-12,-20],[42,4],[77,-26],[-22,34]].map(([px,py])=>`<path d="M${px} ${py+12} q-22 -24 -12 -32 q21 2 12 32 q12 -30 27 -25 q8 18 -27 25"/>`).join('')}</g><g fill="#E4EAA6">${[[-35,-36],[13,18],[74,28]].map(([px,py])=>`<circle cx="${px}" cy="${py}" r="7"/>`).join('')}</g>`;
  if(a.points?.length>1&&['path','polygon'].includes(a.kind)){
   const pts=a.points.map(p=>`${clamp(+p.x,0,W)-x},${clamp(+p.y,0,H)-y}`).join(' ');
   if(a.kind==='polygon')art=`<polygon points="${pts}" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="3"/>`;
   else art=`<defs><marker id="arrow-${esc(a.id)}" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6Z" fill="#237B8A"/></marker></defs><polyline points="${pts}" fill="none" stroke="#237B8A" stroke-width="5" marker-end="url(#arrow-${esc(a.id)})"/>`;
  }
  const label=esc(a.studyKind?a.notes:a.speciesId?(plants.find(p=>p.id===a.speciesId)?.scientific||'Espécie / Species'):a.kind==='path'?(labels.waterPath||'Caminho de água / Water path'):(labels?.[a.type]??a.type)),sel=selected?`<circle r="${a.type==='garden'?145*scale:86*scale}" fill="none" stroke="#D8F9A0" stroke-width="3" stroke-dasharray="9 6"/>`:'';
  const badge=mode==='numbers'?`<g class="marker-number" transform="translate(25 -30)"><circle r="17" fill="#0B2C23" stroke="#FFFFFF" stroke-width="2"/><text text-anchor="middle" y="5" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">${number}</text></g>`:'';
  const labelArt=`<g class="marker-name" transform="translate(0 ${a.type==='garden'?90*scale:65*scale})"><rect x="-${Math.max(65,(label.length+4)*4.5)}" y="-17" width="${Math.max(130,(label.length+4)*9)}" height="30" rx="15" fill="#0B2C23"/><text text-anchor="middle" y="3" font-family="Arial,sans-serif" font-size="14" font-weight="600" fill="#F8F7ED">${number}. ${label}</text></g>`;
  return `<g data-marker-id="${esc(a.id)}" data-selected="${selected}" tabindex="-1" role="img" aria-label="${label}" style="cursor:grab"><title>${number}. ${label}</title><g transform="translate(${x} ${y})">${sel}<g opacity="${a.opacity??1}" transform="rotate(${a.rotation||0}) scale(${scale} ${scale*(a.perspective??1)})">${art}</g>${badge}${mode==='full'||selected||a.speciesId?labelArt:''}</g></g>`;
 }
 function svgContent(project,opts={}){
  const labels=opts.labels||{}; const selected=opts.selected; const compare=!!opts.compare; const fraction=clamp(Number(opts.fraction??50),0,100)/100;
  const photo=project.image&&/^data:image\/(jpeg|png|webp);base64,/.test(project.image)?`<image href="${project.image}" x="0" y="0" width="1000" height="650" preserveAspectRatio="xMidYMid meet"/>`:baseDrawing();
  const visible=(project.annotations||[]).filter(a=>opts.includeHidden||!a.hidden);
  const existing=visible.filter(a=>!compare||a.type!=='garden'&&!a.speciesId).sort((a,b)=>(a.id===selected)-(b.id===selected)).map(a=>marker(a,labels,a.id===selected,project.annotations.indexOf(a)+1,opts.labelMode)).join('');
  const future=visible.filter(a=>compare&&(a.type==='garden'||a.speciesId)).sort((a,b)=>(a.id===selected)-(b.id===selected)).map(a=>marker(a,labels,a.id===selected,project.annotations.indexOf(a)+1,opts.labelMode)).join('');
  const clipped=compare?`<defs><clipPath id="cfl-after"><rect x="0" y="0" width="${fraction*1000}" height="650"/></clipPath></defs><g clip-path="url(#cfl-after)">${future}</g><g pointer-events="none"><line x1="${fraction*1000}" y1="0" x2="${fraction*1000}" y2="650" stroke="#FFFFFF" stroke-width="7"/><line x1="${fraction*1000}" y1="0" x2="${fraction*1000}" y2="650" stroke="#0B2C23" stroke-width="2"/><rect x="${fraction*1000-68}" y="25" width="136" height="32" rx="16" fill="#0B2C23"/><text x="${fraction*1000}" y="47" text-anchor="middle" font-size="15" font-family="Arial" fill="#FFFFFF">◀  |  ▶</text></g>`:future;
  const topLabels=compare?`<g pointer-events="none" font-family="Arial,sans-serif" font-size="15" font-weight="700"><rect x="16" y="15" width="135" height="36" rx="18" fill="#102E28"/><text x="83" y="39" text-anchor="middle" fill="#FFFFFF">${esc(opts.afterText||'Depois')}</text><rect x="838" y="15" width="146" height="36" rx="18" fill="#102E28"/><text x="910" y="39" text-anchor="middle" fill="#FFFFFF">${esc(opts.beforeText||'Antes')}</text></g>`:'';
  const draft=opts.draft?.length?`<polyline points="${opts.draft.map(p=>`${p.x},${p.y}`).join(' ')}" fill="none" stroke="#0B241D" stroke-width="4" stroke-dasharray="8 5" pointer-events="none"/>${opts.draft.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="8" fill="#D9FA90" stroke="#0B241D" pointer-events="none"/>`).join('')}`:'';
  const playback=opts.playPaths?visible.filter(a=>a.kind==='path'&&a.points?.length>1).map(a=>`<circle r="8" fill="#84CAC8" stroke="#0B241D" pointer-events="none"><animateMotion dur="4s" repeatCount="indefinite" path="M${a.points.map(p=>`${a.x+(p.x-a.x)*(a.size||1)},${a.y+(p.y-a.y)*(a.size||1)}`).join(' L')}"/></circle>`).join(''):'';
  return `<svg id="workspace-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${opts.viewBox||'0 0 1000 650'}" role="img" aria-label="${esc(opts.svgLabel||'Espaço editável')}" preserveAspectRatio="xMidYMid meet"><rect width="1000" height="650" fill="#E9E8DF"/>${photo}${existing}${clipped}${topLabels}${draft}${playback}</svg>`;
 }
 function clampPoint(x,y){return {x:Math.round(clamp(x,20,980)),y:Math.round(clamp(y,20,630))};}
 function convertPointer(svg,event){const p=svg.createSVGPoint();p.x=event.clientX;p.y=event.clientY;const matrix=svg.getScreenCTM();if(!matrix)return {x:500,y:325};const q=p.matrixTransform(matrix.inverse());return clampPoint(q.x,q.y);}
 function fileToDataURL(file,max=1800){return new Promise((resolve,reject)=>{
  if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type))return reject(new Error('Use JPG, PNG ou WebP.'));
  if(file.size>15*1024*1024)return reject(new Error('A imagem deve ter no máximo 15 MB.'));
  const r=new FileReader();r.onerror=()=>reject(Error('Falha na leitura da foto.'));
  r.onload=()=>{const image=new Image();image.onerror=()=>reject(Error('Imagem não reconhecida.'));
   image.onload=()=>{const ratio=Math.min(1,max/Math.max(image.naturalWidth,image.naturalHeight)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(image.naturalWidth*ratio));c.height=Math.max(1,Math.round(image.naturalHeight*ratio));c.getContext('2d').drawImage(image,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',.86));};image.src=r.result;};r.readAsDataURL(file);
 });}
 function download(name,contents,type='application/json'){const b=new Blob([contents],{type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);}
 async function svgAsPng(svg,project,options){
  // Reconstruct without interactive text/fonts or pointer state, using the same SVG drawing.
  const raw=svgContent(project,{...options,includeHidden:true,selected:null,viewBox:'0 0 1000 650'}).replace('id="workspace-svg"','id="report-svg"');
  const data='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(raw),img=new Image();
  return new Promise((resolve,reject)=>{img.onload=()=>{try{const c=document.createElement('canvas');c.width=1400;c.height=910;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,1400,910);resolve(c.toDataURL('image/png'));}catch(e){reject(e)}};img.onerror=()=>reject(Error('Falha ao renderizar a ilustração.'));img.src=data;});
 }
 return {W,H,esc,clamp,svgContent,convertPointer,fileToDataURL,download,svgAsPng};
})();
