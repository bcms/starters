import { FooterEntryMeta, HeaderEntryMeta, LegalEntry } from '~~/bcms/types';

export interface PageProps<Page = unknown> {
  page: Page;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
  legal: LegalEntry[];
}
