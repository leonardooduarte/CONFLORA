import {chromium,expect} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const out='work/atelier';await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:5176');
 await expect(p.locator('.premium-opening')).toBeVisible();await p.getByRole('button',{name:'Abrir meu ateliê',exact:true}).click();
 await p.getByRole('button',{name:'Jardim de chuva',exact:true}).click();await p.getByRole('button',{name:'Adicionar no centro',exact:true}).click();await expect(p.locator('.area-dossier')).toBeVisible();await p.locator('.inspector textarea').fill('Área junto ao acesso.');
 await p.getByRole('button',{name:'Investigar plantas desta área',exact:true}).click();await p.locator('.catalog-filters input[type=search]').fill('Commelina');await p.getByRole('button',{name:'Salvar interesse',exact:true}).click();await p.getByRole('button',{name:/Meu herbário/}).click();await expect(p.locator('.botanic-row')).toHaveCount(1);await p.screenshot({path:out+'/herbarium.png'});
 await p.getByRole('button',{name:'Voltar ao espaço',exact:true}).click();await expect(p.locator('.dossier-species')).toContainText('Commelina');await p.getByRole('button',{name:'Registrar uma visita aqui',exact:true}).click();await p.getByLabel('Observação do jardim').fill('Primeira observação nesta área.');await p.getByRole('button',{name:'Adicionar ao diário',exact:true}).click();await expect(p.locator('.garden-entry')).toHaveCount(1);
 await p.getByRole('button',{name:'Meu espaço',exact:true}).click();await expect(p.locator('.dossier-entry')).toContainText('Primeira observação');await p.screenshot({path:out+'/atelier.png'});
 await p.getByRole('button',{name:'Modo foco',exact:true}).click();await expect(p.locator('.inspector')).toBeHidden();await p.locator('.scene').focus();await p.keyboard.press('f');await expect(p.locator('.inspector')).toBeVisible();
 await p.getByRole('button',{name:'02 Desenhar',exact:true}).click();await expect(p.locator('.drawing-controls')).toBeVisible();await p.getByRole('button',{name:'Cancelar desenho',exact:true}).click();
 for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:950});expect(await p.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);await p.screenshot({path:out+'/studio-'+width+'.png'});await p.getByRole('button',{name:'CONFLORA — início'}).click();expect(await p.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);await p.waitForTimeout(1600);await p.screenshot({path:out+'/home-'+width+'.png'});await p.getByRole('button',{name:/^Continuar ·/}).click()}
 expect(errors).toEqual([]);await writeFile(out+'/result.json',JSON.stringify({passed:true,errors,checks:['interactive preview','context herbarium','visit linked to area','dossier continuity','focus keyboard','intention modes','320/390/768/1440']},null,2));console.log('PASS Atelier');
}finally{await browser.close()}
