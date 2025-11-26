import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: base: '/eko-pearl-hotel/'
  // For Vercel: base: '/' (default)
  base: '/', 
  build: {
    outDir: 'dist',
  },
});