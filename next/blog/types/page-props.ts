import { HeaderEntryMeta } from '@/bcms/types';
import { FooterEntryMeta } from '@/bcms/types/entry/footer';

export interface PageProps<Page = { meta: { title: string } }> {
  page: Page;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}
