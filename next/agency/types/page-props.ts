import { HeaderEntryMeta, FooterEntryMeta } from '@/bcms/types';
import {
  ContactPageData,
  HomePageData,
  LegalPageData,
  PortfolioPageData,
  ServicesPageData,
  TeamPageData,
} from './pages';

export interface PageProps<
  Page =
    | PortfolioPageData
    | TeamPageData
    | LegalPageData
    | ContactPageData
    | HomePageData
    | ServicesPageData,
> {
  page: Page;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}
