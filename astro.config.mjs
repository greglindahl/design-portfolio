import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://greglindahl.github.io',
  base: '/design-portfolio',
  integrations: [mdx()],
});
