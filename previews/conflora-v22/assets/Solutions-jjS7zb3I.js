import{j as t,e as $,r as ae}from"./index-bGHGiCNp.js";import{a as l,g as H,R as oe}from"./gsap-vendor-CayXo8le.js";import{R as le,T as ce,P as ue,M as he,a as se}from"./webgl-vendor-DcvrfCN1.js";import"./react-vendor-8Znzgoit.js";import"./motion-vendor-CXAxcrTV.js";const de=[{image:"https://picsum.photos/id/1015/900/1200",label:"Canyon",link:"#"},{image:"https://picsum.photos/id/1018/900/1200",label:"Ridgeline",link:"#"},{image:"https://picsum.photos/id/1039/900/1200",label:"Falls",link:"#"},{image:"https://picsum.photos/id/1043/900/1200",label:"Harbour",link:"#"},{image:"https://picsum.photos/id/1044/900/1200",label:"Skyline",link:"#"}],me=({items:u=de,defaultIndex:e=2,accentColor:r="#ffffff",overlayColor:s="#060010",textColor:g="#ffffff",height:d=460,gap:a=10,radius:R=16,expandRatio:o=.52,orientation:m="horizontal",duration:y=.6,ease:j="power3.out",parallax:D=.5,tilt:k=8,stagger:C=.06,trigger:L="hover",showLabels:A=!0,grayscale:p=!0,className:v=""})=>{const w=l.useRef(null),h=l.useRef([]),N=l.useRef([]),O=l.useRef([]),F=l.useRef([]),M=l.useRef(null),U=l.useRef(!0),q=l.useRef(320),E=m==="vertical",S=u.length,[T,n]=l.useState(Math.min(Math.max(e,0),S-1)),f=typeof window<"u"&&window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1,I=l.useCallback(c=>{const i=h.current;if(!i.length)return;const b=Math.min(Math.max(o,.2),.9),z=S>1?b*(S-1)/(1-b):1,x=q.current;M.current?.kill();const G=c&&!f?y:0,P=H.timeline();i.forEach((J,V)=>{if(!J)return;const B=V===T,Q=N.current[V],K=O.current[V],Y=F.current[V],Z=B?0:V<T?k:-k,ne=E?{rotateX:-Z}:{rotateY:Z};if(P.to(J,{flexGrow:B?z:1,...ne,duration:G,ease:j},0),Q){const ee=Math.max(-1.5,Math.min(1.5,T-V))*D*x*.06,ie=p?B?0:1:0;P.to(Q,{xPercent:-50,yPercent:-50,x:E||B?0:ee,y:E?B?0:ee:0,"--ag-gray":ie,"--ag-dim":B?0:.35,duration:G,ease:j},0)}A&&K&&Y&&(B?P.to([K,Y],{opacity:1,x:0,duration:G,ease:j,stagger:f?0:C},0):P.to([K,Y],{opacity:0,x:-14,duration:G*.6,ease:j},0))}),M.current=P},[T,S,o,y,j,E,k,D,p,A,C,f]);l.useEffect(()=>{const c=w.current;if(!c)return;const i=()=>{const z=c.getBoundingClientRect(),x=E?z.height:z.width,G=Math.max(x-a*(S-1),120),P=Math.max(140,G*Math.min(Math.max(o,.2),.9)*1.22);q.current=P,c.style.setProperty("--ag-media-size",`${P}px`),I(!U.current)};i();const b=new ResizeObserver(i);return b.observe(c),()=>b.disconnect()},[I,a,S,o,E]),l.useEffect(()=>{I(!U.current),U.current=!1},[I]),l.useEffect(()=>()=>{M.current?.kill()},[]);const _=c=>{L==="hover"&&n(c)},W=(c,i)=>{c!==T&&(i.preventDefault(),n(c))},X=(c,i)=>{i.key==="ArrowRight"||i.key==="ArrowDown"?(i.preventDefault(),n((c+1)%S)):(i.key==="ArrowLeft"||i.key==="ArrowUp")&&(i.preventDefault(),n((c-1+S)%S))};return t.jsx("div",{ref:w,className:`accordion-gallery${E?" accordion-gallery--vertical":""}${v?` ${v}`:""}`,style:{"--ag-accent":r,"--ag-overlay":s,"--ag-text":g,"--ag-gap":`${a}px`,"--ag-radius":`${R}px`,height:E?`${Math.round(d*1.6)}px`:`${d}px`},role:"list","aria-label":"Image accordion gallery",children:u.map((c,i)=>{const b=i===T,z=c.link?"a":"div";return t.jsxs(z,{ref:x=>h.current[i]=x,className:`ag-panel${b?" ag-panel--active":""}`,style:{borderRadius:`${R}px`},href:c.link||void 0,onClick:x=>W(i,x),onMouseEnter:()=>_(i),onFocus:()=>n(i),onKeyDown:x=>X(i,x),role:"listitem",tabIndex:0,"aria-current":b?"true":void 0,"aria-label":c.label,children:[t.jsxs("span",{className:"ag-panel__frame",children:[t.jsx("span",{className:"ag-panel__media",ref:x=>N.current[i]=x,children:t.jsx("img",{src:c.image,alt:c.alt||c.label||"",draggable:"false"})}),t.jsx("span",{className:"ag-panel__overlay","aria-hidden":"true"})]}),A&&t.jsxs("span",{className:"ag-panel__label","aria-hidden":"true",children:[t.jsx("span",{className:"ag-panel__bar",ref:x=>O.current[i]=x}),t.jsx("span",{className:"ag-panel__text",ref:x=>F.current[i]=x,children:c.label})]})]},i)})})},te={melt:0,ripple:1,shear:2,swirl:3},pe=[{image:"https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop",caption:"One"},{image:"https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop",caption:"Two"},{image:"https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop",caption:"Three"},{image:"https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=1600&auto=format&fit=crop",caption:"Four"}],fe=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ge=`
precision highp float;

uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uDir;
uniform int uMode;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uDrift;
uniform float uTime;
uniform float uReduce;
uniform vec2 uPointer;
uniform vec3 uOverlay;

varying vec2 vUv;

const float PI = 3.14159265359;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) {
    s.y = 1.0 / ratio;
  } else {
    s.x = ratio;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);

  vec2 uv = vUv;

  uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
  uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;

  vec2 uvC = uv;
  vec2 uvN = uv;
  float m = smoothstep(0.0, 1.0, p);

  if (uReduce < 0.5) {
    if (uMode == 3) {
      vec2 c = uv - 0.5;
      float r = length(c);
      float ang = env * uIntensity * 3.5 * (1.0 - r);
      uvC = rot(ang) * c + 0.5;
      uvN = rot(-ang) * c + 0.5;
      m = smoothstep(0.0, 1.0, p);
    } else if (uMode == 1) {
      float d = distance(uv, uPointer);
      float ring = p * 1.6;
      float wave = sin((d - ring) * 30.0) * env;
      vec2 dir = normalize(uv - uPointer + 1e-4);
      vec2 disp = dir * wave * uIntensity * 0.25;
      uvC = uv + disp;
      uvN = uv + disp * 0.6;
      m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
    } else if (uMode == 2) {
      float slices = 14.0;
      float row = floor(uv.y * slices);
      float rnd = hash11(row);
      vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
      uvC = uv + disp;
      uvN = uv + disp;
      float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
      float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
      m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
    } else {
      float nn = fbm(uv * uScale + uTime * 0.03);
      float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
      vec2 g = vec2(nn, warp) - 0.5;
      uvC = uv + g * uIntensity * 0.5 * p;
      uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
      m = smoothstep(nn - 0.15, nn + 0.15, p);
    }
  }

  vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
  vec2 sN = coverUV(uvN, uResolution, uNextSize);

  float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;

  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );

  vec3 col = mix(colC, colN, m);

  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.28);

  gl_FragColor = vec4(col, 1.0);
}
`;function ve(u){const r=new Uint8Array(64);for(let s=0;s<16;s++)r[s*4]=24,r[s*4+1]=24,r[s*4+2]=28,r[s*4+3]=255;return new se(u,{image:r,width:4,height:4,generateMipmaps:!1})}function re(u){let e=(u||"#000000").replace("#","");e.length===3&&(e=e.split("").map(s=>s+s).join(""));const r=parseInt(e,16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}class xe{constructor(e,{items:r,startIndex:s,reducedMotion:g,getOptions:d,onIndexChange:a,dprCap:R}){this.container=e,this.items=r,this.getOptions=d,this.onIndexChange=a,this.reducedMotion=g,this.current=s,this.animating=!1,this.dragging=!1,this.dragDir=0,this.shownIndex=s,this.tween=null,this.renderer=new le({alpha:!1,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,R)}),this.gl=this.renderer.gl,this.gl.clearColor(.05,.05,.06,1),this.canvas=this.gl.canvas,this.canvas.className="morph-slider-canvas",e.appendChild(this.canvas),this.geometry=new ce(this.gl),this.textures=this.items.map(()=>ve(this.gl)),this.sizes=this.items.map(()=>[1,1]);const o=this.getOptions();this.program=new ue(this.gl,{vertex:fe,fragment:ge,uniforms:{tCurrent:{value:this.textures[this.current]},tNext:{value:this.textures[this.current]},uResolution:{value:[1,1]},uCurrentSize:{value:this.sizes[this.current]},uNextSize:{value:this.sizes[this.current]},uProgress:{value:0},uDir:{value:1},uMode:{value:te[o.transition]??0},uIntensity:{value:o.intensity},uScale:{value:o.scale},uAberration:{value:o.aberration},uDrift:{value:o.drift},uTime:{value:0},uReduce:{value:g?1:0},uPointer:{value:[.5,.5]},uOverlay:{value:re(o.overlayColor)}}}),this.mesh=new he(this.gl,{geometry:this.geometry,program:this.program}),this.boundContextLost=this.onContextLost.bind(this),this.canvas.addEventListener("webglcontextlost",this.boundContextLost,!1),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.loadTextures(),this.boundLoop=this.loop.bind(this),this.raf=requestAnimationFrame(this.boundLoop)}loadTextures(){this.items.forEach((e,r)=>{const s=new Image;s.crossOrigin="anonymous",s.src=e.image,s.onload=()=>{const g=new se(this.gl,{generateMipmaps:!1});g.image=s,this.textures[r]=g,this.sizes[r]=[s.naturalWidth||1,s.naturalHeight||1],r===this.current&&(this.program.uniforms.tCurrent.value=g,this.program.uniforms.uCurrentSize.value=this.sizes[r])},s.onerror=()=>{}})}resize(){const e=this.container.getBoundingClientRect(),r=Math.max(e.width,1),s=Math.max(e.height,1);this.renderer.setSize(r,s),this.program.uniforms.uResolution.value=[this.gl.canvas.width,this.gl.canvas.height],this.renderer.render({scene:this.mesh})}syncOptions(){const e=this.getOptions();this.program.uniforms.uMode.value=te[e.transition]??0,this.program.uniforms.uIntensity.value=e.intensity,this.program.uniforms.uScale.value=e.scale,this.program.uniforms.uAberration.value=e.aberration,this.program.uniforms.uDrift.value=e.drift,this.program.uniforms.uOverlay.value=re(e.overlayColor)}loop(e){this.program.uniforms.uTime.value=e*.001,!this.dragging&&!this.animating&&this.syncOptions(),this.renderer.render({scene:this.mesh}),this.raf=requestAnimationFrame(this.boundLoop)}wrap(e){const r=this.items.length;return(e%r+r)%r}prepareNext(e){const r=this.wrap(this.current+e);return this.program.uniforms.tCurrent.value=this.textures[this.current],this.program.uniforms.uCurrentSize.value=this.sizes[this.current],this.program.uniforms.tNext.value=this.textures[r],this.program.uniforms.uNextSize.value=this.sizes[r],this.program.uniforms.uDir.value=e,r}goTo(e){if(this.animating||this.dragging||this.items.length<2)return;const r=this.getOptions();if(!r.loop){const d=this.current+e;if(d<0||d>this.items.length-1)return}this.syncOptions();const s=this.prepareNext(e);this.animating=!0,this.announce(s);const g=this.reducedMotion?Math.min(r.duration,.4):r.duration;this.tween=H.fromTo(this.program.uniforms.uProgress,{value:0},{value:1,duration:g,ease:r.ease,onComplete:()=>this.commit(s)})}announce(e){e!==this.shownIndex&&(this.shownIndex=e,this.onIndexChange&&this.onIndexChange(e))}commit(e){this.current=e,this.program.uniforms.tCurrent.value=this.textures[e],this.program.uniforms.uCurrentSize.value=this.sizes[e],this.program.uniforms.uProgress.value=0,this.animating=!1,this.tween=null,this.announce(e)}next(){this.goTo(1)}prev(){this.goTo(-1)}setPointer(e,r){this.program.uniforms.uPointer.value=[e,r]}beginDrag(){return this.animating||this.items.length<2?!1:(this.dragging=!0,this.dragDir=0,this.syncOptions(),!0)}drag(e){if(!this.dragging)return;const r=this.getOptions(),s=e<0?1:-1;if(!r.loop){const d=this.current+s;if(d<0||d>this.items.length-1){this.program.uniforms.uProgress.value=0;return}}s!==this.dragDir&&(this.dragDir=s,this.prepareNext(s));const g=Math.min(Math.abs(e),1);this.program.uniforms.uProgress.value=g,this.announce(g>.5?this.wrap(this.current+s):this.current)}endDrag(){if(!this.dragging)return;this.dragging=!1;const e=this.program.uniforms.uProgress.value;if(this.dragDir===0)return;const r=this.wrap(this.current+this.dragDir),s=this.reducedMotion?.3:.5;this.animating=!0,e>.4?(this.announce(r),this.tween=H.to(this.program.uniforms.uProgress,{value:1,duration:s,ease:"power2.out",onComplete:()=>this.commit(r)})):(this.announce(this.current),this.tween=H.to(this.program.uniforms.uProgress,{value:0,duration:s,ease:"power2.out",onComplete:()=>{this.animating=!1,this.tween=null}}))}onContextLost(e){e.preventDefault(),cancelAnimationFrame(this.raf)}destroy(){cancelAnimationFrame(this.raf),this.tween&&this.tween.kill(),this.resizeObserver.disconnect(),this.canvas.removeEventListener("webglcontextlost",this.boundContextLost),this.textures.forEach(r=>{r&&r.texture&&this.gl.deleteTexture(r.texture)}),this.program&&this.program.program&&this.gl.deleteProgram(this.program.program);const e=this.gl.getExtension("WEBGL_lose_context");e&&e.loseContext(),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}function be({items:u=pe,startIndex:e=0,transition:r="melt",duration:s=1.1,ease:g="power2.inOut",intensity:d=.55,scale:a=2.4,aberration:R=.35,drift:o=.4,autoplay:m=!1,autoplayDelay:y=4,loop:j=!0,radius:D=16,overlayColor:k="#000000",showCaptions:C=!0,showControls:L=!0,showIndicators:A=!0,className:p="",...v}){const w=l.useRef(null),h=l.useRef(null),[N,O]=l.useState(e),[F,M]=l.useState(!1),U=l.useRef();U.current={transition:r,duration:s,ease:g,intensity:d,scale:a,aberration:R,drift:o,overlayColor:k,loop:j},l.useEffect(()=>{if(!w.current)return;const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,f=new xe(w.current,{items:u,startIndex:e,reducedMotion:n,dprCap:2,getOptions:()=>U.current,onIndexChange:O});return h.current=f,O(e),()=>{f.destroy(),h.current=null}},[u,e]);const q=l.useCallback(()=>h.current?.next(),[]),E=l.useCallback(()=>h.current?.prev(),[]);l.useEffect(()=>{if(!m||F)return;const n=setTimeout(()=>h.current?.next(),Math.max(y,1)*1e3);return()=>clearTimeout(n)},[m,y,F,N]),l.useEffect(()=>{const n=w.current;if(!n)return;let f=0,I=1,_=!1;const W=i=>{const b=n.getBoundingClientRect();I=b.width||1,f=i.clientX;const z=(i.clientX-b.left)/b.width,x=(i.clientY-b.top)/b.height;if(h.current?.setPointer(z,1-x),_=h.current?.beginDrag()??!1,_&&n.setPointerCapture)try{n.setPointerCapture(i.pointerId)}catch{}},X=i=>{if(!_)return;const b=(i.clientX-f)/I;h.current?.drag(b)},c=()=>{_&&(_=!1,h.current?.endDrag())};return n.addEventListener("pointerdown",W),n.addEventListener("pointermove",X),n.addEventListener("pointerup",c),n.addEventListener("pointercancel",c),()=>{n.removeEventListener("pointerdown",W),n.removeEventListener("pointermove",X),n.removeEventListener("pointerup",c),n.removeEventListener("pointercancel",c)}},[]);const S=l.useCallback(n=>{n.key==="ArrowRight"?(n.preventDefault(),q()):n.key==="ArrowLeft"&&(n.preventDefault(),E())},[q,E]),T=u.some(n=>n.caption);return t.jsxs("div",{className:`morph-slider ${p}`.trim(),style:{borderRadius:`${D}px`,"--ms-swap":`${(s*.66).toFixed(3)}s`,"--ms-dot":`${(s*.45).toFixed(3)}s`},onMouseEnter:()=>M(!0),onMouseLeave:()=>M(!1),...v,children:[t.jsx("div",{ref:w,className:"morph-slider-stage",role:"group","aria-roledescription":"carousel","aria-label":"Image morph slider",tabIndex:0,onKeyDown:S}),C&&T&&t.jsx("div",{className:"morph-slider-caption","aria-live":"polite",children:u.map((n,f)=>n.caption?t.jsx("span",{"aria-hidden":f===N?void 0:!0,className:`morph-slider-caption-text ${f===N?"is-active":""}`,children:n.caption},f):null)}),L&&t.jsxs("div",{className:"morph-slider-controls",children:[t.jsx("button",{type:"button",className:"morph-slider-btn","aria-label":"Previous slide",onClick:E,children:t.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",children:t.jsx("path",{d:"M15 5l-7 7 7 7",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),t.jsx("button",{type:"button",className:"morph-slider-btn","aria-label":"Next slide",onClick:q,children:t.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",children:t.jsx("path",{d:"M9 5l7 7-7 7",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),A&&t.jsx("div",{className:"morph-slider-indicators",role:"tablist","aria-label":"Slides",children:u.map((n,f)=>t.jsx("button",{type:"button",role:"tab","aria-selected":f===N,"aria-label":`Go to slide ${f+1}`,className:`morph-slider-dot ${f===N?"is-active":""}`,onClick:()=>{const I=h.current;!I||f===N||I.goTo(f>N?1:-1)}},f))})]})}class we extends oe.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError()}render(){return this.state.failed?null:this.props.children}}function ye({items:u,lang:e}){const r=l.useRef(null),[s,g]=l.useState(0),[d,a]=l.useState("loading"),[R,o]=l.useState(!1);return l.useEffect(()=>{let m=!0,y=0,j;const D=[];let k=()=>{};a("loading"),o(!1);try{const p=document.createElement("canvas"),v=p.getContext("webgl2")||p.getContext("webgl");if(!v)return a("error"),()=>{m=!1};v.getExtension("WEBGL_lose_context")?.loseContext()}catch{return a("error"),()=>{m=!1}}const C=()=>{m&&(a("error"),cancelAnimationFrame(y))};Promise.all(u.map(p=>new Promise((v,w)=>{const h=new Image;D.push(h),h.onload=()=>h.decode().then(v,w),h.onerror=w,h.src=p.image}))).then(()=>{m&&o(!0)},C);const L=performance.now(),A=()=>{if(!m)return;const p=r.current?.querySelector("canvas");if(p){p.dataset.observed||(p.dataset.observed="true",p.addEventListener("webglcontextlost",C),k=()=>p.removeEventListener("webglcontextlost",C));const v=p.getContext("webgl2")||p.getContext("webgl");if(v&&!v.isContextLost()){const w=new Uint8Array(4);let h=765,N=0;for(const O of[.2,.5,.8])for(const F of[.2,.5,.8]){v.readPixels(Math.floor(v.drawingBufferWidth*O),Math.floor(v.drawingBufferHeight*F),1,1,v.RGBA,v.UNSIGNED_BYTE,w);const M=w[0]+w[1]+w[2];h=Math.min(h,M),N=Math.max(N,M)}if(N-h>15){a("ready");return}}}if(performance.now()-L>12e3){C();return}y=requestAnimationFrame(A)};return j=setTimeout(()=>{y=requestAnimationFrame(A)},0),()=>{m=!1,cancelAnimationFrame(y),clearTimeout(j),k(),D.forEach(p=>{p.onload=null,p.onerror=null})}},[u,s]),t.jsxs("div",{ref:r,className:"morph-wrapper","data-status":d,"aria-busy":d==="loading",children:[R&&t.jsx(we,{onError:()=>a("error"),children:t.jsx(be,{items:u,transition:"melt",intensity:.18,aberration:.075,drift:.1,autoplay:!1})},s),d!=="ready"&&t.jsxs("div",{className:"gallery-cover",children:[t.jsx("img",{src:u[0].image,alt:e==="pt"?"Prévia ilustrativa":"Illustrative preview"}),t.jsxs("div",{role:"status",children:[t.jsx("p",{children:d==="error"?e==="pt"?"Não foi possível iniciar a galeria animada.":"The animated gallery could not start.":e==="pt"?"Carregando possibilidades…":"Loading possibilities…"}),d==="error"&&t.jsx("button",{className:"btn",onClick:()=>g(m=>m+1),children:e==="pt"?"Tentar novamente":"Try again"})]})]})]})}const Ce={pt:[{image:$("scene-observations.png"),caption:"01 / Observar"},{image:$("scene-garden.png"),caption:"02 / Investigar"},{image:$("scene-plan.png"),caption:"03 / Planejar"}],en:[{image:$("scene-observations-en.svg"),caption:"01 / Observe"},{image:$("scene-garden-en.svg"),caption:"02 / Investigate"},{image:$("scene-plan-en.svg"),caption:"03 / Plan"}]};function Ie({project:u,change:e,lang:r,onPlants:s,onRoots:g,onStudio:d}){const a=r==="pt",R=a?[["rain","Jardim de chuva","Depressão vegetada que recebe escoamento e pode favorecer retenção e infiltração quando projetada para o local.","Investigar solo, afastamentos, área contribuinte, extravasamento e redes. Não é solução automática para um ponto já alagado.","Observar sedimentos, entrada/saída e plantas; manter registros após chuva."],["vegetated","Área vegetada","Cobertura do solo e raízes participam da relação entre água e superfície.","Investigar clima, luz, solo, disponibilidade de espaço e origem regional das plantas. Vegetar não elimina risco de inundação.","Acompanhar pegamento, plantas indesejadas e necessidade local de irrigação."],["permeable","Superfície permeável","Sistema de superfície e base que permite passagem de água em condições previstas no projeto.","Verificar cargas, base, solo, contaminação e manutenção. Um desenho sobre uma foto não comprova permeabilidade.","Investigar entupimento e manutenção do sistema com orientação técnica."]]:[["rain","Rain garden","A vegetated depression receives runoff and may support retention and infiltration when designed for the site.","Check soil, setbacks, contributing area, overflow and utilities. Not an automatic fix for an already flooded spot.","Observe sediment, inlet/outlet and plants; keep post-rain records."],["vegetated","Vegetated area","Ground cover and roots participate in water–surface relationships.","Check climate, light, soil, space and plant origin. Vegetation does not remove flood risk.","Observe establishment, unwanted plants and locally appropriate watering."],["permeable","Permeable surface","A surface-and-base system allows water passage under designed conditions.","Check loading, base, soil, contamination and maintenance. A drawing does not prove permeability.","Investigate clogging and maintenance with technical support."]];return t.jsxs("main",{className:"knowledge-page",children:[t.jsxs("header",{className:"knowledge-heading",children:[t.jsxs("span",{className:"eyebrow",children:["CONFLORA / ",a?"ATLAS DE POSSIBILIDADES":"ATLAS OF POSSIBILITIES"]}),t.jsx("h1",{children:a?"Conheça três formas de lidar com a chuva.":"Explore three approaches to rainwater."}),t.jsx("p",{children:a?"Estudos ilustrativos. Explore o conceito, registre o interesse e verifique o lugar antes de agir.":"Illustrative studies. Explore the concept, record interest and check the site before acting."}),t.jsxs("div",{className:"btn-row",children:[t.jsx("button",{className:"btn",onClick:s,children:a?"Biblioteca de plantas":"Plant library"}),t.jsx("button",{className:"btn secondary",onClick:g,children:a?"Da chuva às raízes":"From rain to roots"})]})]}),t.jsx(ye,{items:Ce[r],lang:r}),t.jsx("p",{className:"fine",children:a?"Esquemas conceituais, não resultados medidos.":"Conceptual diagrams, not measured results."}),t.jsxs("section",{className:"solution-accordion",onClick:o=>{const m=o.target.closest('a[href^="#solution-"]');m&&(o.preventDefault(),document.getElementById(m.getAttribute("href").slice(1))?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}))},children:[t.jsx("h2",{children:a?"Três possibilidades, condições diferentes.":"Three possibilities, different conditions."}),t.jsx(me,{items:R.map(([o,m],y)=>({image:$(["rain-garden.webp","conflora-groundcover.webp","conflora-paving.webp"][y]),label:m,link:"#solution-"+o})),defaultIndex:0,expandRatio:.52,trigger:"hover",height:380,radius:4,accentColor:"#c4a77d",overlayColor:"#0B241D"})]}),t.jsx("section",{className:"solutions-list",children:R.map(([o,m,y,j,D],k)=>t.jsxs("article",{id:"solution-"+o,children:[t.jsxs("span",{className:"eyebrow",children:["0",k+1," / ",a?"INVESTIGAR":"INVESTIGATE"]}),t.jsx("h2",{children:m}),t.jsx("p",{children:y}),t.jsx("h3",{children:a?"Antes de escolher":"Before choosing"}),t.jsx("p",{children:j}),t.jsx("h3",{children:a?"Acompanhar":"Follow up"}),t.jsx("p",{children:D}),t.jsx("a",{href:o==="permeable"?"https://www.epa.gov/green-infrastructure/types-green-infrastructure":ae.ia.url,children:a?"Referência técnica":"Technical reference"}),t.jsxs("div",{className:"btn-row",children:[u&&t.jsx("button",{className:"btn secondary","aria-pressed":u.solutions.includes(o),onClick:()=>e(C=>{C.solutions=C.solutions.includes(o)?C.solutions.filter(L=>L!==o):[...C.solutions,o]}),children:u.solutions.includes(o)?a?"Remover interesse":"Remove interest":a?"Investigar no meu plano":"Investigate in my plan"}),t.jsxs("button",{className:"text-action",onClick:d,children:[a?"Explorar no meu espaço":"Explore in my space"," ›"]})]})]},o))})]})}export{Ie as default};
