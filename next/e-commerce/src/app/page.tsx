import React from 'react';
import { Metadata } from 'next';
import {
    HomeEntry,
    HomeEntryMetaItem,
    ProductCategoryEntry,
    ProductCategoryEntryMetaItem,
    ProductEntry,
    ProductGenderEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { HomeHero } from './components/Hero';
import { HomeCategories } from './components/Categories';
import { HomeCta } from './components/Cta';
import { productToLite } from '@/utils/product';
import { HomeProducts } from './components/Products';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Moda - Moda';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const HomePage: React.FC = async () => {
    const home = (await bcmsPrivate.entry.getById('home', 'home')) as HomeEntry;

    if (!home) {
        return notFound();
    }

    const homeMeta = home.meta.en as HomeEntryMetaItem;
    const products = (await bcmsPrivate.entry.getAll(
        'product',
    )) as ProductEntry[];
    const productsLite = products.map((e) => productToLite(e));
    const categories = (
        (await bcmsPrivate.entry.getAll(
            'product-category',
        )) as ProductCategoryEntry[]
    ).map((e) => {
        return {
            meta: e.meta.en as ProductCategoryEntryMetaItem,
            productsCount: products.filter((p) =>
                p.meta?.en?.categories.find((i) => i._id === e._id),
            ).length,
        };
    });
    const filters = {
        categories: products.slice(0, 8).reduce((acc, e) => {
            e.meta.en?.categories.forEach((i) => {
                if (
                    i.meta.en &&
                    !acc.find((c) => c.slug === i.meta.en?.slug) &&
                    categories.find((c) => c.meta.slug === i.meta.en?.slug)
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
    };

    return (
        <div>
            <HomeHero
                title={homeMeta.hero_title}
                description={homeMeta.hero_description}
                image={homeMeta.hero_cover_image}
                bcms={bcmsPublic.getConfig()}
            />
            <HomeCategories
                data={categories.slice(0, 6)}
                ctaTheme="dark-green"
                bcms={bcmsPublic.getConfig()}
            />
            <HomeCta
                title={homeMeta.cta_title}
                description={homeMeta.cta_description}
                image={homeMeta.cta_cover_image}
                cta={{
                    label: homeMeta.cta_label,
                    href: homeMeta.cta_link,
                }}
                bcms={bcmsPublic.getConfig()}
            />
            <HomeCategories
                data={categories.slice(6, 12)}
                ctaTheme="orange"
                bcms={bcmsPublic.getConfig()}
            />
            <HomeProducts
                products={productsLite}
                filters={filters}
                bcms={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default HomePage;
