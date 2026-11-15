import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
 plugins:[react()],base:'./',
 build:{target:'es2022',rollupOptions:{output:{manualChunks:{
  'react-vendor':['react','react-dom'],
  'motion-vendor':['motion'],
  'gsap-vendor':['gsap','@gsap/react'],
  'webgl-vendor':['ogl']
 }}}},
 server:{host:'0.0.0.0'}
});
