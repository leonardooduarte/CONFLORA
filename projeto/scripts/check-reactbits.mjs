import {createHash} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const target=resolve('src/components/reactbits');
const names=['ScrollExpand','Stepper','AnimatedContent','MorphSlider','SplitText','RippleDistortion','SpringCheck','CircularText','LineSidebar','AnimatedList','Masonry','AccordionGallery','StaggeredMenu','SpecularButton'];
const missing=names.filter(n=>!existsSync(resolve(target,n+'.jsx')));
if(missing.length){console.error('Faltam componentes oficiais do React Bits: '+missing.join(', '));console.error('Execute: npm run setup:reactbits (necessário acesso à internet)');process.exit(1);}
for(const name of names){const s=readFileSync(resolve(target,name+'.jsx'),'utf8');if(s.includes('COMPONENTE_PENDENTE')||s.trim().length<400){console.error('Componente inválido: '+name);process.exit(1);}}
const provenance=JSON.parse(readFileSync(resolve('docs/reactbits-provenance.json'),'utf8'));
for(const [file,hash] of Object.entries(provenance.hashes)){
 if(createHash('sha256').update(readFileSync(resolve(target,file))).digest('hex')!==hash)throw Error('Fonte oficial alterada: '+file);
}
console.log('14 arquivos oficiais presentes. Isso NÃO substitui testes de execução/animação.');
