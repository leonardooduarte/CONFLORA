/** Obtém os oito componentes EXATOS dos registros oficiais JS-CSS do React Bits.
 * Não contém aproximações próprias. Falha sem internet, para evitar falsos positivos.
 */
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {join,resolve,basename} from 'node:path';
import {createHash} from 'node:crypto';
const base='https://reactbits.dev/r/';
const names=['ScrollExpand','Stepper','AnimatedContent','MorphSlider','SplitText','RippleDistortion','SpringCheck','CircularText','LineSidebar','AnimatedList','Masonry','AccordionGallery','StaggeredMenu','SpecularButton'];
const dest=resolve('src/components/reactbits');
const info=[];
await mkdir(dest,{recursive:true});
const hashes={};
for(const name of names){
  const url=`${base}${name}-JS-CSS.json`;
  let response;
  try{ response=await fetch(url,{signal:AbortSignal.timeout(25000)});}catch(e){throw new Error(`Impossível acessar ${url}: ${e.message}`)}
  if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);
  const data=await response.json();
  if(data.name!==`${name}-JS-CSS`||!Array.isArray(data.files)||!data.files.some(f=>f.path?.endsWith('.jsx'))){throw new Error('Registro inesperado: '+url)}
  const dependencies=data.dependencies||[];
  for(const file of data.files){
    const filename=basename(file.path).replace(/^AnimatedContent\//,'').replace(/^SplitText\//,'');
    if(!/\.(jsx|css)$/.test(filename)||typeof file.content!=='string')throw new Error('Arquivo inesperado: '+file.path);
    const full=join(dest,filename);
    await writeFile(full,file.content,'utf8');
    hashes[filename]=createHash('sha256').update(file.content).digest('hex');
  }
  info.push({component:name,source:url,dependencies,files:data.files.map(f=>f.path)});
  console.log('Instalado código original:',name);
}
const metadata={generatedAt:new Date().toISOString(),origin:'React Bits (DavidHDev)',variant:'JS-CSS',license:'MIT + Commons Clause (consultar LICENSE do React Bits)',components:info,hashes};
await writeFile(resolve('docs/reactbits-provenance.json'),JSON.stringify(metadata,null,2)+'\n');
console.log('Origem e hashes registrados em docs/reactbits-provenance.json');
console.log('Execute npm install para instalar dependências e npm run build para verificar a compilação.');
