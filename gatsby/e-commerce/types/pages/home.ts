import {
  HomePageEntryMeta,
  ProductCategoryEntryMeta,
  ProductGenderEntryMeta,
} from '@/bcms/types';

export interface HomePageData {
  meta: {
    en: HomePageEntryMeta;
  };
}

export interface HomePageCategory {
  meta: {
    en: ProductCategoryEntryMeta;
  };
  productsCount: number;
}

export interface HomePageFilters {
  genders: ProductGenderEntryMeta[];
  categories: ProductCategoryEntryMeta[];
}
