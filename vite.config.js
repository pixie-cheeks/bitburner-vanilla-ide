import { defineConfig } from 'viteburner';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/src': resolve(__dirname, 'src'),
    },
  },
  build: { minify: false, outDir: 'dist', emptyOutDir: true },
  viteburner: {
    watch: [{ pattern: 'src/**/*.{js,script,txt}' }],
    sourcemap: 'inline',
  },
});
