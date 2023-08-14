import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // build: {
  //   lib: {
  //     entry: './src/chat-widget.ts',
  //     formats: ['es', 'cjs'],
  //     name: 'chat-widget',
  //     fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
  //   },
  //   target: 'esnext',
  //   minify: true,
  //   sourcemap: true
  // }
})
