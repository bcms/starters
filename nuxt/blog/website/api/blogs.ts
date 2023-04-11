import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  BlogEntry,
  BlogEntryMeta,
  BlogsPageEntry,
  BlogsPageEntryMeta,
} from "~~/bcms/types";
import { BlogLight, BlogsPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const blogToLight = (blogs: BlogEntry[]): BlogLight[] => {
  return blogs.map((e) => {
    const meta = e.meta.en as BlogEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      cover: meta.cover,
      description: meta.description,
      date: meta.date,
      category: meta.category,
    };
  });
};

export const BlogsApi = createBcmsMostServerRoutes({
  "/blogs.json": apiRoute<BlogsPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "blogs_page",
        async () => true
      )) as unknown as BlogsPageEntry;

      if (!entry) {
        throw new Error("Blogs page entry does not exist.");
      }

      const blogs = (await bcms.content.entry.find(
        "blog",
        async () => true
      )) as unknown as BlogEntry[];

      return {
        meta: entry.meta.en as BlogsPageEntryMeta,
        blogs: blogToLight(
          blogs.sort((a, b) => (b.meta.en?.date || 0) - (a.meta.en?.date || 0))
        ),
      };
    },
  }),
});
