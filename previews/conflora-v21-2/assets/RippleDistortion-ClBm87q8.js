import{j as xe}from"./index-C7okp7gA.js";import{a as y}from"./gsap-vendor-CayXo8le.js";import{R as we,a as ye,G as Te,P as re,M as ne,b as be,T as De}from"./webgl-vendor-DcvrfCN1.js";import"./react-vendor-8Znzgoit.js";import"./motion-vendor-BLqCZl72.js";const d=100,se={low:.4,medium:.7,high:1},S=1.5,Me=Math.log(500),Ee=`
precision highp float;

attribute vec2 position;
attribute vec2 uv;
attribute vec2 iOffset;
attribute vec2 iScale;
attribute float iOpacity;

varying vec2 vUv;
varying float vOpacity;

void main() {
  vUv = uv;
  vOpacity = iOpacity;
  gl_Position = vec4(iOffset + position * iScale, 0.0, 1.0);
}
`,Se=`
precision highp float;

varying vec2 vUv;
varying float vOpacity;

uniform float uRings;

const float PI = 3.141592653589793;
const float EDGE = 0.006737947;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = dot(p, p);
  if (r > 1.0) discard;

  float brush = (exp(-r * 5.0) - EDGE) / (1.0 - EDGE);

  brush *= 0.55 + 0.45 * cos(sqrt(r) * PI * 2.0 * uRings);

  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.0);
}
`,Ae=`
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Re=`
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uTexel;
uniform vec3 uTint;
uniform vec3 uHighlight;
uniform float uStrength;
uniform float uSwirl;
uniform float uDispersion;
uniform float uGlint;
uniform float uTintAmount;
uniform float uGrayscale;

const float TAU = 6.283185307179586;

vec2 coverUV(vec2 uv) {
  vec2 safe = max(uTextureSize, vec2(1.0));
  vec2 s = uResolution / safe;
  vec2 scaledSize = safe * max(s.x, s.y);
  vec2 offset = (uResolution - scaledSize) * 0.5;
  return (uv * uResolution - offset) / scaledSize;
}

void main() {
  float amount = texture2D(uDisplacement, vUv).r;
  vec2 base = coverUV(vUv);

  float theta = amount * uSwirl * TAU;
  vec2 dir = vec2(sin(theta), cos(theta));
  vec2 push = dir * amount * uStrength;

  vec3 color;
  if (uDispersion > 0.001) {
    float split = uDispersion * 0.25;
    color.r = texture2D(uTexture, base + push * (1.0 + split)).r;
    color.g = texture2D(uTexture, base + push).g;
    color.b = texture2D(uTexture, base + push * (1.0 - split)).b;
  } else {
    color = texture2D(uTexture, base + push).rgb;
  }

  if (uGrayscale > 0.001) {
    color = mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), uGrayscale);
  }

  if (uTintAmount > 0.001) {
    color = mix(color, color * uTint * 1.9, clamp(amount * 1.6, 0.0, 1.0) * uTintAmount);
  }

  if (uGlint > 0.001) {
    float ex = texture2D(uDisplacement, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDisplacement, vUv - vec2(uTexel.x, 0.0)).r;
    float ey = texture2D(uDisplacement, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDisplacement, vUv - vec2(0.0, uTexel.y)).r;
    vec3 normal = normalize(vec3(-ex * 26.0, -ey * 26.0, 1.0));
    vec3 light = normalize(vec3(-0.35, 0.55, 1.0));
    float raw = pow(max(dot(normal, light), 0.0), 22.0);
    float flatSpec = pow(max(light.z, 0.0), 22.0);
    color += uHighlight * clamp((raw - flatSpec) / max(1.0 - flatSpec, 0.0001), 0.0, 1.0) * uGlint;
  }

  gl_FragColor = vec4(color, 1.0);
}
`,A=T=>{const h=T.replace("#",""),g=h.length===3?h.split("").map(v=>v+v).join(""):h,s=parseInt(g,16);return Number.isNaN(s)?[1,1,1]:[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255]},_e=({src:T="https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=3416&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",brushSize:h=150,strength:g=.2,swirl:s=1,rings:v=4,spread:ue=5,fade:ce=3,spacing:le=15,dispersion:R=0,glint:z=0,tint:G="#a855f7",tintAmount:U=.1,grayscale:O=!0,highlightColor:F="#ffffff",trigger:ve="hover",clickStrength:fe=2,quality:B="low",enabled:pe=!0,className:me="",style:de})=>{const V=y.useRef(null),x=y.useRef({}),_=y.useRef(null);return x.current={brushSize:h,spread:ue,fade:ce,spacing:le,clickStrength:fe,trigger:ve,enabled:pe},y.useEffect(()=>{const a=V.current;if(!a)return;const b=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,D=new we({alpha:!1,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),t=D.gl;t.clearColor(0,0,0,1);const f=t.canvas;f.style.width="100%",f.style.height="100%",f.style.display="block",a.appendChild(f);const j=new ye(t,{generateMipmaps:!1,minFilter:t.LINEAR,magFilter:t.LINEAR,wrapS:t.CLAMP_TO_EDGE,wrapT:t.CLAMP_TO_EDGE});let k=!1;const c=new window.Image;c.crossOrigin="anonymous",c.decoding="async",c.onload=()=>{k||(j.image=c,w.uTextureSize.value=[c.naturalWidth||1,c.naturalHeight||1])},c.src=T;const L=new Float32Array(d*2),N=new Float32Array(d*2),M=new Float32Array(d),q=Array.from({length:d},()=>({x:0,y:0,scale:S,target:S,size:1,opacity:0}));let P=0;const E=new Te(t,{position:{size:2,data:new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])},uv:{size:2,data:new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])},iOffset:{instanced:1,size:2,data:L},iScale:{instanced:1,size:2,data:N},iOpacity:{instanced:1,size:1,data:M}}),Y={uRings:{value:v}},X=new re(t,{vertex:Ee,fragment:Se,uniforms:Y,transparent:!0,depthTest:!1,depthWrite:!1,cullFace:!1});X.setBlendFunc(t.ONE,t.ONE);const he=new ne(t,{geometry:E,program:X,frustumCulled:!1}),C=new be(t,{width:2,height:2,depth:!1,minFilter:t.LINEAR,magFilter:t.LINEAR,wrapS:t.CLAMP_TO_EDGE,wrapT:t.CLAMP_TO_EDGE}),w={uTexture:{value:j},uDisplacement:{value:C.texture},uResolution:{value:[1,1]},uTextureSize:{value:[1,1]},uTexel:{value:[1,1]},uTint:{value:A(G)},uHighlight:{value:A(F)},uStrength:{value:g},uSwirl:{value:s},uDispersion:{value:R},uGlint:{value:z},uTintAmount:{value:U},uGrayscale:{value:O?1:0}},ge=new ne(t,{geometry:new De(t),program:new re(t,{vertex:Ae,fragment:Re,uniforms:w,depthTest:!1,depthWrite:!1})});_.current={wave:Y,composite:w};let p=1,m=1,H=!1;const Q=()=>{p=Math.max(1,a.clientWidth),m=Math.max(1,a.clientHeight),D.setSize(p,m),w.uResolution.value=[p,m];const o=se[B]||se.high,i=Math.max(2,Math.round(p*o)),e=Math.max(2,Math.round(m*o));C.setSize(i,e),w.uTexel.value=[1/i,1/e]},$=new ResizeObserver(()=>{H=!0});$.observe(a),Q();const J=(o,i,e)=>{const l=x.current,u=q[P];P=(P+1)%d,u.x=o,u.y=i,u.scale=S*e,u.target=S*Math.max(1,l.spread)*e,u.size=Math.max(1,l.brushSize),u.opacity=1},K=(o,i)=>{const e=a.getBoundingClientRect();return e.width===0||e.height===0||o<e.left||o>e.right||i<e.top||i>e.bottom?null:[o-e.left,e.height-(i-e.top)]};let Z=0,ee=0;const te=o=>{const i=x.current;if(!i.enabled||b||i.trigger==="click")return;const e=K(o.clientX,o.clientY);if(!e)return;const l=Math.max(1,i.spacing);(Math.abs(e[0]-Z)>l||Math.abs(e[1]-ee)>l)&&(J(e[0],e[1],1),Z=e[0],ee=e[1])},oe=o=>{const i=x.current;if(!i.enabled||b||i.trigger==="hover")return;const e=K(o.clientX,o.clientY);e&&J(e[0],e[1],Math.max(1,i.clickStrength))};window.addEventListener("pointermove",te,{passive:!0}),window.addEventListener("pointerdown",oe,{passive:!0});let I=0,W=0;const ae=o=>{H&&(H=!1,Q()),I=requestAnimationFrame(ae);const i=W?Math.min(.05,(o-W)/1e3):0;W=o;const e=x.current,l=b?0:1-Math.exp(-i*1.09),u=b?1:Math.exp(-i*Me/Math.max(.15,e.fade));for(let n=0;n<d;n+=1){const r=q[n];if(r.opacity<=0){M[n]=0;continue}if(r.opacity*=u,r.scale+=(r.target-r.scale)*l,r.opacity<.002){r.opacity=0,M[n]=0;continue}const ie=r.scale*r.size/2;L[n*2]=r.x/p*2-1,L[n*2+1]=r.y/m*2-1,N[n*2]=ie/p*2,N[n*2+1]=ie/m*2,M[n]=r.opacity}E.attributes.iOffset.needsUpdate=!0,E.attributes.iScale.needsUpdate=!0,E.attributes.iOpacity.needsUpdate=!0,D.render({scene:he,target:C,clear:!0}),D.render({scene:ge})};return I=requestAnimationFrame(ae),()=>{k=!0,cancelAnimationFrame(I),$.disconnect(),window.removeEventListener("pointermove",te),window.removeEventListener("pointerdown",oe),_.current=null,f.parentNode===a&&a.removeChild(f);const o=t.getExtension("WEBGL_lose_context");o&&o.loseContext()}},[T,B]),y.useEffect(()=>{const a=_.current;a&&(a.wave.uRings.value=v,a.composite.uStrength.value=g,a.composite.uSwirl.value=s,a.composite.uDispersion.value=R,a.composite.uGlint.value=z,a.composite.uTintAmount.value=U,a.composite.uGrayscale.value=O?1:0,a.composite.uHighlight.value=A(F),a.composite.uTint.value=A(G))},[v,g,s,R,z,U,O,F,G]),xe.jsx("div",{ref:V,className:`ripple-distortion ${me}`.trim(),style:de})};export{_e as default};
