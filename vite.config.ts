import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Served at the domain root on Cloudflare Pages (the canonical host).
  base: '/',
  plugins: [tailwindcss(), react()],
  // Disable HMR in test mode so Playwright's networkidle state can settle.
  server: mode === 'test' ? { hmr: false } : {},
}))
