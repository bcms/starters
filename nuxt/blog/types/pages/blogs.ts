import {
  BCMSPropEnumData,
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from "@becomes/cms-client/types";
import { BlogEntryMeta, BlogsPageEntryMeta } from "~~/bcms/types";

export interface BlogLight {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  description: BCMSPropRichTextDataParsed;
  date: number;
  category: BCMSPropEnumData;
}

export interface BlogsPageData {
  meta: BlogsPageEntryMeta;
  blogs: BlogLight[];
}

export interface BlogPageData {
  meta: BlogEntryMeta;
  content: BCMSPropRichTextDataParsed;
  otherBlogs: BlogLight[];
}
