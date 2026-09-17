import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is deployed to https://<user>.github.io/portfolio/, so Vite needs a
// matching base path. When a custom domain is added later the site is served
// from the domain root instead — set BASE_PATH=/ in the build environment (see
// README → "Adding a custom domain") rather than editing this file.
const base = process.env.BASE_PATH ?? '/portfolio/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split the framework dependencies into their own long-lived chunks.
        // They change far less often than the site's own code, so a content
        // edit no longer invalidates ~150 kB of vendor JS in visitors' caches.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'vendor-motion'
          }
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
