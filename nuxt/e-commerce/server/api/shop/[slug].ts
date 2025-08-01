import { ProductEntry, ProductEntryMetaItem } from '~/bcms/type/ts';
import { ProductLite, productToLite } from '~/utils/product';

export type ShopProductResponse = {
    meta: ProductEntryMetaItem;
    otherProducts: ProductLite[];
};

export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
    const products = (await bcms.entry.getAll('product')) as ProductEntry[];
    const slug = getRouterParam(event, 'slug');
    const product = products.find((e) => e.meta.en?.slug === slug);

    if (!product) {
        throw new Error(`Product "${slug}" not found`);
    }

    const res: ShopProductResponse = {
        meta: product.meta.en as ProductEntryMetaItem,
        otherProducts: products
            .filter((e) => e.meta.en?.slug !== slug)
            .map((e) => productToLite(e))
            .sort((a, b) => b.date - a.date)
            .slice(0, 4),
    };

    return res;
});
