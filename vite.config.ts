import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Cloudflare Pages serves the app at the domain root and sets CF_PAGES=1 during
// its builds; GitHub Pages serves it under the repo subpath. Switch the base per
// host so both deployments keep working off the same source.
const base = process.env.CF_PAGES ? '/' : '/ai-mavericks/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base,
  plugins: [tailwindcss(), react()],
  // Disable HMR in test mode so Playwright's networkidle state can settle.
  server: mode === 'test' ? { hmr: false } : {},
}))
