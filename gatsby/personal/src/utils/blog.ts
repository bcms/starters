import { BlogEntry, BlogEntryMeta } from '../../bcms/types';
import { BlogLite } from '../../types';

export const blogToLite = (blog: BlogEntry): BlogLite => {
  const meta = blog.meta.en as BlogEntryMeta;
  return {
    title: meta.title,
    slug: meta.slug,
    cover: meta.cover,
    description: meta.description,
    date: meta.date,
    category: meta.category,
  };
};
