import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { BlogEntryMeta } from '~~/bcms/types';

export interface BlogLite {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  date: number;
}

export interface BlogsPageData {
  blogs: BlogLite[];
}

export interface BlogPageData {
  meta: BlogEntryMeta;
  content: BCMSPropRichTextDataParsed;
  otherBlogs: BlogLite[];
}
