/// <reference types="vitest/config" />
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Cache do shell: JS, CSS, HTML, fontes e imagens do build
        globPatterns: ['**/*.{js,css,html,woff,woff2,webp,png,svg,ico}'],
        // PDFs do WordPress são servidos em runtime — não pré-cachear
        globIgnores: ['**/*.pdf'],
        runtimeCaching: [
          {
            // Fontes do Google — cache de 1 ano
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            // Materiais do WordPress — network-first, fallback em cache por 7 dias
            urlPattern: /^https:\/\/educarepedagogia\.com\.br\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'materiais-wordpress',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
      manifest: false, // manifest.json já está em public/
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
