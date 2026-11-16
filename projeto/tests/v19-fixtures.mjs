import fs from 'node:fs';
import {Store} from '../src/core/store.js';
export function site(region='BR'){
 const p=Store.newProject();p.name=region==='BR'?'Itapeva · estudo 20 m²':'Iowa · documented study';
 p.image='data:image/png;base64,'+fs.readFileSync(new URL('../public/scene-garden.png',import.meta.url)).toString('base64');
 p.context={...p.context,regionCode:region,region:region==='BR'?'Itapeva, São Paulo, Brasil':'Iowa, USA',area:'20',soil:region==='BR'?'slow':'medium',sun:'full',moisture:'wet',duration:region==='BR'?'unknown':'hours',building:region==='BR'?'unknown':'away'};
 const mark=(id,type,x,y)=>({id,type,x,y,size:1,kind:'point',notes:'',points:[]});
 p.annotations=[mark('pool1','pool',250,430),mark('pool2','pool',500,400),mark('pool3','pool',750,430),mark('roof1','roof',200,100),mark('roof2','roof',500,100),mark('roof3','roof',800,100),mark('paved1','paved',500,570)];return p;
}
