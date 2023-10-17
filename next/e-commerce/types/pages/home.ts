import { ProductLite } from './shop';
import {
  HomePageEntryMeta,
  ProductCategoryEntryMeta,
  ProductGenderEntryMeta,
} from '@/bcms/types';

export interface HomePageData {
  meta: HomePageEntryMeta;
  categories: Array<{
    meta: ProductCategoryEntryMeta;
    productsCount: number;
  }>;
  products: ProductLite[];
  filters: {
    genders: ProductGenderEntryMeta[];
    categories: ProductCategoryEntryMeta[];
  };
}
