import { BCMSPropMediaDataParsed } from '@becomes/cms-client/types';
import {
  ProductBrandEntryMeta,
  ProductCategoryEntryMeta,
  ProductColorEntryMeta,
  ProductEntryMeta,
  ProductGenderEntryMeta,
  ProductSizeGroup,
} from '@/bcms/types';

export interface ProductLite {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  price: number;
  discounted_price?: number;
  sizes: ProductSizeGroup[];
  gender: ProductGenderEntryMeta;
  categories: ProductCategoryEntryMeta[];
  brand: ProductBrandEntryMeta;
  units_sold: number;
  date: number;
  color: ProductColorEntryMeta;
}

export interface ProductFilter {
  type: 'category' | 'brand' | 'gender' | 'price' | 'popularity';
  label: string;
  value: string | number;
  active: boolean;
}

export interface ShopPageData {
  products: ProductLite[];
  genders: ProductGenderEntryMeta[];
  categories: ProductCategoryEntryMeta[];
  brands: ProductBrandEntryMeta[];
}

export interface ProductPageData {
  meta: ProductEntryMeta;
  otherProducts: ProductLite[];
}
