/** Offline static sanity checks; NOT a browser, build, or end-to-end test. */
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const read=p=>readFileSync(resolve(p),'utf8');
const names=['ScrollExpand','Stepper','AnimatedContent','MorphSlider','SplitText','RippleDistortion','SpringCheck','CircularText'];
const app=read('src/App.jsx')+read('src/components/GallerySlider.jsx');
for(const name of names){if(!app.includes(`reactbits/${name}.jsx`))throw Error(`Componente não referenciado: ${name}`);}
for(const p of ['src/core/editor.js','src/core/store.js','src/core/i18n.js','scripts/install-reactbits.mjs','src/style.css','index.html','package.json']){if(!existsSync(resolve(p)))throw Error('Arquivo ausente: '+p);}
const pack=JSON.parse(read('package.json'));
for(const d of ['react','react-dom','gsap','@gsap/react','motion','ogl','@hugeicons/react','@hugeicons/core-free-icons']){if(!pack.dependencies[d])throw Error('Dependência ausente: '+d);}
const {Store}=await import('../src/core/store.js');
const {Ed}=await import('../src/core/editor.js');
const {I18N}=await import('../src/core/i18n.js');
const p=Store.newProject();
if(p.version!==11||p.kit.tasks.length!==5)throw Error('Modelo de dados inválido');
p.annotations.push({id:'a',x:500,y:300,type:'garden',size:1,notes:''});
const svg=Ed.svgContent(p,{labels:I18N.pt,compare:true,fraction:50});
if(!svg.includes('clipPath')||!svg.includes('data-marker-id'))throw Error('SVG inválido');
if(!I18N.en.heroA||!I18N.pt.planRisk)throw Error('Traduções ausentes');
console.log('PASSOU: dependências declaradas, integração referenciada, modelo V11, SVG, PT/EN.');
console.log('NÃO FOI TESTADO: React instalado, build, WebGL, interatividade real ou animações.');
