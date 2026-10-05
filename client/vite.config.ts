import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './src/setupTests.ts', // Archivo para extensiones de assertions
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
