import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { BlogEntryMeta } from '@/bcms/types';

export interface BlogsPageData {
  blogs: BlogEntryMeta[];
}

export interface BlogPageData {
  meta: {
    en: BlogEntryMeta;
  };
  content: {
    en: BCMSPropRichTextDataParsed;
  };
  otherBlogs: BlogEntryMeta[];
}
