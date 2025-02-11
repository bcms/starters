import { ClientConfig } from '@thebcms/client';
import {
    HomeEntryMetaItem,
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '../../../bcms/types/ts';
import { ProductLite } from '../../utils/product';

export interface HomePageContent {
    meta: HomeEntryMetaItem;
    categories: {
        meta: ProductCategoryEntryMetaItem;
        productsCount: number;
    }[];
    products: ProductLite[];
    filters: {
        categories: ProductCategoryEntryMetaItem[];
        genders: ProductGenderEntryMetaItem[];
    };
    bcms: ClientConfig;
}
