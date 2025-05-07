import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {            
    'process.env': {}  
  },      
  base: process.env.GITHUB_PAGES
        ? "/portfoliosite/"
        : "./",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
