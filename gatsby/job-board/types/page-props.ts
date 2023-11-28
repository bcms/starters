import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import {
  AboutPageEntryMeta,
  ContactPageEntryMeta,
  HeaderEntryMeta,
  HomePageEntryMeta,
  JobEntryMeta,
  LegalPageEntryMeta,
} from '../bcms/types';
import { FooterEntryMeta } from '../bcms/types/entry/footer';

export interface PageData<
  Page = {
    meta: {
      en:
        | JobEntryMeta
        | ContactPageEntryMeta
        | HomePageEntryMeta
        | AboutPageEntryMeta
        | LegalPageEntryMeta;
    };
    content: {
      en: BCMSPropRichTextDataParsed;
    };
  },
> {
  location?: string;
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
