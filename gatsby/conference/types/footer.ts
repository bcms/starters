import { FooterEntryMeta, LegalEntry } from '../../bcms/types';

export interface FooterPageData {
  meta: FooterEntryMeta;
  legal: {
    nodes: Array<{
      bcms: LegalEntry;
    }>;
  };
}
