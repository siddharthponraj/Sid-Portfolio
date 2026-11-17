import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages (/Sid-Portfolio/) and any other host.
export default defineConfig({
  base: './',
  plugins: [react()],
  // three.js is large but lazy-loaded after first paint.
  build: { assetsDir: 'static', chunkSizeWarningLimit: 1000 },
});
