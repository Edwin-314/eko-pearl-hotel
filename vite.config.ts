import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to '/your-repo-name/' if deploying to https://<USERNAME>.github.io/<REPO>/
  // For example: base: '/eko-pearl-hotel/',
  base: './', 
  build: {
    outDir: 'dist',
  },
});