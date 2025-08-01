import {
    HomeEntry,
    HomeEntryMetaItem,
    ProductCategoryEntry,
    ProductCategoryEntryMetaItem,
    ProductEntry,
    ProductGenderEntryMetaItem,
} from '~/bcms/type/ts';
import { ProductLite, productToLite } from '~/utils/product';

export type HomePageResponse = {
    meta: HomeEntryMetaItem;
    categories: Array<{
        meta: ProductCategoryEntryMetaItem;
        productsCount: number;
    }>;
    products: ProductLite[];
    filters: {
        genders: ProductGenderEntryMetaItem[];
        categories: ProductCategoryEntryMetaItem[];
    };
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const homePage = (await bcms.entry.getBySlug('home', 'home')) as HomeEntry;
    const categories = (await bcms.entry.getAll(
        'product-category',
    )) as ProductCategoryEntry[];
    const products = (await bcms.entry.getAll('product')) as ProductEntry[];

    const res: HomePageResponse = {
        meta: homePage.meta.en as HomeEntryMetaItem,
        categories: categories.map((e) => {
            return {
                meta: e.meta.en as ProductCategoryEntryMetaItem,
                productsCount: products.filter((p) =>
                    p.meta?.en?.categories.find((i) => i._id === e._id),
                ).length,
            };
        }),
        // Return Products lite
        products: products.map((e) => productToLite(e)).slice(0, 8),
        filters: {
            categories: products.slice(0, 8).reduce((acc, e) => {
                e.meta.en?.categories.forEach((i) => {
                    if (
                        i.meta.en &&
                        !acc.find((c) => c.slug === i.meta.en?.slug) &&
                        categories.find((c) => c._id === i._id)
                    ) {
                        acc.push(i.meta.en);
                    }
                });

                return acc;
            }, [] as ProductCategoryEntryMetaItem[]),
            genders: products.slice(0, 8).reduce((acc, e) => {
                if (
                    e.meta.en?.gender.meta.en &&
                    !acc.find((i) => i.slug === e.meta.en?.gender.meta.en?.slug)
                ) {
                    acc.push(e.meta.en.gender.meta.en);
                }

                return acc;
            }, [] as ProductGenderEntryMetaItem[]),
        },
    };

    return res;
});
