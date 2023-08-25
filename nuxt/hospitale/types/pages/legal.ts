import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { LegalPageEntryMeta } from '@/bcms/types/entry/legal_page';

export interface LegalPageData {
  entries: Array<{
    meta: LegalPageEntryMeta;
    content: BCMSEntryContentParsedItem[];
  }>;
}
