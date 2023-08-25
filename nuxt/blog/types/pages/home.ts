import { BlogLite } from './blogs';
import { HomePageEntryMeta } from '~~/bcms/types';

export interface HomePageData {
  meta: HomePageEntryMeta;
  blogs: BlogLite[];
}
