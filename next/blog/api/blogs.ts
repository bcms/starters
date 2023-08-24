import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import {
  BlogEntry,
  BlogEntryMeta,
  BlogsPageEntry,
  BlogsPageEntryMeta,
} from "~~/bcms/types";
import {APIResponse, BlogLight, BlogPageData, BlogsPageData} from "~~/types";
import {GenericApi} from "~/api/_api-route";

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

export class BlogsApi extends GenericApi {
  public async getBlogs(): Promise<APIResponse<BlogsPageData>> {
    try {
      const entry = (await this.bcms.content.entry.findOne(
          'blogs_page',
          async () => true
      )) as BlogsPageEntry;

      if (!entry) {
        throw new Error('Blogs page entry does not exist.');
      }

      const blogs = (await this.bcms.content.entry.find(
          'blog',
          async () => true
      )) as BlogEntry[];

      const data: BlogsPageData = {
        meta: entry.meta.en as BlogsPageEntryMeta,
        blogs: blogToLight(
            blogs.sort((a, b) => (b.meta.en?.date || 0) - (a.meta.en?.date || 0))
        ),
      };

      return await this.handler(data);
    } catch (error) {
      console.error(error);
      throw new Error('Cannot fetch blogs at this time. Something went wrong.');
    }
  }

  public async getSingleBlog(
      params: { [p: string]: string }
  ): Promise<APIResponse<BlogPageData>> {
    try {
      const entry = (await this.bcms.content.entry.findOne(
          'blog',
          async (e) => e.meta.en.slug === params.slug
      )) as BlogEntry;

      if (!entry) {
        throw new Error('Blog entry does not exist.');
      }

      const blogs = (await this.bcms.content.entry.find(
          'blog',
          async (e) => e.meta.en.slug !== params.slug
      )) as BlogEntry[];

      const data: BlogPageData = {
        meta: entry.meta.en as BlogEntryMeta,
        content: entry.content.en as BCMSPropRichTextDataParsed,
        otherBlogs: blogToLight(
            blogs.sort((a, b) => (b.meta.en?.date || 0) - (a.meta.en?.date || 0))
        ).slice(0, 3),
      };

      return await this.handler(data);
    } catch (error) {
      console.error(error);
      throw new Error('Cannot fetch blog at this time. Something went wrong.');
    }
  }
}

