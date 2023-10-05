<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHome :data="data.page.meta.hero" />
    <HomePageCategories
      :data="data.page.categories.slice(0, 6)"
      cta-theme="dark-green"
    />
    <HomePageCta :data="data.page.meta.cta" />
    <HomePageCategories
      :data="data.page.categories.slice(6, 12)"
      cta-theme="orange"
    />
    <HomePageProducts
      :products="data.page.products"
      :filters="data.page.filters"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import {
  HomePageEntry,
  HomePageEntryMeta,
  ProductCategoryEntry,
  ProductCategoryEntryMeta,
  ProductEntry,
  ProductGenderEntryMeta,
} from '~~/bcms/types';
import { PageProps, HomePageData } from '~~/types';
import { getHeaderAndFooter } from '~~/utils/page-data';

const { data, error } = useAsyncData<PageProps<HomePageData> | undefined>(
  'home',
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Home Page entry
    const homePage = (await ctx?.$bcms.entry.get({
      template: 'home_page',
      entry: 'home',
    })) as HomePageEntry;
    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }
    const categories = (await ctx?.$bcms.entry.getAll({
      template: 'product_category',
    })) as ProductCategoryEntry[];
    const products = (await ctx?.$bcms.entry.getAll({
      template: 'product',
    })) as ProductEntry[];
    return {
      header,
      footer,
      page: {
        // Return Home Page entry
        meta: homePage.meta.en as HomePageEntryMeta,
        // Return Product Categories
        categories: categories.map((e) => {
          return {
            meta: e.meta.en as ProductCategoryEntryMeta,
            productsCount: products.filter(
              (p) => p.meta?.en?.categories.find((i) => i._id === e._id),
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
          }, [] as ProductCategoryEntryMeta[]),
          genders: products.slice(0, 8).reduce((acc, e) => {
            if (
              e.meta.en?.gender.meta.en &&
              !acc.find((i) => i.slug === e.meta.en?.gender.meta.en?.slug)
            ) {
              acc.push(e.meta.en.gender.meta.en);
            }

            return acc;
          }, [] as ProductGenderEntryMeta[]),
        },
      },
    };
  },
);

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
