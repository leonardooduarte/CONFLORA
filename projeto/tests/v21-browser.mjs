import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {site} from './v19-fixtures.mjs';

const base='http://127.0.0.1:5176/',out='work/v21';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:920},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const importFixture=async p=>{
 await page.goto(base);
 await page.locator('input[accept=".json,application/json"]').setInputFiles({name:'v21-test.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(p))});
 await expect(page.locator('.project-ribbon')).toContainText(p.name);
};
try{
 await page.goto(base);
 // The original COBE globe, synchronised photographic markers and controls must survive.
 await expect(page.locator('.globe-orbit__scene canvas')).toBeVisible();
 await expect(page.locator('.globe-orbit__polaroid')).toHaveCount(16);
 await expect(page.locator('.globe-orbit__footer button').first()).toBeVisible();
 await page.locator('.globe-orbit__footer button').first().click();
 await expect(page.locator('.globe-orbit__footer button').first()).toHaveAttribute('aria-pressed','true');
 await page.screenshot({path:out+'/globe-1440.png'});
 await importFixture(site());
 const journey=page.locator('.studio-journey');
 await expect(journey).toBeVisible();
 await journey.getByRole('button',{name:'Consultar síntese do terreno'}).click();
 const v21=page.locator('.plan-extras .v21-botanical');
 await expect(v21).toBeVisible();
 await expect(v21).toContainText('O que a ciência permite investigar aqui?');
 await expect(v21.locator('.v21-botanical__area')).toHaveCount(3);
 await expect(v21).toContainText('não indicação de plantio');
 await expect(v21).toContainText('Cyperus giganteus');
 await expect(v21.locator('.v21-botanical__count').first()).toContainText('0');
 await page.screenshot({path:out+'/itapeva-1440.png'});
 for(const width of [768,390,320]){
  await page.setViewportSize({width,height:900});
  await v21.scrollIntoViewIfNeeded();
  assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width+1,'Overflow V21 '+width);
  await page.screenshot({path:out+'/itapeva-'+width+'.png'});
 }
 await page.setViewportSize({width:1440,height:920});
 await importFixture(site('IA'));
 await journey.getByRole('button',{name:'Consultar síntese do terreno'}).click();
 await expect(v21).toBeVisible();
 await expect(v21.locator('.v21-botanical__cards .v21-botanical__card').first()).toBeVisible();
 await expect(v21).toContainText('Correspondências para investigar');
 await page.screenshot({path:out+'/iowa-1440.png'});
 assert.deepEqual(errors,[]);
 await writeFile(out+'/validation.json',JSON.stringify({passed:true,checks:['globe canvas and 16 polaroids','pause control','Itapeva inconclusive','Iowa evidence','responsive 1440/768/390/320','no page errors'],errors},null,2));
 console.log('PASS V21 browser');
}finally{await browser.close();}
