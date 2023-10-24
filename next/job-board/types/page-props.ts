import { HeaderEntryMeta } from '@/bcms/types';
import { FooterEntryMeta } from '@/bcms/types/entry/footer';
import {AboutPageData, ContactPageData, HomePageData} from '@/types/pages';

export interface PageProps<Page = AboutPageData | ContactPageData | HomePageData | {meta: { title: string }}> {
  page: Page;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}
