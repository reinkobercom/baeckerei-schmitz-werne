// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// URLs wie auf der alten Seite: ohne Schrägstrich am Ende (/impressum, nicht /impressum/)
export default defineConfig({
  site: 'https://www.schmitz-werne.de',
  trailingSlash: 'never',
  redirects: {
    // alte Onepage-Sitemap-Adresse weiter gültig halten
    '/sitemap.xml': '/sitemap-index.xml',
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/danke') && !page.includes('/api/'),
    }),
  ],
});
