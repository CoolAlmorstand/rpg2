import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({ 
  plugins: [
    tailwindcss(), 
    sveltekit()
  ],
  server: {
    watch: {
      usePolling: true,
      ignored: ["!**/node_modules/@terabithia/**"]
    }
  },
  optimizeDeps: {
    exclude: [
      "@terabithia/shared-types",
      "@terabithia/terrain-generator",
    ],
    force: true
  }
});
