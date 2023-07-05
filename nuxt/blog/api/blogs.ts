import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  BlogEntry,
  BlogEntryMeta,
  BlogsPageEntry,
  BlogsPageEntryMeta,
} from "~~/bcms/types";
import { BlogLight, BlogPageData, BlogsPageData } from "~~/types";
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
  "/blogs/:slug/data.json": apiRoute<BlogPageData>({
    method: "get",
    async handler({ bcms, params }) {
      const entry = (await bcms.content.entry.findOne(
        "blog",
        async (e) => e.meta.en.slug === params.slug
      )) as unknown as BlogEntry;

      if (!entry) {
        throw new Error("Blog entry does not exist.");
      }

      const blogs = (await bcms.content.entry.find(
        "blog",
        async (e) => e.meta.en.slug !== params.slug
      )) as unknown as BlogEntry[];

      return {
        meta: entry.meta.en as BlogEntryMeta,
        content: entry.content.en as BCMSPropRichTextDataParsed,
        otherBlogs: blogToLight(
          blogs.sort((a, b) => (b.meta.en?.date || 0) - (a.meta.en?.date || 0))
        ).slice(0, 3),
      };
    },
  }),
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
