import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: {
          preload: 'electron/preload.ts',
        },
      },
    }),
  ],
  server: { port: 5173 },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
