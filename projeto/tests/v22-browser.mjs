import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {site} from './v19-fixtures.mjs';
const base=process.env.V22_URL||'http://127.0.0.1:5176/',out=process.env.V22_OUT||'work/v22';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({...(base.startsWith('https:')&&process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY}}:{}),executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const errors=[],coverage=[],checks=[];
const newContext=async opts=>{const c=await browser.newContext({viewport:{width:1440,height:940},acceptDownloads:true,...opts});c.on('page',p=>{p.setDefaultTimeout(35000);p.on('pageerror',e=>errors.push(e.message))});return c};
let page;
try{
 // New session: original logo, parallel mount, timed removal, no repeat on reload.
 const intro=await newContext({reducedMotion:'no-preference',recordVideo:{dir:out+'/intro-video',size:{width:1440,height:940}}});await intro.addInitScript(()=>{let start=0;new MutationObserver(()=>{const shown=Boolean(document.querySelector('.brand-intro'));if(shown&&!start)start=performance.now();if(!shown&&start&&!window.__introDuration)window.__introDuration=performance.now()-start}).observe(document,{childList:true,subtree:true})});page=await intro.newPage();await page.goto(base,{waitUntil:'domcontentloaded'});
 const overlay=page.locator('.brand-intro');await expect(overlay).toBeVisible();
 await expect(page.locator('#app-content')).toHaveAttribute('inert','');
 assert((await overlay.locator('img').getAttribute('src')).endsWith('conflora-mark.png'));
 const start=Date.now();for(const [name,delay] of [['logo-01',0],['logo-02',280],['logo-03',280]]){await page.waitForTimeout(delay);await page.screenshot({path:out+'/'+name+'.png'})}
 await expect(overlay).toHaveCount(0);const duration=await page.evaluate(()=>window.__introDuration);assert(duration>0&&duration<6000,'Measured intro lifetime: '+duration);checks.push('intro lifetime '+Math.round(duration)+' ms');await expect(page.locator('#app-content')).not.toHaveAttribute('inert','');
 await page.screenshot({path:out+'/logo-04-home.png'});await page.reload();await expect(overlay).toHaveCount(0);checks.push('original logo, application mounts in parallel, automatic removal, once per session');await intro.close();
 for(const method of ['click','Escape','Enter',' ']){
  const c=await newContext({reducedMotion:'no-preference'});const p=await c.newPage();await p.goto(base,{waitUntil:'domcontentloaded'});const skip=p.getByRole('button',{name:'Pular apresentação'});await expect(skip).toBeFocused();if(method==='click')await skip.click();else await p.keyboard.press(method===' '?'Space':method);await expect(p.locator('.brand-intro')).toHaveCount(0);await expect(p.locator('#app-content')).not.toHaveAttribute('inert','');await c.close();
 }
 checks.push('skip with mouse, Escape, Enter and Space');
 const context=await newContext({reducedMotion:'reduce'});page=await context.newPage();await page.goto(base);await expect(page.locator('.brand-intro')).toHaveCount(0);
 const globe=page.locator('.globe-orbit');await expect(globe.locator('canvas')).toBeVisible();await expect(globe.locator('.globe-orbit__polaroid')).toHaveCount(16);await expect(globe.locator('.globe-orbit__fallback')).toHaveCount(0);
 const scene=globe.locator('.globe-orbit__scene');await scene.focus();await page.keyboard.press('ArrowRight');await expect.poll(()=>globe.getAttribute('data-rotation')).not.toBe(null);const rot=await globe.getAttribute('data-rotation');await page.keyboard.press('ArrowRight');await expect.poll(()=>globe.getAttribute('data-rotation')).not.toBe(rot);
 await globe.getByRole('button',{name:'Créditos',exact:true}).click();await expect(globe.locator('.globe-orbit__credits li')).toHaveCount(16);await globe.getByRole('button',{name:'Fechar créditos'}).click();checks.push('reduced motion, original COBE canvas, 16 records, keyboard rotation and 16 credits');
 const texts={pt:{plants:'Herbário',gallery:'Explorar',roots:'Chuva às raízes',journal:'Meu jardim',kit:'Meu kit',projects:'Projetos'},en:{plants:'Herbarium',gallery:'Explore',roots:'Rain to roots',journal:'My garden',kit:'My kit',projects:'Projects'}};
 const record=async(name,lang)=>{
  await page.waitForTimeout(150);const text=await page.locator('body').innerText();assert(!/Choose a Choose|\bundefined\b|\bNaN\b/.test(text),'Broken text on '+name+' '+lang);
  await writeFile(out+'/text-'+lang+'-'+name+'.txt',text);coverage.push({screen:name,language:lang,characters:text.length,reviewed:true});
 };
 const nav=async(label)=>page.locator('.desktop-navigation').getByRole('button',{name:label,exact:true}).click();
 for(const lang of ['pt','en']){
  await page.goto(base);if(lang==='en')await page.locator('button.lang').click();
  for(const width of [1440,1024,768,390,320]){await page.setViewportSize({width,height:940});await expect(page.locator('.globe-orbit__polaroid')).toHaveCount(16);assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,'Home overflow '+width);await page.screenshot({path:out+'/after-home-'+lang+'-'+width+'.png'})}
  await page.setViewportSize({width:1440,height:940});await record('home',lang);
  const p=site();p.journal=[{id:'review-journal-1',date:'2026-11-16',type:'rain',text:'Observação de teste / Test observation',photo:p.image,areaId:'pool1',speciesId:'commelina'}];p.kit.entries=[{id:'kit-review-1',date:Date.now(),text:'Conferência de teste / Test materials check',photo:null}];
  await page.locator('input[accept=".json,application/json"]').setInputFiles({name:'v22-review.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(p))});await expect(page.locator('.project-ribbon')).toBeVisible();await record('editor',lang);
  await page.locator('.studio-journey').getByRole('button',{name:lang==='pt'?'Informar condições':'Describe conditions'}).click();await record('conditions',lang);
  await page.locator('.studio-journey').getByRole('button',{name:lang==='pt'?'Consultar síntese do terreno':'Review site summary'}).click();await expect(page.locator('.v212-result')).toBeVisible();await record('results-and-plan',lang);
  for(const route of ['gallery','plants','roots','journal','kit']){
   await nav(texts[lang][route]);await expect(page.locator('main[role="status"]')).toHaveCount(0,{timeout:35000});await expect(page.locator('main')).toBeVisible();await record(route,lang);if(route==='gallery')await expect(page.locator('.morph-wrapper')).toHaveAttribute('data-status','ready',{timeout:35000});await page.screenshot({path:out+'/after-'+route+'-'+lang+'-1440.png'});
   if(route==='plants'){
    const rows=page.locator('.botanic-row');const n=await rows.count();for(let i=0;i<n;i++){await rows.nth(i).getByRole('button',{name:lang==='pt'?'Ler ficha e fontes':'Read record and sources',exact:true}).click();await expect(rows.nth(i).locator('.botanic-details')).toBeVisible();await writeFile(out+'/text-'+lang+'-species-'+i+'.txt',await rows.nth(i).innerText())}
    await record('species-records',lang);
   }
   if(route==='journal'){
    const card=page.locator('.journal-photo-atlas .masonry__card').first();await card.click();await expect(page.locator('.masonry-lightbox')).toBeVisible();await expect(page.locator('.masonry-lightbox__close')).toHaveAttribute('aria-label',lang==='pt'?'Fechar fotografia':'Close');await page.keyboard.press('Escape');
   }
  }
  await page.locator('.site-header .save').click();await expect(page.getByRole('status').first()).toContainText(lang==='pt'?'Projeto salvo':'Project saved');await record('saved-message',lang);
  await nav(texts[lang].projects);await expect(page.getByRole('dialog')).toBeVisible();await record('projects-dialog',lang);await page.keyboard.press('Escape');
  await page.locator('input[accept=".json,application/json"]').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{broken')});await expect(page.getByRole('status').first()).toContainText(lang==='pt'?'Não foi possível abrir o projeto':'The project could not be opened');await record('import-error',lang);
 }
 await page.setViewportSize({width:390,height:844});await page.locator('.sm-toggle').click();await expect(page.locator('.sm-toggle')).toHaveAttribute('aria-label','Close menu');await page.screenshot({path:out+'/menu-en-390.png'});await page.keyboard.press('Escape');await expect(page.locator('.staggered-menu-panel')).toHaveAttribute('inert','');

 const retina=await newContext({viewport:{width:390,height:844},deviceScaleFactor:2,reducedMotion:'no-preference'});const r=await retina.newPage();await r.goto(base,{waitUntil:'domcontentloaded'});await expect(r.locator('.brand-intro')).toHaveCount(0,{timeout:10000});const orbit=r.locator('.globe-orbit');await expect(orbit.locator('canvas')).toBeVisible();
 await expect.poll(()=>orbit.getAttribute('data-rotation')).not.toBe(null);const geometry=await orbit.locator('canvas').evaluate(el=>({css:el.getBoundingClientRect().width,backing:el.width}));assert(geometry.backing<=Math.ceil(geometry.css*1.25)+1,'Pixel ratio must be applied once: '+JSON.stringify(geometry));
 const rotating=await orbit.getAttribute('data-rotation');await expect.poll(()=>orbit.getAttribute('data-rotation')).not.toBe(rotating);await orbit.getByRole('button',{name:'Pausar',exact:true}).click();await r.waitForTimeout(200);const stopped=await orbit.getAttribute('data-rotation');await r.waitForTimeout(400);assert.equal(await orbit.getAttribute('data-rotation'),stopped);
 const box=await orbit.locator('canvas').boundingBox();await r.mouse.move(box.x+box.width/2,box.y+box.height/2);await r.mouse.down();await r.mouse.move(box.x+box.width/2+45,box.y+box.height/2+10,{steps:4});await r.mouse.up();await expect.poll(()=>orbit.getAttribute('data-rotation')).not.toBe(stopped);checks.push('retina canvas scale applied once, real autoplay, pause and pointer drag');await retina.close();
 checks.push('all primary modules PT/EN, localized original component labels, projects, import error, mobile menu');
 assert.deepEqual(errors,[]);await writeFile(out+'/editorial-runtime-coverage.json',JSON.stringify(coverage,null,2));await writeFile(out+'/validation.json',JSON.stringify({passed:true,base,checks,errors,viewports:[320,390,768,1024,1440],runtimeScreens:coverage},null,2));console.log('PASS V22 browser: '+coverage.length+' screen/language records');
 await context.close();
}catch(e){if(page)await page.screenshot({path:out+'/failure.png'}).catch(()=>{});throw e}finally{await browser.close()}
