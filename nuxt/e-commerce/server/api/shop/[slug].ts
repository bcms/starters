import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { ProductEntry, ProductEntryMetaItem } from '~/bcms/types/ts';
import { ProductLite, productToLite } from '~/utils/product';

export type ShopProductResponse = {
    meta: ProductEntryMetaItem;
    otherProducts: ProductLite[];
    bcms: ClientConfig;
};

export default defineEventHandler(async (event) => {
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
        bcms: bcms.getConfig(),
    };

    return res;
});
