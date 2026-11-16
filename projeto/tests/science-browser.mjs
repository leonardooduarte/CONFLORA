import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await b.newPage({viewport:{width:1280,height:900}});const errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://localhost:5176');
 await page.getByRole('button',{name:'Analisar meu terreno'}).first().click();
 await expect(page.locator('.studio-journey')).toBeVisible();
 await page.locator('input[type=file]').first().setInputFiles('public/scene-garden.png');
 await page.locator('.line-sidebar').getByText('Jardim de chuva',{exact:true}).click();
 await page.getByRole('button',{name:'Adicionar no centro',exact:true}).click();
 await page.locator('.studio-journey').getByRole('button',{name:/Informar condições/}).click();
 const j=page.locator('.studio-journey');
 await j.getByLabel('Contexto regional').selectOption('IA');
 await j.getByLabel('Luz observada').selectOption('full');
 await j.getByLabel('Umidade observada').selectOption('moist');
 await j.getByRole('button',{name:/Encontrar plantas para esta área/}).click();
 await expect(page.locator('.herbarium-search')).toBeVisible();
 await expect(page.locator('.atlas-feature')).toBeVisible();
 await expect(page.locator('.selection-results')).toContainText('Penstemon digitalis');
 await expect(page.locator('.knowledge-heading')).toContainText('15 espécies');
 const structure=await page.evaluate(()=>{const a=document.querySelector('.herbarium-search'),b=document.querySelector('.atlas-feature');return Boolean(a&&b&&(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING))});
 assert(structure,'Immersive gallery must remain directly below search');
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('.herbarium-search')).toBeVisible();
 assert.deepEqual(errors,[]);
 console.log('PASS browser science');
}finally{await b.close();}
