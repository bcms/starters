import { HeaderEntryMeta } from '@/bcms/types';
import { FooterEntryMeta } from '@/bcms/types/entry/footer';

export interface PageProps<Page = unknown> {
  page: Page;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}
