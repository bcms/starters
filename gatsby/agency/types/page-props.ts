import { SeoGroup, HeaderEntryMeta, FooterEntryMeta } from '../bcms/types';

export interface PageData<
  Page = {
    meta: {
      en: {
        title: string;
        seo?: SeoGroup;
      };
    };
  },
> {
  location: string;
  defaultTitle?: string;
  page: {
    bcms: Page;
  };
  header: {
    bcms: {
      meta: {
        en: HeaderEntryMeta;
      };
    };
  };
  footer: {
    bcms: {
      meta: {
        en: FooterEntryMeta;
      };
    };
  };
}
