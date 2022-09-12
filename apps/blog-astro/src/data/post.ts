export type Post = {
  title: string;
  slug: string;
  desc: string;
  author: string;
  timestamp: number;
  draft: boolean;
  date: string;
  file: string;
  img: string;
  Content: any;
};

type MDXInstance = import('astro').MDXInstance<any> & Record<string, any>;

const { MODE } = import.meta.env;


export function single(post: MDXInstance): Post {
  const slug = post.file.split('/').reverse()[0].replace('.mdx', '');
  return {
    title: post.title,
    Content: post.Content,
    desc: post.desc,
    author: post.author,
    date: post.date,
    file: post.file,
    slug: slug,
    img: post.img,
    draft: post.file.split('/').reverse()[1] === 'drafts',
    timestamp: new Date(post.date).valueOf(),
  };
}

export function published(posts: MDXInstance[]): Post[] {
  return posts
    .filter((post) => post.title)
    .map(post => single(post))
    .filter(post => MODE === 'development' || !post.draft)
    .sort((a, b) => b.timestamp - a.timestamp);
}
