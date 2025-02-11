import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    BlogPageContent,
    BlogsPageContent,
    HomePageContent,
    LegalPageContent,
    ProductPageContent,
    ProductsPageContent,
} from './src/types';
import { Client } from '@thebcms/client';
import {
    BlogEntry,
    BlogEntryMetaItem,
    HomeEntry,
    HomeEntryMetaItem,
    LegalEntry,
    ProductBrandEntryMetaItem,
    ProductCategoryEntry,
    ProductCategoryEntryMetaItem,
    ProductEntry,
    ProductEntryMetaItem,
    ProductGenderEntryMetaItem,
} from './bcms/types/ts';
import { productToLite } from './src/utils/product';
import { CartPageContent } from './src/types/page/cart';

const bcms = new Client(
    process.env.BCMS_ORG_ID || '',
    process.env.BCMS_INSTANCE_ID || '',
    {
        id: process.env.BCMS_API_KEY_ID || '',
        secret: process.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);

export const createPages = async ({
    actions: { createPage },
}: CreatePagesArgs) => {
    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home',
    )) as HomeEntry;
    const homePageMeta = homePageEntry.meta.en as HomeEntryMetaItem;

    const products = (await bcms.entry.getAll('product')) as ProductEntry[];
    const productsLite = products.map((e) => productToLite(e));
    const categories = (
        (await bcms.entry.getAll('product-category')) as ProductCategoryEntry[]
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

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            products: productsLite,
            filters,
            categories,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // BLOGS
    const blogsTemplate = path.resolve('./src/templates/blogs.tsx');
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    createPage({
        path: `/blog`,
        component: blogsTemplate,
        context: {
            blogs: blogs
                .map((e) => e.meta.en as BlogEntryMetaItem)
                .sort((a, b) => b.date.timestamp - a.date.timestamp),
            bcms: bcms.getConfig(),
        } as BlogsPageContent,
    });

    // BLOG
    const blogTemplate = path.resolve('./src/templates/blog.tsx');

    blogs.forEach((blog) => {
        const meta = blog.meta.en as BlogEntryMetaItem;
        createPage({
            path: `/blog/${meta.slug}`,
            component: blogTemplate,
            context: {
                meta,
                content: blog.content.en,
                otherBlogs: blogs
                    .filter((e) => e.meta.en?.slug !== blog.meta.en?.slug)
                    .map((e) => e.meta.en as BlogEntryMetaItem)
                    .sort((a, b) => b.date.timestamp - a.date.timestamp)
                    .slice(0, 3),
                bcms: bcms.getConfig(),
            } as BlogPageContent,
        });
    });

    // LEGAL
    const legalTemplate = path.resolve('./src/templates/legal.tsx');
    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    createPage({
        path: `/legal`,
        component: legalTemplate,
        context: {
            entries: legalEntries,
        } as LegalPageContent,
    });

    // PRODUCTS
    const productsTemplate = path.resolve('./src/templates/products.tsx');
    const productsData = {
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

    createPage({
        path: `/shop`,
        component: productsTemplate,
        context: {
            products: productsData.products,
            genders: productsData.genders,
            categories: productsData.categories,
            brands: productsData.brands,
            bcms: bcms.getConfig(),
        } as ProductsPageContent,
    });

    // PRODUCT
    const productTemplate = path.resolve('./src/templates/product.tsx');

    products.forEach((product) => {
        const meta = product.meta.en as ProductEntryMetaItem;
        createPage({
            path: `/shop/${meta.slug}`,
            component: productTemplate,
            context: {
                meta,
                otherProducts: products
                    .filter((e) => e.meta.en?.slug !== meta.slug)
                    .map((e) => productToLite(e))
                    .sort((a, b) => b.date - a.date)
                    .slice(0, 4),
                bcms: bcms.getConfig(),
            } as ProductPageContent,
        });
    });

    // CART
    const cartTemplate = path.resolve('./src/templates/cart.tsx');

    createPage({
        path: `/shop/cart`,
        component: cartTemplate,
        context: {
            bcms: bcms.getConfig(),
        } as CartPageContent,
    });
};
