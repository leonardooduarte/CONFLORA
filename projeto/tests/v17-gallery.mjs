import assert from 'node:assert/strict';
import fs from 'node:fs';
const app=fs.readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');
const component=fs.readFileSync(new URL('../src/features/KineticGallery.jsx',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../src/features/KineticGallery.css',import.meta.url),'utf8');
assert.match(app,/import KineticGallery from/);
assert.match(app,/<KineticGallery lang={lang} onExplore=/);
assert.match(component,/useVelocity\(scrollY\)/,'Use true scroll velocity, not progress');
assert.match(component,/useReducedMotion\(\)/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.ok(!component.includes('cdn.21st.dev'),'No remote, arbitrary stock imagery');
assert.ok(!component.includes('unsplash.com'),'Use owned/verified local imagery');
assert.match(component,/botanical\/commelina-erecta\.webp/);
assert.match(component,/botanical\/echinacea-pallida\.webp/);
const images=[...component.matchAll(/src:\s*'([^']+)'/g)].map(m=>m[1]);
assert.equal(images.length,9);
for(const image of images){const path=new URL('../public/'+image,import.meta.url);assert.ok(fs.existsSync(path),'Missing '+image)}
console.log('V17 gallery static and asset checks passed ('+images.length+' assets)');
