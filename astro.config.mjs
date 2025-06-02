import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://shealeslein.com',
  build: {
    format: 'directory'
  },
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  integrations: []
});