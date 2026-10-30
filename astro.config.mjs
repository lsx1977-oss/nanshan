import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // 全站 CSS 很小（約 3.5 KiB），直接內嵌到每個頁面，避免「轉譯封鎖」多一次請求
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
});
