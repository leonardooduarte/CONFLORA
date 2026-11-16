/* CONFLORA V11: local-first project persistence, no network or analytics. */
export const Store = (() => {
 const DB='conflora-v11-local', TABLE='projects'; let dbPromise;
 function open(){
  if(!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB indisponível'));
  if(!dbPromise) dbPromise=new Promise((resolve,reject)=>{
   const req=indexedDB.open(DB,1);
   req.onupgradeneeded=()=>{const d=req.result;if(!d.objectStoreNames.contains(TABLE))d.createObjectStore(TABLE,{keyPath:'id'});};
   req.onsuccess=()=>resolve(req.result); req.onerror=()=>{dbPromise=null;reject(req.error||Error('Erro ao abrir banco'))};req.onblocked=()=>{dbPromise=null;reject(Error('Storage blocked'))};
  });return dbPromise;
 }
 async function tx(mode,fn){const db=await open();return new Promise((resolve,reject)=>{
   const tr=db.transaction(TABLE,mode), s=tr.objectStore(TABLE);let req,result;
   tr.oncomplete=()=>resolve(result);tr.onabort=()=>reject(tr.error||Error('Transação cancelada'));tr.onerror=()=>reject(tr.error||Error('Falha no armazenamento'));
   try{req=fn(s);}catch(e){tr.abort();reject(e);return;}
   req.onsuccess=()=>{result=req.result};req.onerror=()=>reject(req.error);
  });}
 async function save(p){const clean=structuredClone(p);clean.updatedAt=Date.now();return tx('readwrite',s=>s.put(clean));}
 function load(id){return tx('readonly',s=>s.get(id));}
 function all(){return tx('readonly',s=>s.getAll());}
 function remove(id){return tx('readwrite',s=>s.delete(id));}
 function id(){return 'cfl-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);}
 function newProject(kind='space') {const now=Date.now();return {version:12,id:id(),createdAt:now,updatedAt:now,name:'Meu espaço',image:null,annotations:[],context:{region:'',area:'',soil:'unknown',sun:'unknown',pooling:'unknown',notes:'',regionCode:'unknown',moisture:'unknown'},kit:{code:'',tasks:[false,false,false,false,false],entries:[]},plantInterests:[],scenarios:{A:null,B:null},solutions:[],journal:[],care:[false,false,false],kind};}
 return {save,load,all,remove,id,newProject};
})();
