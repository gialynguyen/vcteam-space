import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    site: 'https://gialynguyen.github.io',
    base: 'vcteam-space',
    markdown: {
      render: [
        {
          remarkPlugins: [],
          rehypePlugins: [
            'rehype-slug',
            [
              'rehype-autolink-headings',
              {
                behavior: 'wrap',
              },
            ],
          ],
          shikiConfig: {
            theme: 'poimandres',
            langs: [],
            wrap: false,
          },
        },
      ],
    },
    integrations: [sitemap(), mdx()],
  }
);
