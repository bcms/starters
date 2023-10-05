<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="container pb-14 md:pb-20 lg:pb-[136px]">
      <div
        v-if="activeColor"
        class="grid grid-cols-1 gap-8 mb-14 lg:grid-cols-2"
      >
        <ShopPageGallery
          :gallery="data.page.meta.gallery"
          :active-color="activeColor"
        />
        <ShopPageDetails
          :meta="data.page.meta"
          :active-color="activeColor"
          @color-change="activeColor = $event"
        />
      </div>
      <div v-if="data.page.otherProducts.length > 0">
        <div
          class="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-8 lg:text-[24px] lg:flex-row"
        >
          <div>Others you may like</div>
          <NuxtLink to="/shop" class="underline"> See all </NuxtLink>
        </div>
        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <ProductCard
            v-for="(product, index) in data.page.otherProducts"
            :key="index"
            :card="product"
          />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { ProductPageData, PageProps } from '~~/types';
import {
  ProductEntry,
  ProductEntryMeta,
  ProductColorEntry,
} from '~~/bcms/types';

const route = useRoute();

const { data, error } = useAsyncData<PageProps<ProductPageData>>(
  `product.${route.params.slug}`,
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Product Page entry
    const productPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'product',
      // Entry slug or ID
      entry: route.params.slug,
    })) as ProductEntry;
    // Get all product entries
    const products = (await ctx?.$bcms.entry.getAll({
      // Template name or ID
      template: 'product',
    })) as ProductEntry[];
    return {
      header,
      footer,
      page: {
        meta: productPage.meta.en as ProductEntryMeta,
        otherProducts: products
          .filter((e) => e.meta.en?.slug !== productPage.meta.en?.slug)
          .map((e) => productToLite(e))
          .sort((a, b) => b.date - a.date)
          .slice(0, 4),
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

const activeColor = ref<ProductColorEntry>();

onMounted(() => {
  activeColor.value = data.value?.page.meta.gallery[0].color;
});

onUpdated(() => {
  activeColor.value = data.value?.page.meta.gallery[0].color;
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
