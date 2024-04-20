import { HomePageEntryMeta } from '@/bcms/types';
import { BlogLite } from './blogs';

export interface HomePageData {
  meta: HomePageEntryMeta;
  blogs: BlogLite[];
}
