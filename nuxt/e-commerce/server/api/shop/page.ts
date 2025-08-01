import {
    ProductBrandEntryMetaItem,
    ProductCategoryEntry,
    ProductCategoryEntryMetaItem,
    ProductEntry,
    ProductGenderEntryMetaItem,
} from '~/bcms/type/ts';
import { ProductLite, productToLite } from '~/utils/product';

export type ShopPageResponse = {
    products: ProductLite[];
    genders: ProductGenderEntryMetaItem[];
    categories: ProductCategoryEntryMetaItem[];
    brands: ProductBrandEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const products = (await bcms.entry.getAll('product')) as ProductEntry[];

    const res: ShopPageResponse = {
        products: products.map((e) => productToLite(e)),
        genders: products
            .map((e) => e.meta.en?.gender.meta.en as ProductGenderEntryMetaItem)
            .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
        categories: products
            .map((e) =>
                (e.meta.en?.categories as ProductCategoryEntry[]).map(
                    (i) => i.meta.en as ProductCategoryEntryMetaItem,
                ),
            )
            .flat()
            .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
        brands: products
            .map((e) => e.meta.en?.brand.meta.en as ProductBrandEntryMetaItem)
            .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
    };

    return res;
});
