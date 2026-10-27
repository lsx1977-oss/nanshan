import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
});
