import { BCMSPropMediaDataParsed } from '@becomes/cms-client/types';
import {
  ProductCategoryEntryMeta,
  ProductGenderEntryMeta,
  ProductSizeGroup,
} from '~~/bcms/types';

export interface ProductLite {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  price: number;
  discounted_price?: number;
  sizes: ProductSizeGroup[];
  gender: ProductGenderEntryMeta;
  categories: ProductCategoryEntryMeta[];
}

export interface ProductFilter {
  type: 'category' | 'brand' | 'gender';
  label: string;
  value: string;
  active: boolean;
}
