import { RecipeLight } from './recipes';
import { HomePageEntryMeta } from '@/bcms/types';

export interface HomePageData {
  meta: HomePageEntryMeta;
  recipes: RecipeLight[];
}
