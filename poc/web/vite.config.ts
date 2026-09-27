import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
