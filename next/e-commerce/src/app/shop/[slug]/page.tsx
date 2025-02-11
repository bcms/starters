import React from 'react';
import { ProductEntry, ProductEntryMetaItem } from '../../../../bcms/types/ts';
import { bcms } from '@/app/bcms-client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Main } from './components/Main';
import { productToLite } from '@/utils/product';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const products = (await bcms.entry.getAll('product')) as ProductEntry[];

    return products.map((product) => {
        const meta = product.meta.en as ProductEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const products = (await bcms.entry.getAll('product')) as ProductEntry[];
    const product = products.find((e) => e.meta.en?.slug === params.slug);

    if (!product) {
        return notFound();
    }

    const productEntryMeta = product.meta.en as ProductEntryMetaItem;
    const pageTitle = `${productEntryMeta?.seo?.title || productEntryMeta.title} - Moda`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const ProductPage: React.FC<Props> = async ({ params }) => {
    const products = (await bcms.entry.getAll('product')) as ProductEntry[];
    const meta = products.find((e) => e.meta.en?.slug === params.slug)?.meta
        .en as ProductEntryMetaItem;

    return (
        <div>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <Main
                    meta={meta}
                    otherProducts={products
                        .filter((e) => e.meta.en?.slug !== params.slug)
                        .map((e) => productToLite(e))
                        .sort((a, b) => b.date - a.date)
                        .slice(0, 4)}
                    bcms={bcms.getConfig()}
                />
            </div>
        </div>
    );
};

export default ProductPage;
