import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { AboutPageEntryMeta } from '../../bcms/types';

export interface AboutPageData {
  meta: {
    en: AboutPageEntryMeta;
  };
  content: {
    en: BCMSPropRichTextDataParsed;
  };
}
