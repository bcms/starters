import { HeaderEntryMeta, LegalEntry } from '../bcms/types';
import { FooterEntryMeta } from '../bcms/types/entry/footer';
import { SeoGroup } from '../bcms/types';

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
  legal: {
    nodes: Array<{
      bcms: LegalEntry;
    }>;
  };
}
