import { HeaderEntryMeta, FooterEntryMeta } from '@/bcms/types';

export interface PageProps<Page = unknown> {
  page: Page;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
  defaultTitle?: string;
}
