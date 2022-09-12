import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('../content/**/*.mdx', {
  eager: true,
});

const posts = Object.values(postImportResult);

const generateSlug = post => {
  return post.file.split('/').reverse()[0].replace('.mdx', '');
};

export const get = () =>
  rss({
    title: 'VC-Team Blog',
    description: 'VC-Team Blog - Indie Devs Team',
    site: import.meta.env.SITE,
    items: posts.map(post => ({
      title: post.title,
      description: post.desc,
      link: generateSlug(post),
      pubDate: new Date(post.date),
    })),
    // (optional) inject custom xml
    customData: `<language>vi-vn</language>`,
  });
