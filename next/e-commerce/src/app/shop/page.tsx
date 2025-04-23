import React from 'react';
import {
    ProductBrandEntryMetaItem,
    ProductCategoryEntry,
    ProductCategoryEntryMetaItem,
    ProductEntry,
    ProductGenderEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { productToLite } from '@/utils/product';
import { Main } from './components/Main';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Products - Moda';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const ProductsPage: React.FC = async () => {
    const products = (await bcmsPrivate.entry.getAll(
        'product',
    )) as ProductEntry[];

    const data = {
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
        bcms: bcmsPublic.getConfig(),
    };

    return (
        <div>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <Main
                    products={data.products}
                    genders={data.genders}
                    categories={data.categories}
                    brands={data.brands}
                    bcms={data.bcms}
                />
            </div>
        </div>
    );
};

export default ProductsPage;
