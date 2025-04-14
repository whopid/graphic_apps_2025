import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),     tailwindcss(), tsconfigPaths()  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
