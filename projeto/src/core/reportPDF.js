import {buildV20Insight} from './v20Insight.js';
import {reviewBotanicalV21} from './v21Botanical.js';
import {presentV211Regions} from './v21Presentation.js';
import {jsPDF} from 'jspdf';
import {plants,asset,references,say,labels} from './knowledge.js';
import {buildV19Proposal,sourceBibliography,scenarioMode,exploratoryNotice,scenarioEvidenceCurrent} from './v19Proposal.js';
import {dataImage,proposalPNG} from './proposalImage.js';
const fonts={regular:new URL('../assets/fonts/font-0.ttf',import.meta.url).href,bold:new URL('../assets/fonts/font-3.ttf',import.meta.url).href,italic:new URL('../assets/fonts/font-4.ttf',import.meta.url).href};
const imageCache=new Map();
async function raster(url){if(!imageCache.has(url))imageCache.set(url,(async()=>{const src=await dataImage(url),i=new Image();await new Promise((res,rej)=>{i.onload=res;i.onerror=rej;i.src=src});const c=document.createElement('canvas');const ratio=Math.min(1,1400/Math.max(i.width,i.height));c.width=Math.round(i.width*ratio);c.height=Math.round(i.height*ratio);const ctx=c.getContext('2d');ctx.fillStyle='#f5f2e8';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(i,0,0,c.width,c.height);return {data:c.toDataURL('image/jpeg',.9),width:c.width,height:c.height};})().catch(e=>{imageCache.delete(url);throw e}));return imageCache.get(url)}
/** Locally generated, selectable text, embedded fonts, no browser URL/header/footer. */
export async function createV19PDF(project,lang='pt',reportImage){
 const pt=lang==='pt',plan=buildV19Proposal(project,lang),doc=new jsPDF({unit:'mm',format:'a4',compress:true});
 for(const [style,url]of Object.entries(fonts)){const base64=(await dataImage(url)).split(',')[1];doc.addFileToVFS(style+'.ttf',base64);doc.addFont(style+'.ttf',style==='italic'?'Instrument':'DM',style==='regular'?'normal':style);}
 const M=15,W=180,BOTTOM=278;let y=17;
 doc.setProperties({title:'CONFLORA V22 — '+project.name,subject:pt?'Estudo preliminar do terreno':'Preliminary site study',author:'CONFLORA · BRaVE 2026',creator:'CONFLORA V22'});
 const font=(size=10,style='normal')=>{doc.setFont(style==='italic'?'Instrument':'DM',style);doc.setFontSize(size);doc.setTextColor('#173c30')};
 const ensure=h=>{if(y+h>BOTTOM){doc.addPage();y=18;}};
 const lines=(text,width=W,size=10,style='normal')=>{font(size,style);return doc.splitTextToSize(String(text||''),width)};
 const text=(value,size=10,style='normal',gap=2)=>{const a=lines(value,W,size,style),lh=size*.43;for(const line of a){ensure(lh+1);font(size,style);doc.text(line,M,y);y+=lh;}y+=gap;};
 const heading=value=>{ensure(22);y+=3;text(value,17,'bold',4)};
 const photo=async(url,label,height=61)=>{if(!url)return;const r=await raster(url);ensure(height+13);font(9,'bold');doc.text(label,M,y);y+=5;const w=Math.min(W,height*r.width/r.height),h=Math.min(height,W*r.height/r.width);doc.addImage(r.data,'JPEG',M+(W-w)/2,y,w,h);y+=h+4;};
 const logo=await raster(asset('conflora-mark.png'));doc.addImage(logo.data,'JPEG',M,y-6,10,10);font(19,'bold');doc.text('CONFLORA',M+14,y+1);y+=12;
 text('V22 · '+(pt?'DA ANÁLISE À PROPOSTA VISUAL':'FROM OBSERVATION TO VISUAL PROPOSAL'),9,'bold');
 text(project.name||'CONFLORA',23,'italic',3);text([project.context.region,project.context.regionCode,project.context.area?project.context.area+' m²':'',new Date().toLocaleDateString(pt?'pt-BR':'en-US')].filter(Boolean).join(' · '),10);
 await photo(project.image,pt?'Fotografia original preservada':'Preserved original photograph');
 heading(pt?'Condições e observações':'Conditions and observations');
 const conditions=[({slow:pt?'Drenagem aparentemente lenta':'Apparently slow drainage',medium:pt?'Drenagem intermediária declarada':'Reported moderate drainage',fast:pt?'Drenagem aparentemente rápida':'Apparently fast drainage'})[project.context.soil],labels[lang][project.context.sun],labels[lang][project.context.moisture],({hours:pt?'Algumas horas':'A few hours',day:pt?'Até um dia':'Up to a day',persistent:pt?'Mais de um dia':'Over one day'})[project.context.duration],({away:pt?'Distante de construções':'Away from structures',near:pt?'Próximo de construções':'Near structures'})[project.context.building]].filter(v=>v&&v!=='unknown');text(conditions.join(' · '));
 const obs=project.annotations.filter(m=>!m.speciesId&&m.type!=='garden');const counts={};for(const m of obs)counts[m.type]=(counts[m.type]||0)+1;
 const typeNames=pt?{pool:'pontos de acúmulo',roof:'saídas de telhado',paved:'superfícies pavimentadas',space:'áreas livres',plants:'observações vegetais'}:{pool:'pooling points',roof:'roof outlets',paved:'paved surfaces',space:'open areas',plants:'vegetation observations'};
 text(Object.entries(counts).map(([k,n])=>(typeNames[k]||k)+': '+n).join(' · '),10);if(project.context.notes)text(project.context.notes,10);
 if(reportImage)await photo(reportImage,pt?'Observações numeradas na fotografia':'Numbered observations in the photo',55);
 const insight=buildV20Insight(project,lang);
 heading(pt?'O que já sabemos sobre seu espaço':'What we know about your space');
 text(insight.observed.join(' · ')|| (pt?'Ainda sem marcações.':'No marks recorded yet.'),10);
 if(insight.details.length)text(insight.details.join(' · '),9);
 for(const item of insight.interpretations.slice(0,4))text('• '+item,9);
 text((pt?'Estado da evidência botânica: ':'Botanical evidence status: ')+insight.evidenceLabel,10,'bold');
 heading(pt?'O que verificar agora':'What to check next');
 for(const step of insight.steps.slice(0,5)){
  text(step.label,10,'bold');
  text(step.why+' '+step.how,9);
 }
 text(pt?'A análise considera observações declaradas, não medição, inferência da fotografia ou previsão hidráulica.':'This review uses reported observations, not measurement, automatic image analysis or hydraulic performance predictions.',8);

 const v21=reviewBotanicalV21(project,lang);
 heading(pt?'Evidências botânicas para este terreno':'Botanical evidence for this site');
 text(v21.explanation,9);
 for(const r of presentV211Regions(v21.regions)){
  text((r.number===null?(pt?'Terreno inteiro':'Whole site'):(pt?'Área ':'Area ')+String(r.displayNumber).padStart(2,'0'))+': '+r.message,11,'bold');
  text(r.conditions.filter(c=>c.value!=='unknown').map(c=>c.label+': '+c.display+' ('+c.origin+')').join(' · ')|| (pt?'Condições insuficientes.':'Insufficient conditions.'),8);
  if(r.duplicateOf){text((pt?'Mesmas evidências documentais da área ':'Same documentary evidence as area ')+String(r.duplicateOf.displayNumber).padStart(2,'0')+'.',9);continue;}
  for(const match of r.investigate.slice(0,3)){
   text('• '+match.plant.scientific+' — '+(pt?'correspondência documental':'documentary match'),9,'bold');
   text(match.agree.map(a=>a.field+(a.source?' — '+a.source:'')).join('; '),8);
   text(match.caution,8);
   for(const src of match.citations.slice(0,2))text(src.title+' — '+src.url,7);
  }
  for(const item of r.research.slice(0,3)){
   text('• '+item.plant.scientific+' — '+(pt?'somente pesquisa':'research only'),9,'bold');
   if(item.literature)text(item.literature.claim,8);
   for(const src of item.citations.slice(0,2))text(src.title+' — '+src.url,7);
  }
  if(r.needs.length)text((pt?'Verificar: ':'Verify: ')+r.needs.join(' '),8);
 }

 heading(pt?'Análise ambiental preliminar':'Preliminary environmental review');
 for(const a of plan.groups){
  ensure(34);text((a.areaNumbers[0]===null?(pt?'Terreno':'Site'):(pt?'Áreas ':'Areas ')+a.areaNumbers.map(n=>String(n).padStart(2,'0')).join(', '))+' · '+a.category,11,'bold');
  text([...a.review.observations,...a.review.warnings].join(' '),10);
  if(a.mark.notes)text(a.mark.notes,10);
  for(const o of a.review.options)text(o.title+': '+o.detail,9);
  text((pt?'Verificar: ':'Verify: ')+a.review.checks.join(' '),9);
 }
 const bibliography=sourceBibliography(project,plan);
 if(plan.cards.length){
  const cw=57,gap=4.5;
  const cardHeight=c=>64+lines(c.plant.scientific,cw-5,13,'italic').length*5.6+lines(say(c.plant.common,lang),cw-5,9).length*3.9+lines(c.reason,cw-5,9).length*3.9+lines(c.plant.image.author+' · '+c.plant.image.license,cw-5,8).length*3.5;
  ensure(31+Math.max(...plan.cards.slice(0,3).map(cardHeight)));
  heading(pt?'Quadro botânico':'Botanical records');
  text(pt?'Correspondência documental e pesquisa são categorias diferentes; fotografias não validam o plantio.':'Documented matches and research are different categories; photos do not validate planting.',9);
  for(let start=0;start<plan.cards.length;start+=3){
   const row=plan.cards.slice(start,start+3);const prepared=await Promise.all(row.map(async x=>({x,img:await raster(asset('botanical/'+x.plant.image.file)),body:lines(x.reason,cw-5,9),name:lines(x.plant.scientific,cw-5,13,'italic'),common:lines(say(x.plant.common,lang),cw-5,9),credit:lines(x.plant.image.author+' · '+x.plant.image.license,cw-5,8)})));
   const height=Math.max(...prepared.map(c=>64+c.name.length*5.6+c.common.length*3.9+c.body.length*3.9+c.credit.length*3.5));ensure(height+3);const top=y;
   prepared.forEach(({x,img,body,name,common,credit},i)=>{const xx=M+(W-(prepared.length*cw+(prepared.length-1)*gap))/2+i*(cw+gap),pad=xx+2.5;doc.setDrawColor('#cbd3c7');doc.rect(xx,top,cw,height);const iw=Math.min(cw,26*img.width/img.height),ih=Math.min(26,cw*img.height/img.width);doc.addImage(img.data,'JPEG',xx+(cw-iw)/2,top,iw,ih);let yy=top+30;
    const block=(arr,size,style)=>{font(size,style);doc.text(arr,pad,yy,{lineHeightFactor:1.18});yy+=arr.length*size*.43+2};
    block([x.status==='candidate'?(pt?'Correspondência documental':'Documented match'):(pt?'Somente pesquisa':'Research only')],8,'bold');block(name,13,'italic');block(common,9,'normal');block(body,9,'normal');block([(pt?'Áreas: ':'Areas: ')+x.areas.join(', ')],8,'normal');block(credit,8,'normal');font(8);doc.textWithLink('['+(bibliography.indexOf(x.plant.sourceIds[0])+1)+'] '+(pt?'Fonte científica':'Scientific source'),pad,yy,{url:x.source.url});});y=top+height+5;
  }
 }
 if(plan.unpictured?.length)text((pt?'Registros sem fotografia verificada, fora da composição: ':'Records without verified photos, omitted from composition: ')+plan.unpictured.map(c=>c.plant.scientific).join('; '),9);
 const slots=['A','B'].filter(s=>project.scenarios?.[s]?.markers?.length);
 if(slots.length){heading(pt?'Como o espaço poderia ficar':'How the space might look');for(const slot of slots){
  const mode=scenarioMode(project.scenarios[slot]);await photo(await proposalPNG(project,slot,lang),(mode==='exploratory'?(pt?'Estudo exploratório ':'Exploratory study '):(scenarioEvidenceCurrent(project,slot)?(pt?'Proposta botânica documental ':'Documented botanical proposal '):(pt?'Composição salva · reavaliar ':'Saved composition · reassess ')))+slot,70);
  if(mode==='botanical'&&!scenarioEvidenceCurrent(project,slot))text(pt?'As condições atuais não sustentam a correspondência da composição salva. Reavalie as evidências.':'Current conditions do not support the saved matches. Reassess the evidence.',10);
  text(mode==='exploratory'?exploratoryNotice[lang]:(pt?'Fotocolagem com imagens de referência. Escala e perspectiva são ilustrativas; não há previsão de crescimento.':'A collage of botanical reference photos. Scale and perspective are illustrative; growth is not predicted.'),9);
  text(project.scenarios[slot].markers.map((m,i)=>(i+1)+'. '+(plants.find(p=>p.id===m.speciesId)?.scientific||m.notes)).join(' · '),9);
 }}
 heading(pt?'Próximos passos para este terreno':'Next steps for this site');
 const checks=[...new Set(plan.regions.flatMap(a=>a.review.checks))];for(const c of checks)text('• '+c,10);text(plan.caveats,9);
 heading(pt?'Referências e créditos':'References and credits');
 const ids=[...new Set([...sourceBibliography(project,plan),...v21.regions.flatMap(r=>[...r.investigate,...r.research].flatMap(x=>x.citations.map(s=>s.id)))])];for(const [i,id]of ids.entries()){const r=references[id];text('['+(i+1)+'] '+r.title,9,'bold');text(say(r.scope,lang),9);text(r.url,8);}
 for(const c of plan.cards){const p=c.plant;text(p.scientific+' · '+(pt?'Taxonomia: ':'Taxonomy: ')+p.taxonomyUrl,8);text((pt?'Fotografia: ':'Photograph: ')+p.image.author+' · '+p.image.license+' · '+p.image.source,8);}
 const total=doc.getNumberOfPages();for(let n=1;n<=total;n++){doc.setPage(n);font(8);doc.text('CONFLORA V22 · '+(pt?'Estudo preliminar':'Preliminary study'),M,288);doc.text(n+' / '+total,195,288,{align:'right'});}
 return doc;
}
export async function downloadV19PDF(project,lang,reportImage){const doc=await createV19PDF(project,lang,reportImage);doc.save('conflora-v22-'+project.id.replace(/[^a-z0-9_-]/gi,'')+'.pdf');}
