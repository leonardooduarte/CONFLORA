import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {site} from './v19-fixtures.mjs';

const out='work/v20',base='http://127.0.0.1:5176/';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
async function importFixture(project){
 await page.goto(base);
 await page.locator('input[accept=".json,application/json"]').setInputFiles({name:'v20-test.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(project))});
 await expect(page.locator('.project-ribbon')).toContainText(project.name);
}
try{
 await importFixture(site());
 const journey=page.locator('.studio-journey');
 await expect(journey).toBeVisible();
 await expect(journey.locator('.studio-journey-steps>div')).toHaveCount(4);
 await expect(journey.getByRole('button',{name:'Consultar síntese do terreno'})).toBeVisible();
 await expect(page.getByRole('group',{name:'Ferramentas essenciais'})).toBeVisible();
 await page.getByRole('button',{name:'Marcar água acumulada'}).click();
 await expect(page.getByRole('button',{name:'Marcar água acumulada'})).toHaveAttribute('aria-pressed','true');
 await journey.getByRole('button',{name:'Informar condições'}).click();
 await expect(journey.locator('.studio-journey-conditions__origin')).toContainText('Condições da marcação selecionada');
 await journey.getByRole('button',{name:'Consultar síntese do terreno'}).click();
 const result=page.locator('.plan-extras .v20-insight');
 await expect(result).toBeVisible();
 await expect(result).toContainText('O que já sabemos sobre seu espaço');
 await expect(result).toContainText('3 pontos de água acumulada');
 await expect(result).toContainText('3 saídas do telhado');
 await expect(result).toContainText('1 superfície pavimentada');
 await expect(result).toContainText('nenhuma planta foi validada');
 await expect(result).toContainText('Registrar a duração do acúmulo');
 await expect(result).toContainText('Verificar construções e redes enterradas');
 await expect(result).toContainText('Investigar a drenagem do solo');
 await result.locator('.v20-insight__regions summary').click();
 await expect(result.locator('.v20-insight__region')).toHaveCount(3);
 await result.screenshot({path:out+'/insight-1440.png'});
 await page.locator('.plan-extras').getByRole('button',{name:'Criar estudo exploratório A',exact:true}).click();
 await page.locator('.plan-extras').getByRole('button',{name:'Criar estudo exploratório B',exact:true}).click();
 const comparison=page.locator('.plan-extras .v20-comparison');
 await expect(comparison).toBeVisible();
 await expect(comparison).toContainText('O que muda entre A e B?');
 await expect(comparison).toContainText('Alternativa A');
 await expect(comparison).toContainText('Alternativa B');
 await expect(page.locator('.plan-extras .v19-visual')).toHaveCount(2);
 await comparison.screenshot({path:out+'/comparison-1440.png'});
 for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:900});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth);
   assert(overflow<=width+1,'V20 horizontal overflow at '+width+' actual '+overflow);
   await result.scrollIntoViewIfNeeded();
   await page.screenshot({path:out+'/plan-'+width+'.png'});
 }
 await page.setViewportSize({width:1440,height:960});
 await page.locator('.plan-extras').getByRole('button',{name:/Abrir relatório/}).last().click();
 const modal=page.locator('.report-modal');
 await expect(modal).toBeVisible();
 await expect(modal.locator('.v20-insight')).toHaveCount(1);
 await expect(modal.locator('.v20-comparison')).toHaveCount(1);
 const ready=page.waitForEvent('download',{timeout:110000});
 await modal.getByRole('button',{name:'Baixar relatório PDF',exact:true}).click();
 const pdf=await ready;
 assert.equal(await pdf.failure(),null);
 await pdf.saveAs(out+'/itapeva-v20.pdf');
 const pdftxt=execFileSync('pdftotext',['-layout',out+'/itapeva-v20.pdf','-'],{encoding:'utf8'});
 assert(pdftxt.includes('O que já sabemos sobre seu espaço'));
 assert(pdftxt.includes('CONFLORA'));
 assert(!pdftxt.includes('undefined'));
 const pdfBytes=(await stat(out+'/itapeva-v20.pdf')).size;
 assert(pdfBytes>50000);
 await page.keyboard.press('Escape');
 await page.locator('.site-header').locator('button.lang').click();
 await expect(page.locator('.plan-extras .v20-insight')).toContainText('What we know about your space');
 await expect(page.locator('.plan-extras .v20-comparison')).toContainText('What differs between A and B?');
 await page.locator('.site-header').locator('button.lang').click();
 assert.deepEqual(errors,[]);
 const resultFile={passed:true,checkList:['original V19.1 editor intact','guided fourth step','area inheritance explanation','Itapeva 7 marks','research not recommendation','safe actionable checks','A/B contrast','actual PDF download with V20 content','PT/EN','responsive 1440/768/390/320'],pdfBytes,errors};
 await writeFile(out+'/validation.json',JSON.stringify(resultFile,null,2));
 console.log('PASS V20 browser '+JSON.stringify(resultFile));
}catch(e){await page.screenshot({path:out+'/failure.png',fullPage:false}).catch(()=>{});throw e}
finally{await browser.close()}
