import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
await fs.mkdir('work/globe-v19-2',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:960}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://localhost:5176/');
 const hero=page.locator('.premium-opening');
 await expect(hero).toBeVisible();
 await expect(hero.locator('h1')).toContainText('Todo lugar');
 await expect(hero.locator('h1')).toContainText('pode ganhar');
 await expect(hero.getByRole('button',{name:'Analisar meu terreno'})).toBeVisible();
 await expect(hero.getByRole('button',{name:/Explorar o Herbário/})).toBeVisible();
 assert.equal(await hero.locator('.opening-portrait>img').count(),0,'Original hero photo must be replaced, not stacked');
 const globe=hero.locator('.botanical-globe');
 await expect(globe).toBeVisible();
 await expect(globe).toContainText('CARTOGRAFIA BOTÂNICA');
 await expect(globe).toContainText('Bauru');
 await expect(globe).toContainText('Iowa');
 await expect(globe).toContainText('não a origem ou a distribuição natural');
 const picture=globe.locator('.botanical-globe__thumbnail img');
 await expect(picture).toHaveCount(2);
 for(const i of [0,1])assert(await picture.nth(i).evaluate(e=>e.complete&&e.naturalWidth>50),'Both documented botanical photos must load');
 await expect(globe.locator('.botanical-globe__entry-text>a')).toHaveCount(2);
 const original=await globe.locator('.botanical-globe__entry-text i').first().textContent();
 await globe.getByRole('button',{name:'Próxima planta de Bauru · São Paulo'}).click();
 const updated=await globe.locator('.botanical-globe__entry-text i').first().textContent();
 assert.notEqual(original,updated,'Plant carousel must advance');
 await page.waitForTimeout(700);
 await expect(globe.locator('.botanical-globe__canvas')).toBeVisible();
 assert.equal(await globe.locator('.botanical-globe__scene--fallback').count(),0,'WebGL globe must render on Chromium');
 const anchors=await globe.evaluate(e=>typeof CSS!=='undefined'&&CSS.supports('position-anchor','--cobe-br'));
 if(anchors){
  await expect(globe.locator('.botanical-globe__polaroid')).toHaveCount(2);
  const anchored=await globe.locator('.botanical-globe__polaroid').first().evaluate(el=>getComputedStyle(el).positionAnchor);
  assert(anchored.includes('cobe-br'),'Botanical Polaroid must be bound to first geographic marker');
 }
 await hero.screenshot({path:'work/globe-v19-2/desktop.png'});
 await globe.getByRole('button',{name:'Pausar'}).click();
 await expect(globe.getByRole('button',{name:'Retomar'})).toHaveAttribute('aria-pressed','true');
 await globe.getByRole('button',{name:'Retomar'}).click();
 await expect(globe.getByRole('button',{name:'Pausar'})).toHaveAttribute('aria-pressed','false');
 await page.locator('.site-header .lang').click();
 await expect(hero.locator('h1')).toContainText('Every place');
 await expect(globe).toContainText('BOTANICAL CARTOGRAPHY');
 await expect(globe).toContainText('not native plant origins');
 await expect(globe.getByRole('button',{name:'Open Herbarium'})).toBeVisible();
 await page.locator('.site-header .lang').click();
 for(const width of [390,360,320]){
  await page.setViewportSize({width,height:844});
  await page.evaluate(()=>scrollTo(0,0));
  await expect(globe.locator('.botanical-globe__thumbnail')).toHaveCount(2);
  const scrollWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert.equal(scrollWidth,width,'Unexpected document overflow at '+width);
  await hero.screenshot({path:'work/globe-v19-2/mobile-'+width+'.png'});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(globe.locator('.botanical-globe__canvas')).toBeVisible();
 await globe.getByRole('button',{name:'Abrir Herbário'}).click();
 await expect(page.locator('.knowledge-page')).toBeVisible();
 await expect(page.locator('.botanic-row')).toHaveCount(19);
 assert.deepEqual(errors,[],'No runtime JS errors');
 await fs.writeFile('work/globe-v19-2/result.json',JSON.stringify({passed:true,checks:['V19.1 original heading/buttons','hero photo replaced only','Bauru experiment and Iowa guide labeled as source contexts','licensed plant photography','COBE canvas and CSS anchors','plant photo carousel','pause/resume','PT/EN','mobile 390/360/320','reduced motion','Herbarium 19 records'],errors},null,2));
 console.log('PASS V19.2 botanic globe: geographic document contexts, photo Polaroids and V19.1 hero preserved');
}catch(e){await page.screenshot({path:'work/globe-v19-2/failure.png',fullPage:false}).catch(()=>{});throw e}
finally{await browser.close()}
