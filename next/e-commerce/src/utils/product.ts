import {
    ProductBrandEntryMetaItem,
    ProductCategoryEntry,
    ProductColorEntryMetaItem,
    ProductEntry,
    ProductEntryMetaItem,
    ProductGenderEntryMetaItem,
    ProductSizeGroup,
} from '@bcms-types/types/ts';
import type { PropMediaDataParsed } from '@thebcms/types';

export interface ProductLite {
    title: string;
    slug: string;
    cover: PropMediaDataParsed;
    price: number;
    discounted_price?: number;
    sizes: ProductSizeGroup[];
    gender: ProductGenderEntryMetaItem;
    categories: ProductCategoryEntry[];
    brand: ProductBrandEntryMetaItem;
    units_sold: number;
    date: number;
    color: ProductColorEntryMetaItem;
}

export const productToLite = (product: ProductEntry): ProductLite => {
    const meta = product.meta.en as ProductEntryMetaItem;

    return {
        title: meta.title,
        slug: meta.slug,
        cover: meta.gallery[0].image,
        price: meta.price,
        discounted_price: meta.discounted_price,
        sizes: meta.sizes,
        gender: meta.gender.meta.en as ProductGenderEntryMetaItem,
        categories: meta.categories,
        brand: meta.brand.meta.en as ProductBrandEntryMetaItem,
        units_sold: meta.units_sold || 0,
        date: product.createdAt,
        color: meta.gallery[0].color.meta.en as ProductColorEntryMetaItem,
    };
};
