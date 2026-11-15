import{j as r,r as H,a as M}from"./index-vkAhkTAX.js";import{a as d,g as O,R as Y}from"./gsap-vendor-mXmR0H0q.js";import{R as J,T as K,P as Q,M as Z,a as V}from"./webgl-vendor-DcvrfCN1.js";import"./react-vendor-CO5h7jqP.js";import"./motion-vendor-DCJGBtam.js";const U={melt:0,ripple:1,shear:2,swirl:3},ee=[{image:"https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop",caption:"One"},{image:"https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop",caption:"Two"},{image:"https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop",caption:"Three"},{image:"https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=1600&auto=format&fit=crop",caption:"Four"}],te=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,re=`
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
`;function se(a){const t=new Uint8Array(64);for(let s=0;s<16;s++)t[s*4]=24,t[s*4+1]=24,t[s*4+2]=28,t[s*4+3]=255;return new V(a,{image:t,width:4,height:4,generateMipmaps:!1})}function G(a){let e=(a||"#000000").replace("#","");e.length===3&&(e=e.split("").map(s=>s+s).join(""));const t=parseInt(e,16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}class ie{constructor(e,{items:t,startIndex:s,reducedMotion:u,getOptions:c,onIndexChange:n,dprCap:w}){this.container=e,this.items=t,this.getOptions=c,this.onIndexChange=n,this.reducedMotion=u,this.current=s,this.animating=!1,this.dragging=!1,this.dragDir=0,this.shownIndex=s,this.tween=null,this.renderer=new J({alpha:!1,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,w)}),this.gl=this.renderer.gl,this.gl.clearColor(.05,.05,.06,1),this.canvas=this.gl.canvas,this.canvas.className="morph-slider-canvas",e.appendChild(this.canvas),this.geometry=new K(this.gl),this.textures=this.items.map(()=>se(this.gl)),this.sizes=this.items.map(()=>[1,1]);const l=this.getOptions();this.program=new Q(this.gl,{vertex:te,fragment:re,uniforms:{tCurrent:{value:this.textures[this.current]},tNext:{value:this.textures[this.current]},uResolution:{value:[1,1]},uCurrentSize:{value:this.sizes[this.current]},uNextSize:{value:this.sizes[this.current]},uProgress:{value:0},uDir:{value:1},uMode:{value:U[l.transition]??0},uIntensity:{value:l.intensity},uScale:{value:l.scale},uAberration:{value:l.aberration},uDrift:{value:l.drift},uTime:{value:0},uReduce:{value:u?1:0},uPointer:{value:[.5,.5]},uOverlay:{value:G(l.overlayColor)}}}),this.mesh=new Z(this.gl,{geometry:this.geometry,program:this.program}),this.boundContextLost=this.onContextLost.bind(this),this.canvas.addEventListener("webglcontextlost",this.boundContextLost,!1),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.loadTextures(),this.boundLoop=this.loop.bind(this),this.raf=requestAnimationFrame(this.boundLoop)}loadTextures(){this.items.forEach((e,t)=>{const s=new Image;s.crossOrigin="anonymous",s.src=e.image,s.onload=()=>{const u=new V(this.gl,{generateMipmaps:!1});u.image=s,this.textures[t]=u,this.sizes[t]=[s.naturalWidth||1,s.naturalHeight||1],t===this.current&&(this.program.uniforms.tCurrent.value=u,this.program.uniforms.uCurrentSize.value=this.sizes[t])},s.onerror=()=>{}})}resize(){const e=this.container.getBoundingClientRect(),t=Math.max(e.width,1),s=Math.max(e.height,1);this.renderer.setSize(t,s),this.program.uniforms.uResolution.value=[this.gl.canvas.width,this.gl.canvas.height],this.renderer.render({scene:this.mesh})}syncOptions(){const e=this.getOptions();this.program.uniforms.uMode.value=U[e.transition]??0,this.program.uniforms.uIntensity.value=e.intensity,this.program.uniforms.uScale.value=e.scale,this.program.uniforms.uAberration.value=e.aberration,this.program.uniforms.uDrift.value=e.drift,this.program.uniforms.uOverlay.value=G(e.overlayColor)}loop(e){this.program.uniforms.uTime.value=e*.001,!this.dragging&&!this.animating&&this.syncOptions(),this.renderer.render({scene:this.mesh}),this.raf=requestAnimationFrame(this.boundLoop)}wrap(e){const t=this.items.length;return(e%t+t)%t}prepareNext(e){const t=this.wrap(this.current+e);return this.program.uniforms.tCurrent.value=this.textures[this.current],this.program.uniforms.uCurrentSize.value=this.sizes[this.current],this.program.uniforms.tNext.value=this.textures[t],this.program.uniforms.uNextSize.value=this.sizes[t],this.program.uniforms.uDir.value=e,t}goTo(e){if(this.animating||this.dragging||this.items.length<2)return;const t=this.getOptions();if(!t.loop){const c=this.current+e;if(c<0||c>this.items.length-1)return}this.syncOptions();const s=this.prepareNext(e);this.animating=!0,this.announce(s);const u=this.reducedMotion?Math.min(t.duration,.4):t.duration;this.tween=O.fromTo(this.program.uniforms.uProgress,{value:0},{value:1,duration:u,ease:t.ease,onComplete:()=>this.commit(s)})}announce(e){e!==this.shownIndex&&(this.shownIndex=e,this.onIndexChange&&this.onIndexChange(e))}commit(e){this.current=e,this.program.uniforms.tCurrent.value=this.textures[e],this.program.uniforms.uCurrentSize.value=this.sizes[e],this.program.uniforms.uProgress.value=0,this.animating=!1,this.tween=null,this.announce(e)}next(){this.goTo(1)}prev(){this.goTo(-1)}setPointer(e,t){this.program.uniforms.uPointer.value=[e,t]}beginDrag(){return this.animating||this.items.length<2?!1:(this.dragging=!0,this.dragDir=0,this.syncOptions(),!0)}drag(e){if(!this.dragging)return;const t=this.getOptions(),s=e<0?1:-1;if(!t.loop){const c=this.current+s;if(c<0||c>this.items.length-1){this.program.uniforms.uProgress.value=0;return}}s!==this.dragDir&&(this.dragDir=s,this.prepareNext(s));const u=Math.min(Math.abs(e),1);this.program.uniforms.uProgress.value=u,this.announce(u>.5?this.wrap(this.current+s):this.current)}endDrag(){if(!this.dragging)return;this.dragging=!1;const e=this.program.uniforms.uProgress.value;if(this.dragDir===0)return;const t=this.wrap(this.current+this.dragDir),s=this.reducedMotion?.3:.5;this.animating=!0,e>.4?(this.announce(t),this.tween=O.to(this.program.uniforms.uProgress,{value:1,duration:s,ease:"power2.out",onComplete:()=>this.commit(t)})):(this.announce(this.current),this.tween=O.to(this.program.uniforms.uProgress,{value:0,duration:s,ease:"power2.out",onComplete:()=>{this.animating=!1,this.tween=null}}))}onContextLost(e){e.preventDefault(),cancelAnimationFrame(this.raf)}destroy(){cancelAnimationFrame(this.raf),this.tween&&this.tween.kill(),this.resizeObserver.disconnect(),this.canvas.removeEventListener("webglcontextlost",this.boundContextLost),this.textures.forEach(t=>{t&&t.texture&&this.gl.deleteTexture(t.texture)}),this.program&&this.program.program&&this.gl.deleteProgram(this.program.program);const e=this.gl.getExtension("WEBGL_lose_context");e&&e.loseContext(),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}function ne({items:a=ee,startIndex:e=0,transition:t="melt",duration:s=1.1,ease:u="power2.inOut",intensity:c=.55,scale:n=2.4,aberration:w=.35,drift:l=.4,autoplay:v=!1,autoplayDelay:b=4,loop:y=!0,radius:N=16,overlayColor:j="#000000",showCaptions:f=!0,showControls:E=!0,showIndicators:z=!0,className:h="",...p}){const g=d.useRef(null),o=d.useRef(null),[x,A]=d.useState(e),[L,I]=d.useState(!1),F=d.useRef();F.current={transition:t,duration:s,ease:u,intensity:c,scale:n,aberration:w,drift:l,overlayColor:j,loop:y},d.useEffect(()=>{if(!g.current)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=new ie(g.current,{items:a,startIndex:e,reducedMotion:i,dprCap:2,getOptions:()=>F.current,onIndexChange:A});return o.current=m,A(e),()=>{m.destroy(),o.current=null}},[a,e]);const R=d.useCallback(()=>o.current?.next(),[]),k=d.useCallback(()=>o.current?.prev(),[]);d.useEffect(()=>{if(!v||L)return;const i=setTimeout(()=>o.current?.next(),Math.max(b,1)*1e3);return()=>clearTimeout(i)},[v,b,L,x]),d.useEffect(()=>{const i=g.current;if(!i)return;let m=0,T=1,D=!1;const q=S=>{const C=i.getBoundingClientRect();T=C.width||1,m=S.clientX;const $=(S.clientX-C.left)/C.width,X=(S.clientY-C.top)/C.height;if(o.current?.setPointer($,1-X),D=o.current?.beginDrag()??!1,D&&i.setPointerCapture)try{i.setPointerCapture(S.pointerId)}catch{}},B=S=>{if(!D)return;const C=(S.clientX-m)/T;o.current?.drag(C)},P=()=>{D&&(D=!1,o.current?.endDrag())};return i.addEventListener("pointerdown",q),i.addEventListener("pointermove",B),i.addEventListener("pointerup",P),i.addEventListener("pointercancel",P),()=>{i.removeEventListener("pointerdown",q),i.removeEventListener("pointermove",B),i.removeEventListener("pointerup",P),i.removeEventListener("pointercancel",P)}},[]);const _=d.useCallback(i=>{i.key==="ArrowRight"?(i.preventDefault(),R()):i.key==="ArrowLeft"&&(i.preventDefault(),k())},[R,k]),W=a.some(i=>i.caption);return r.jsxs("div",{className:`morph-slider ${h}`.trim(),style:{borderRadius:`${N}px`,"--ms-swap":`${(s*.66).toFixed(3)}s`,"--ms-dot":`${(s*.45).toFixed(3)}s`},onMouseEnter:()=>I(!0),onMouseLeave:()=>I(!1),...p,children:[r.jsx("div",{ref:g,className:"morph-slider-stage",role:"group","aria-roledescription":"carousel","aria-label":"Image morph slider",tabIndex:0,onKeyDown:_}),f&&W&&r.jsx("div",{className:"morph-slider-caption","aria-live":"polite",children:a.map((i,m)=>i.caption?r.jsx("span",{"aria-hidden":m===x?void 0:!0,className:`morph-slider-caption-text ${m===x?"is-active":""}`,children:i.caption},m):null)}),E&&r.jsxs("div",{className:"morph-slider-controls",children:[r.jsx("button",{type:"button",className:"morph-slider-btn","aria-label":"Previous slide",onClick:k,children:r.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",children:r.jsx("path",{d:"M15 5l-7 7 7 7",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),r.jsx("button",{type:"button",className:"morph-slider-btn","aria-label":"Next slide",onClick:R,children:r.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",children:r.jsx("path",{d:"M9 5l7 7-7 7",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),z&&r.jsx("div",{className:"morph-slider-indicators",role:"tablist","aria-label":"Slides",children:a.map((i,m)=>r.jsx("button",{type:"button",role:"tab","aria-selected":m===x,"aria-label":`Go to slide ${m+1}`,className:`morph-slider-dot ${m===x?"is-active":""}`,onClick:()=>{const T=o.current;!T||m===x||T.goTo(m>x?1:-1)}},m))})]})}class ae extends Y.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError()}render(){return this.state.failed?null:this.props.children}}function oe({items:a,lang:e}){const t=d.useRef(null),[s,u]=d.useState(0),[c,n]=d.useState("loading"),[w,l]=d.useState(!1);return d.useEffect(()=>{let v=!0,b=0,y;const N=[];let j=()=>{};n("loading"),l(!1);try{const h=document.createElement("canvas"),p=h.getContext("webgl2")||h.getContext("webgl");if(!p)return n("error"),()=>{v=!1};p.getExtension("WEBGL_lose_context")?.loseContext()}catch{return n("error"),()=>{v=!1}}const f=()=>{v&&(n("error"),cancelAnimationFrame(b))};Promise.all(a.map(h=>new Promise((p,g)=>{const o=new Image;N.push(o),o.onload=()=>o.decode().then(p,g),o.onerror=g,o.src=h.image}))).then(()=>{v&&l(!0)},f);const E=performance.now(),z=()=>{if(!v)return;const h=t.current?.querySelector("canvas");if(h){h.dataset.observed||(h.dataset.observed="true",h.addEventListener("webglcontextlost",f),j=()=>h.removeEventListener("webglcontextlost",f));const p=h.getContext("webgl2")||h.getContext("webgl");if(p&&!p.isContextLost()){const g=new Uint8Array(4);let o=765,x=0;for(const A of[.2,.5,.8])for(const L of[.2,.5,.8]){p.readPixels(Math.floor(p.drawingBufferWidth*A),Math.floor(p.drawingBufferHeight*L),1,1,p.RGBA,p.UNSIGNED_BYTE,g);const I=g[0]+g[1]+g[2];o=Math.min(o,I),x=Math.max(x,I)}if(x-o>15){n("ready");return}}}if(performance.now()-E>12e3){f();return}b=requestAnimationFrame(z)};return y=setTimeout(()=>{b=requestAnimationFrame(z)},0),()=>{v=!1,cancelAnimationFrame(b),clearTimeout(y),j(),N.forEach(h=>{h.onload=null,h.onerror=null})}},[a,s]),r.jsxs("div",{ref:t,className:"morph-wrapper","data-status":c,"aria-busy":c==="loading",children:[w&&r.jsx(ae,{onError:()=>n("error"),children:r.jsx(ne,{items:a,transition:"melt",intensity:.55,aberration:.35,drift:.4,autoplay:!1})},s),c!=="ready"&&r.jsxs("div",{className:"gallery-cover",children:[r.jsx("img",{src:a[0].image,alt:e==="pt"?"Prévia ilustrativa":"Illustrative preview"}),r.jsxs("div",{role:"status",children:[r.jsx("p",{children:c==="error"?e==="pt"?"Não foi possível iniciar a galeria animada.":"The animated gallery could not start.":e==="pt"?"Carregando possibilidades…":"Loading possibilities…"}),c==="error"&&r.jsx("button",{className:"btn",onClick:()=>u(v=>v+1),children:e==="pt"?"Tentar novamente":"Try again"})]})]})]})}const le=[{image:M("scene-observations.png"),caption:"01 / Observe"},{image:M("scene-garden.png"),caption:"02 / Explore"},{image:M("scene-plan.png"),caption:"03 / Plan"}];function pe({project:a,change:e,lang:t,onPlants:s,onRoots:u,onStudio:c}){const n=t==="pt",w=n?[["rain","Jardim de chuva","Depressão vegetada que recebe escoamento e pode favorecer retenção e infiltração quando projetada para o local.","Investigar solo, afastamentos, área contribuinte, extravasamento e redes. Não é solução automática para um ponto já alagado.","Observar sedimentos, entrada/saída e plantas; manter registros após chuva."],["vegetated","Área vegetada","Cobertura do solo e raízes participam da relação entre água e superfície.","Investigar clima, luz, solo, disponibilidade de espaço e origem regional das plantas. Vegetar não elimina risco de inundação.","Acompanhar pegamento, plantas indesejadas e necessidade local de irrigação."],["permeable","Superfície permeável","Sistema de superfície e base que permite passagem de água em condições previstas no projeto.","Verificar cargas, base, solo, contaminação e manutenção. Um desenho sobre uma foto não comprova permeabilidade.","Investigar entupimento e manutenção do sistema com orientação técnica."]]:[["rain","Rain garden","A vegetated depression receives runoff and may support retention and infiltration when designed for the site.","Check soil, setbacks, contributing area, overflow and utilities. Not an automatic fix for an already flooded spot.","Observe sediment, inlet/outlet and plants; keep post-rain records."],["vegetated","Vegetated area","Ground cover and roots participate in water–surface relationships.","Check climate, light, soil, space and plant origin. Vegetation does not remove flood risk.","Observe establishment, unwanted plants and locally appropriate watering."],["permeable","Permeable surface","A surface-and-base system allows water passage under designed conditions.","Check loading, base, soil, contamination and maintenance. A drawing does not prove permeability.","Investigate clogging and maintenance with technical support."]];return r.jsxs("main",{className:"knowledge-page",children:[r.jsxs("header",{className:"knowledge-heading",children:[r.jsxs("span",{className:"eyebrow",children:["CONFLORA / ",n?"ATLAS DE POSSIBILIDADES":"ATLAS OF POSSIBILITIES"]}),r.jsx("h1",{children:n?"Uma solução começa com perguntas.":"A solution starts with questions."}),r.jsx("p",{children:n?"Estudos ilustrativos. Explore o conceito, registre o interesse e verifique o lugar antes de agir.":"Illustrative studies. Explore the concept, record interest and check the site before acting."}),r.jsxs("div",{className:"btn-row",children:[r.jsx("button",{className:"btn",onClick:s,children:n?"Biblioteca de plantas":"Plant library"}),r.jsx("button",{className:"btn secondary",onClick:u,children:n?"Da chuva às raízes":"From rain to roots"})]})]}),r.jsx(oe,{items:le,lang:t}),r.jsx("p",{className:"fine",children:n?"Esquemas conceituais, não resultados medidos.":"Conceptual diagrams, not measured results."}),r.jsx("section",{className:"solutions-list",children:w.map(([l,v,b,y,N],j)=>r.jsxs("article",{children:[r.jsxs("span",{className:"eyebrow",children:["0",j+1," / ",n?"INVESTIGAR":"INVESTIGATE"]}),r.jsx("h2",{children:v}),r.jsx("p",{children:b}),r.jsx("h3",{children:n?"Antes de escolher":"Before choosing"}),r.jsx("p",{children:y}),r.jsx("h3",{children:n?"Acompanhar":"Follow up"}),r.jsx("p",{children:N}),r.jsx("a",{href:l==="permeable"?"https://www.epa.gov/green-infrastructure/types-green-infrastructure":H.ia.url,children:n?"Referência técnica":"Technical reference"}),r.jsxs("div",{className:"btn-row",children:[a&&r.jsx("button",{className:"btn secondary","aria-pressed":a.solutions.includes(l),onClick:()=>e(f=>{f.solutions=f.solutions.includes(l)?f.solutions.filter(E=>E!==l):[...f.solutions,l]}),children:a.solutions.includes(l)?n?"Remover interesse":"Remove interest":n?"Investigar no meu plano":"Investigate in my plan"}),r.jsxs("button",{className:"text-action",onClick:c,children:[n?"Explorar no meu espaço":"Explore in my space"," ›"]})]})]},l))})]})}export{pe as default};
