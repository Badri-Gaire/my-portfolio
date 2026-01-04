import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.badrigaire.com.np',
  integrations: [
    sitemap(),
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      workbox: {
        // globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/404$/]
      },
      manifest: {
        name: "Badri's Portfolio",
        short_name: "Badri Portfolio",
        description: "A personal portfolio built with Astro and Tailwind CSS",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});