import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';

const out='work/globe-fidelity';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:940},deviceScaleFactor:1,recordVideo:{dir:out,size:{width:960,height:626}}});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const cards=()=>page.locator('.globe-orbit__polaroid');
async function visible(){
 return cards().evaluateAll(els=>els.filter(el=>{
  const s=getComputedStyle(el),rect=el.getBoundingClientRect();
  return Number(s.opacity)>.45&&s.visibility!=='hidden'&&rect.width>35&&rect.height>45
 }).map(el=>({id:el.dataset.polaroidId,x:Math.round(el.getBoundingClientRect().x),y:Math.round(el.getBoundingClientRect().y)})));
}
try{
 await page.goto('http://127.0.0.1:5176/',{waitUntil:'domcontentloaded'});
 const opening=page.locator('.premium-opening');
 await expect(opening.locator('h1')).toContainText('Todo lugar');
 await expect(opening.getByRole('button',{name:'Analisar meu terreno'})).toBeVisible();
 await expect(opening.getByRole('button',{name:'Explorar o Herbário'})).toBeVisible();
 await expect(opening.locator('.opening-portrait>img')).toHaveCount(0);
 const stage=opening.locator('.globe-orbit');
 await expect(stage).toBeVisible();
 await expect(stage).toHaveAttribute('data-gallery-total','16');
 await expect(cards()).toHaveCount(16);
 assert(await stage.locator('.globe-orbit__canvas').isVisible());
 const media=await cards().evaluateAll(async els=>{const imgs=els.map(e=>e.querySelector('img'));await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));return imgs.map(img=>({src:img.getAttribute('src'),width:img.naturalWidth,ready:img.complete}))});
 assert(media.every(x=>x.ready&&x.width>=200),'All 16 plant photos must load: '+JSON.stringify(media.filter(x=>!x.ready||x.width<200)));
 assert.equal(new Set(media.map(x=>x.src)).size,16,'Photos must not be duplicated');
 assert(await stage.evaluate(()=>CSS.supports('position-anchor: --cobe-demo')),'Must use real COBE position anchors');
 const canvasBox=await stage.locator('.globe-orbit__canvas').boundingBox();
 assert(canvasBox.width>=370,'Globe must be prominent');
 const moments=[],seen=new Set();
 for(let i=0;i<6;i++){
  await page.waitForTimeout(i===0?900:4400);
  const images=await visible();
  images.forEach(x=>seen.add(x.id));
  moments.push({t:i,visible:images.length,ids:images.map(x=>x.id)});
  await page.screenshot({path:out+'/desktop-'+i+'.jpg',type:'jpeg',quality:83});
 }
 assert(moments.filter(x=>x.visible>=3).length>=3,'Polaroid cluster must be visible across the globe rotation: '+JSON.stringify(moments));
 assert(moments.every(x=>x.visible<=8),'Limit overlap without reducing to two pictures: '+JSON.stringify(moments));
 // Interaction should uncover additional world photographs.
 for(const [i,dx] of [360,-440,385,-420].entries()){
  const box=await stage.locator('.globe-orbit__canvas').boundingBox();
  const x=box.x+box.width/2,y=box.y+box.height/2;
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+dx,y,{steps:14});await page.mouse.up();
  await page.waitForTimeout(400);
  const images=await visible();images.forEach(p=>seen.add(p.id));
  await page.screenshot({path:out+'/drag-'+i+'.jpg',type:'jpeg',quality:80});
 }
 assert(seen.size>=7,'Rotation/drag should reveal at least 7 distinct photos; observed '+JSON.stringify([...seen]));
 const props=await cards().first().evaluate(el=>({anchor:getComputedStyle(el).positionAnchor,display:getComputedStyle(el).display}));
 assert(props.anchor.startsWith('--cobe-'),'Polaroids must be anchored to COBE markers');
 await stage.getByRole('button',{name:'Pausar'}).click();
 await expect(stage.getByRole('button',{name:'Continuar'})).toHaveAttribute('aria-pressed','true');
 await stage.getByRole('button',{name:'Continuar'}).click();
 await stage.getByRole('button',{name:'Créditos'}).click();
 await expect(stage.locator('.globe-orbit__credits li')).toHaveCount(16);
 await stage.getByRole('button',{name:'Fechar créditos'}).click();
 await page.locator('.site-header .lang').click();
 await expect(stage).toContainText('FLORA AROUND THE WORLD');
 await page.locator('.site-header .lang').click();
 for(const width of [390,360,320]){
  await page.setViewportSize({width,height:840});
  await page.waitForTimeout(650);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert(overflow<=width+1,'Horizontal overflow at '+width+': '+overflow);
  const v=await visible();
  assert(v.length<=5,'Avoid mobile crowding: '+width+' '+v.length);
  await page.screenshot({path:out+'/mobile-'+width+'.jpg',type:'jpeg',quality:82});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(stage.locator('.globe-orbit__canvas')).toBeVisible();
 assert.deepEqual(errors,[],'No page errors');
 const result={passed:true,photos:media.length,distinctSeen:seen.size,moments,errors};
 await writeFile(out+'/results.json',JSON.stringify(result,null,2));
 console.log('PASS globe video fidelity '+JSON.stringify(result));
}catch(e){
 await page.screenshot({path:out+'/failure.jpg',type:'jpeg',quality:86}).catch(()=>{});
 throw e;
}finally{await context.close();await browser.close()}
