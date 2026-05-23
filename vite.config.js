import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react/compiler-runtime': 'react'
    }
  },
  optimizeDeps: {
    include: ['sanity', '@sanity/client', '@sanity/image-url', 'styled-components']
  }
})
