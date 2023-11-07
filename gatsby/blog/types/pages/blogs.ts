import {
  BCMSPropEnumData,
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { BlogEntryMeta, BlogsPageEntryMeta } from '../../bcms/types';

export interface BlogLite {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  description: BCMSPropRichTextDataParsed;
  date: number;
  category: BCMSPropEnumData;
}

export interface BlogsPageData {
  meta: {
    en: BlogsPageEntryMeta;
  };
  blogs: BlogLite[];
}

export interface BlogPageData {
  meta: {
    en: BlogEntryMeta;
  };
  content: {
    en: BCMSPropRichTextDataParsed;
  };
}
