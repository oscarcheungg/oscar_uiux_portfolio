import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      // Vendored Framer components import from 'framer'; point that at our shim.
      framer: fileURLToPath(new URL('./src/vendor/framer-shim.ts', import.meta.url)),
    },
  },
})
