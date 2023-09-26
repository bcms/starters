<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="container pb-14 md:pb-20 lg:pb-[136px]">
      <ShopPageMain :page="data.page" />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp, useAsyncData } from 'nuxt/app';
import {
  ProductEntry,
  ProductGenderEntryMeta,
  ProductBrandEntryMeta,
  ProductCategoryEntry,
  ProductCategoryEntryMeta,
} from '~~/bcms/types';
import { PageProps, ShopPageData } from '~~/types';

const { data, error } = useAsyncData<PageProps<ShopPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  // Get all Products
  const products = (await ctx?.$bcms.entry.getAll({
    template: 'product',
  })) as ProductEntry[];

  return {
    header,
    footer,
    page: {
      products: products.map((e) => productToLite(e)),
      genders: products
        .map((e) => e.meta.en?.gender.meta.en as ProductGenderEntryMeta)
        .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
      categories: products
        .map((e) =>
          (e.meta.en?.categories as ProductCategoryEntry[]).map(
            (i) => i.meta.en as ProductCategoryEntryMeta,
          ),
        )
        .flat()
        .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
      brands: products
        .map((e) => e.meta.en?.brand.meta.en as ProductBrandEntryMeta)
        .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
    },
  };
});

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
    title: 'Shop',
  }),
);
</script>
