import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';

const url=process.argv[2]||'http://127.0.0.1:5176/';
const remote=url.startsWith('https://');
const folder='work/v20-globe-home';
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const report={url,remote,checks:[],errors:[]};
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
page.on('pageerror',e=>report.errors.push(e.message));
try{
 // A new, externally published preview path avoids stale HTML/JS bundles.
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
 const hero=page.locator('.premium-opening');
 await expect(hero).toBeVisible({timeout:25000});
 await expect(hero.locator('h1')).toContainText('Todo lugar');
 const globe=hero.locator('.globe-orbit');
 await expect(globe).toBeVisible({timeout:25000});
 await expect(globe.locator('.globe-orbit__canvas')).toBeVisible();
 await expect(globe.locator('.globe-orbit__polaroid')).toHaveCount(16);
 await expect(globe).toContainText('FLORA PELO MUNDO');
 assert.equal(await hero.locator('figure.opening-portrait>img').count(),0,'The old Commelina portrait must not appear in the opening');
 assert.equal(await hero.getByRole('button',{name:'Conhecer esta espécie'}).count(),0,'The V19.1 portrait call-to-action must be gone');
 assert.equal(await page.locator('.v20-insight').count(),0,'Insights should not obscure the opening');
 await page.waitForTimeout(1500);
 const d=await globe.evaluate(el=>({visible:Number(el.dataset.visibleCount||0),photos:[...el.querySelectorAll('.globe-orbit__polaroid>img')].filter(x=>x.complete&&x.naturalWidth>0).length,fallback:Boolean(el.querySelector('.globe-orbit__fallback')),rotation:el.dataset.rotation,href:location.href}));
 assert(d.photos>=10,'Global image collection not loading: '+JSON.stringify(d));
 assert(!d.fallback,'WebGL globe did not initialize: '+JSON.stringify(d));
 assert(d.visible>=1,'No anchored Polaroids visible: '+JSON.stringify(d));
 report.globe=d;
 report.checks.push('Original V19 title/buttons','Old floral portrait absent','3D globe canvas','16 Polaroids','10+ loaded botanical photos','rotating globe with visible photo cards');
 await hero.screenshot({path:folder+(remote?'/live-desktop.png':'/desktop.png')});
 if(!remote){
  await page.setViewportSize({width:390,height:844});
  await expect(globe).toBeVisible();
  await hero.screenshot({path:folder+'/mobile-390.png'});
  const width=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert(width<=391,'Horizontal overflow at 390px: '+width);
  report.checks.push('Mobile 390px without overflow');
 }
 assert.deepEqual(report.errors,[],'Unexpected runtime errors');
 report.passed=true;
 await writeFile(folder+'/'+(remote?'live-result.json':'result.json'),JSON.stringify(report,null,2));
 console.log('PASS V20 GLOBE ON HOMEPAGE '+JSON.stringify(report));
}catch(e){report.error=String(e);await page.screenshot({path:folder+(remote?'/live-failure.png':'/failure.png')}).catch(()=>{});await writeFile(folder+'/'+(remote?'live-result.json':'result.json'),JSON.stringify(report,null,2));throw e}
finally{await browser.close()}
