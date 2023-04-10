import { BlogEntry, BlogEntryMeta } from "~~/bcms/types";
import { BlogLight } from "~~/types";

export const blogToLight = (blogs: BlogEntry[]): BlogLight[] => {
  return blogs.map((e) => {
    const meta = e.meta.en as BlogEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      cover: meta.cover,
      description: meta.description,
      date: meta.date,
    };
  });
};
