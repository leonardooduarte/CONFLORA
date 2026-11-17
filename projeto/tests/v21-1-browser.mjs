import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {site} from './v19-fixtures.mjs';
const out='work/v21-1',base='http://127.0.0.1:5176/';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:940},reducedMotion:'reduce'});
page.setDefaultTimeout(30000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
async function fixture(p){
 await page.goto(base);
 await page.locator('input[accept=".json,application/json"]').setInputFiles({name:'v21-1.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(p))});
 await expect(page.locator('.project-ribbon')).toContainText(p.name);
}
try{
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:940});
  await page.goto(base);
  await expect(page.locator('.globe-orbit__scene canvas')).toBeVisible();
  await expect(page.locator('.globe-orbit__polaroid')).toHaveCount(16);
  const tiles=page.locator('.kinetic-tile');
  await expect(tiles).toHaveCount(9);
  const urls=await tiles.locator('img').evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
  assert.equal(new Set(urls).size,9,'Nine unique botanical photographs');
  assert(urls.every(x=>x.includes('/botanical/')),'No reused conceptual gallery images');
  await expect(page.locator('.kinetic-tile__credit')).toHaveCount(9);
  assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,'Home horizontal overflow '+width);
  await page.screenshot({path:out+'/home-'+width+'.png'});
  if(width===1440){await tiles.nth(0).scrollIntoViewIfNeeded();await page.screenshot({path:out+'/gallery-1440.png'});}
 }
 await page.setViewportSize({width:1440,height:940});
 await page.locator('.site-header').getByRole('button',{name:'Explorar',exact:true}).click();
 await expect(page.locator('.solution-accordion')).toBeVisible();
 await expect(page.locator('.morph-wrapper')).toBeVisible();
 await page.locator('.solution-accordion').scrollIntoViewIfNeeded();
 await page.screenshot({path:out+'/solutions-1440.png'});
 await page.locator('.site-header').getByRole('button',{name:'Herbário',exact:true}).click();
 await expect(page.locator('.botanical-atlas')).toBeVisible();
 await page.locator('.botanical-atlas').scrollIntoViewIfNeeded();
 await page.screenshot({path:out+'/herbarium-1440.png'});
 await fixture(site());
 await expect(page.locator('.studio-journey-steps>div')).toHaveCount(4);
 await expect(page.locator('.drawing-area .label-toggle')).toBeVisible();
 await page.locator('.studio-journey').scrollIntoViewIfNeeded();
 await page.screenshot({path:out+'/editor-1440.png'});
 await page.locator('.studio-journey').getByRole('button',{name:'Consultar síntese do terreno'}).click();
 const v21=page.locator('.plan-extras .v21-botanical');
 await expect(v21).toBeVisible();
 await expect(v21.locator('.v21-botanical__area')).toHaveCount(3);
 assert.deepEqual(await v21.locator('.v21-botanical__number').allTextContents(),['01','02','03']);
 await expect(v21.locator('.v21-botanical__shared')).toHaveCount(2);
 await expect(v21.locator('.v21-botanical__card')).toHaveCount(4);
 await expect(v21).toContainText('Literatura relevante, sem validação de plantio');
 await v21.scrollIntoViewIfNeeded();
 await page.screenshot({path:out+'/itapeva-1440.png'});
 await v21.locator('.v21-botanical__area').nth(1).locator(':scope > summary').click();
 await expect(v21.locator('.v21-botanical__area').nth(1).locator('.v21-botanical__shared')).toBeVisible();
 for(const width of [1024,768,390,320]){
  await page.setViewportSize({width,height:900});
  await v21.scrollIntoViewIfNeeded();
  assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,'Plan overflow '+width);
  await page.screenshot({path:out+'/itapeva-'+width+'.png'});
 }
 await page.setViewportSize({width:1440,height:940});
 await page.locator('.site-header').getByRole('button',{name:'Switch language'}).click();
 await expect(v21).toContainText('AT A GLANCE');
 await expect(v21).toContainText('Relevant literature, without planting validation');
 await page.locator('.site-header').getByRole('button',{name:'Switch language'}).click();
 const iowa=site('IA');
 iowa.annotations[1].conditions={sun:'shade',moisture:'wet'};
 await fixture(iowa);
 await page.locator('.studio-journey').getByRole('button',{name:'Consultar síntese do terreno'}).click();
 const ia=page.locator('.plan-extras .v21-botanical');
 await expect(ia).toBeVisible();
 await expect(ia).toContainText('Correspondências para investigar');
 await expect(ia.locator('.v21-botanical__area')).toHaveCount(3);
 await expect(ia.locator('.v21-botanical__shared')).toHaveCount(1);
 await ia.scrollIntoViewIfNeeded();
 await page.screenshot({path:out+'/iowa-1440.png'});
 assert.deepEqual(errors,[]);
 const perf=await page.evaluate(()=>{const nav=performance.getEntriesByType('navigation')[0];return nav?{domContentLoadedMs:Math.round(nav.domContentLoadedEventEnd),loadEventMs:Math.round(nav.loadEventEnd)}:null;});
 await writeFile(out+'/validation.json',JSON.stringify({passed:true,checks:['COBE globe and 16 Polaroids','nine unique credited botanical gallery photos','solutions and herbarium navigation','editor controls','Itapeva duplicate evidence reduced, all area rows preserved','contiguous display numbers','different Iowa area retains separate results','PT/EN','responsive 1440/1024/768/390/320','no page errors'],labNavigationOnly:perf,errors},null,2));
 console.log('PASS V21.1 browser');
}catch(e){await page.screenshot({path:out+'/failure.png'}).catch(()=>{});throw e}
finally{await browser.close();}
