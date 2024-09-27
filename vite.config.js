import { defineConfig } from 'viteburner';
import { resolve } from 'path';
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/src': resolve(__dirname, 'src'),
    },
  },
  build: { minify: false },
  viteburner: {
    watch: [{ pattern: 'src/**/*.{js,script,txt}' }],
  },
});
