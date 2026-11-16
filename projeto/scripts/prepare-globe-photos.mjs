/**
 * Download only specifically curated Wikimedia Commons files recorded in
 * src/data/globeGallery.js. All photo credit/license metadata is stored there;
 * downloads are local, deterministic assets in public/globe for offline builds.
 *
 * Usage: node scripts/prepare-globe-photos.mjs
 * External Wikimedia sites are used ONLY at build/asset-preparation time.
 */
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises';
import {join} from 'node:path';
import {globeGallery} from '../src/data/globeGallery.js';

const dir='public/globe';
await mkdir(dir,{recursive:true});
const photos=globeGallery.filter(p=>p.wikiFile);
const expected=14;
if(photos.length!==expected)throw Error('Unexpected number of Commons photos: '+photos.length);
const ua='CONFLORA Educational Botanical Gallery/1.0 (https://github.com/leonardooduarte/CONFLORA; open-license attribution stored in source code)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const urls=file=>{
 const title=file.replaceAll(' ','_'), enc=encodeURIComponent(title);
 const hash=createHash('md5').update(title).digest('hex');
 return [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/'+hash[0]+'/'+hash.slice(0,2)+'/'+enc+'/480px-'+enc,
  'https://commons.wikimedia.org/wiki/Special:FilePath/'+enc+'?width=480',
  'https://upload.wikimedia.org/wikipedia/commons/'+hash[0]+'/'+hash.slice(0,2)+'/'+enc
 ];
};
const failed=[];
for(const [i,item] of photos.entries()){
 const dst=join('public',item.file);
 try{
  if((await stat(dst)).size>10000){console.log('CACHED '+item.id);continue}
 }catch{}
 let ok=false;
 for(const [index,url] of urls(item.wikiFile).entries()){
  for(let attempt=0;attempt<1;attempt++){
   try{
    const response=await fetch(url,{
     headers:{'User-Agent':ua,'Accept':'image/jpeg,image/*;q=.8,*/*;q=.1'},
     signal:AbortSignal.timeout(9000),
     redirect:'follow'
    });
    if(!response.ok)throw Error('HTTP '+response.status);
    const data=Buffer.from(await response.arrayBuffer());
    const ct=response.headers.get('content-type')||'';
    if(!ct.startsWith('image/')||data.length<10000||data.length>15000000)throw Error('invalid image '+ct+' bytes='+data.length);
    // Decode JPEG signature, not an HTML error disguised as an image.
    if(data[0]!==0xff||data[1]!==0xd8)throw Error('JPEG header missing');
    await writeFile(dst,data);
    console.log('DOWNLOADED '+(i+1)+'/'+photos.length+' '+item.id+' '+data.length+'B source#'+index);
    ok=true;break;
   }catch(error){console.warn('RETRY '+item.id+' source#'+index+' attempt '+attempt+' '+error.message);await sleep(300)}
  }
  if(ok)break;
 }
 if(!ok)failed.push(item.id);
 await sleep(200);
}
if(failed.length)throw Error('Unresolved Commons photos: '+failed.join(', '));
const manifest=photos.map(x=>({id:x.id,file:x.file,source:x.source,author:x.author,license:x.license,location:x.location,kind:x.kind}));
await writeFile(join(dir,'ATTRIBUTION.json'),JSON.stringify({note:'CC author and license credits for independently licensed photos; not the scientifically reviewed Herbarium',images:manifest},null,2)+'\n');
console.log('PASS: '+photos.length+' international open-license photographs cached locally and attributed');
