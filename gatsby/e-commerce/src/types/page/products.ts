import { ClientConfig } from '@thebcms/client';
import { ProductLite } from '../../utils/product';
import {
    ProductBrandEntryMetaItem,
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '../../../bcms/types/ts';

export interface ProductsPageContent {
    products: ProductLite[];
    genders: ProductGenderEntryMetaItem[];
    categories: ProductCategoryEntryMetaItem[];
    brands: ProductBrandEntryMetaItem[];
    bcms: ClientConfig;
}
