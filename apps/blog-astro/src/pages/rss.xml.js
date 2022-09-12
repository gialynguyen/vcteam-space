import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('../content/**/*.mdx', {
  eager: true,
});

const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: 'VC-Team Blog',
    description: 'VC-Team Blog - Indie Devs Team',
    site: import.meta.env.SITE,
    items: posts.map(post => ({
      title: post.title,
      description: post.desc,
      link: post.slug,
      pubDate: new Date(post.date),
    })),
    // (optional) inject custom xml
    customData: `<language>vi-vn</language>`,
  });
