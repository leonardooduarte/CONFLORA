import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';

const out='work/globe-orbit-review';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:940},deviceScaleFactor:1,recordVideo:{dir:out,size:{width:960,height:626}}});
const page=await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const getVisible=async()=>page.locator('.globe-orbit__polaroid').evaluateAll(els=>els.filter(el=>{
 const o=parseFloat(getComputedStyle(el).opacity);
 const b=el.getBoundingClientRect();
 return o>.55 && b.width>30 && b.height>45
}).map(x=>({id:x.dataset.polaroidId,opacity:getComputedStyle(x).opacity,x:Math.round(x.getBoundingClientRect().left),y:Math.round(x.getBoundingClientRect().top)})));
async function imageReady(){
 return page.locator('.globe-orbit__photo img').evaluateAll(async els=>{
  for(const e of els){e.loading='eager';await e.decode().catch(()=>{})}
  return els.map(e=>({src:e.getAttribute('src'),ok:e.complete&&e.naturalWidth>=200,w:e.naturalWidth,h:e.naturalHeight}));
 })
}
try{
 await page.goto('http://127.0.0.1:5176/',{waitUntil:'domcontentloaded'});
 const hero=page.locator('.premium-opening');
 await expect(hero).toBeVisible();
 await expect(hero.locator('h1')).toContainText('Todo lugar');
 await expect(hero.locator('h1')).toContainText('pode ganhar');
 await expect(hero.getByRole('button',{name:'Analisar meu terreno'})).toBeVisible();
 await expect(hero.getByRole('button',{name:'Explorar o Herbário'})).toBeVisible();
 await expect(hero.locator('.opening-small')).toContainText('Enviar fotografia');
 await expect(hero.locator('.opening-portrait>img')).toHaveCount(0);
 const stage=hero.locator('.globe-orbit');
 await expect(stage).toBeVisible();
 await expect(stage).toHaveAttribute('data-gallery-total','16');
 await expect(stage.locator('.globe-orbit__polaroid')).toHaveCount(16);
 await expect(stage.locator('.globe-orbit__canvas')).toBeVisible();
 const assets=await imageReady();
 assert.equal(assets.filter(x=>x.ok).length,16,'All 16 botanical Polaroid photographs must decode correctly: '+JSON.stringify(assets.filter(x=>!x.ok)));
 const sameMedia=await stage.locator('.globe-orbit__polaroid').evaluateAll(els=>new Set(els.map(e=>e.querySelector('img')?.getAttribute('src'))).size);
 assert.equal(sameMedia,16,'All photographs must be distinct source images');
 await page.waitForTimeout(1700);
 const rootInfo=await stage.evaluate(el=>({webgl:!!el.querySelector('canvas'),anchorSupport:CSS.supports('position-anchor: --cobe-test'),count:el.dataset.visibleCount}));
 assert(rootInfo.anchorSupport,'Browser must exercise native marker anchors');
 const moments=[],seen=new Set();
 for(const [idx,delay] of [250,4900,4900,4900,4900,4900].entries()){
  await page.waitForTimeout(delay);
  const v=await getVisible();
  for(const x of v)seen.add(x.id);
  moments.push({t:idx,visible:v.length,ids:v.map(x=>x.id),coords:v});
  await page.screenshot({path:out+'/desktop-'+idx+'.jpg',type:'jpeg',quality:78,fullPage:false});
 }
 const diag=await stage.evaluate(el=>({phi:el.dataset.phi,candidates:el.dataset.candidates,visibleCount:el.dataset.visibleCount,visibleIds:el.dataset.visibleIds,styles:[...el.querySelectorAll('.globe-orbit__polaroid')].slice(0,8).map(e=>({id:e.dataset.polaroidId,opacity:getComputedStyle(e).opacity,inlineOpacity:e.style.opacity,anchor:getComputedStyle(e).positionAnchor,custom:getComputedStyle(document.documentElement).getPropertyValue('--cobe-visible-'+e.dataset.polaroidId)}))}));
 console.log('GLOBE_DIAGNOSTICS '+JSON.stringify(diag));
 assert(moments.some(x=>x.visible>=3),'At least three Polaroids should accompany the rotating globe: '+JSON.stringify(moments));
 assert(moments.every(x=>x.visible<=8),'Decluttering should keep the composition legible: '+JSON.stringify(moments));
 // An interactive half-turn must reveal other documented world photographs.
 const globeBox=await stage.locator('.globe-orbit__canvas').boundingBox();
 for(const [idx,dx] of [300,-440,395].entries()){
  const cx=globeBox.x+globeBox.width/2, cy=globeBox.y+globeBox.height/2;
  await page.mouse.move(cx,cy);
  await page.mouse.down();
  await page.mouse.move(cx+dx,cy,{steps:14});
  await page.mouse.up();
  await page.waitForTimeout(700);
  const newlyVisible=await getVisible();
  for(const item of newlyVisible)seen.add(item.id);
  await page.screenshot({path:out+'/drag-'+idx+'.jpg',type:'jpeg',quality:78,fullPage:false});
 }
 assert(seen.size>=7,'Rotation plus drag must reveal seven distinct botanical images: '+JSON.stringify({seen:[...seen],moments}));
 const anchored=await stage.locator('.globe-orbit__polaroid').first().evaluate(el=>getComputedStyle(el).positionAnchor);
 assert(anchored?.startsWith('--cobe-'),'Polaroids must be anchored to globe locations');
 const before=await stage.locator('.globe-orbit__canvas').boundingBox();
 assert(before&&before.width>=380,'Globe must occupy a substantial area on desktop');
 await stage.getByRole('button',{name:/Pausar/}).click();
 await expect(stage.getByRole('button',{name:/Reproduzir/})).toHaveAttribute('aria-pressed','true');
 await stage.getByRole('button',{name:/Reproduzir/}).click();
 await stage.getByRole('button',{name:/Créditos/}).click();
 await expect(stage.locator('.globe-orbit__credits li')).toHaveCount(16);
 await expect(stage.locator('.globe-orbit__credits')).toContainText('não um catálogo de recomendações');
 await stage.getByRole('button',{name:'Fechar créditos'}).click();
 await page.locator('.site-header .lang').click();
 await expect(stage).toContainText('LIVING ATLAS');
 await expect(stage).toContainText('Discover flora across the planet');
 await page.locator('.site-header .lang').click();
 for(const width of [390,360,320]){
  await page.setViewportSize({width,height:840});
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(550);
  const sw=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert(sw<=width+1,'Unexpected horizontal overflow at '+width+': '+sw);
  await expect(stage.locator('.globe-orbit__polaroid')).toHaveCount(16);
  const v=await getVisible();
  await page.screenshot({path:out+'/mobile-'+width+'.jpg',type:'jpeg',quality:76,fullPage:false});
  assert(v.length<=5,'Too many Polaroids on narrow screens '+width+': '+v.length);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(stage.locator('.globe-orbit__canvas')).toBeVisible();
 assert.equal(errors.length,0,'No runtime JS errors: '+JSON.stringify(errors));
 await writeFile(out+'/results.json',JSON.stringify({passed:true,assets:assets.length,uniquePhotographs:sameMedia,seen:seen.size,moments,errors},null,2));
 console.log('PASS orbiting botanical Polaroids — photo diversity, geographic anchoring, active rotation, license credits, desktop and mobile');
 console.log('ORBIT_MOMENTS '+JSON.stringify(moments));
}catch(error){
 await page.screenshot({path:out+'/failure.jpg',type:'jpeg',quality:80,fullPage:false}).catch(()=>{});
 console.error('ORBIT_FAILURE',error);throw error;
}finally{await context.close();await browser.close()}
