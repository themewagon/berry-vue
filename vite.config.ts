import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['v-list-recognize-title'].includes(tag)
        }
      }
    }),
    vuetify({
      autoImport: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'dist/index.html'),
          dest: '.',
          rename: '404.html'
        }
      ],
      watch: {}
    })
  ],
  base: '/berry-vue/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  build: {
    chunkSizeWarningLimit: 1024 * 1024 // Set the limit to 1 MB
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.vue']
  }
});
