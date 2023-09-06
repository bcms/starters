<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
      <div class="relative mb-4 lg:mb-6">
        <div class="py-6">
          <div class="container">
            <div class="relative z-10 aspect-[1.23] md:aspect-[1.95]">
              <h1
                class="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none"
              >
                {{ data.page.meta.title }}
              </h1>
              <div class="flex items-end justify-between gap-5 h-full">
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Project
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ data.page.meta.project_no.padStart(2, '0') }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Brand name
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ data.page.meta.brand_name }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Role
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ data.page.meta.role }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Year
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ new Date(data.page.meta.year).getFullYear() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BCMSImage
          :media="data.page.meta.gallery[0]"
          :options="{
            sizes: {
              exec: [
                {
                  width: 1440,
                  height: 740,
                },
              ],
            },
          }"
          class="absolute top-0 left-0 w-full h-full cover"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-appText/80" />
      </div>
      <div class="container">
        <ContentManager
          :item="data.page.meta.description"
          class="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
        />
        <div class="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
          <BCMSImage
            v-for="(image, index) in data.page.meta.gallery.slice(1)"
            :key="index"
            :media="image"
            class="portfolioItemPage--galleryImage w-full cover h-full"
          />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSImage } from '~~/bcms-components';
import { PortfolioItemEntry, PortfolioItemEntryMeta } from '@/bcms/types';
import { PageProps, PortfolioItemPageData } from '~~/types';
import { getHeaderAndFooter } from '@/utils/page-props';

const { setOgHead } = useHeadTags();
const route = useRoute();

const { data, error } = useAsyncData<PageProps<PortfolioItemPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const portfolioItem = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'portfolio_item',
      // Entry slug or ID
      entry: route.params.slug,
    })) as PortfolioItemEntry;
    if (!portfolioItem) {
      throw new Error('Portfolio item entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        meta: portfolioItem.meta.en as PortfolioItemEntryMeta,
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

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.title,
  }),
);
</script>

<style lang="scss">
.portfolioItemPage--galleryImage {
  &:nth-of-type(3n + 1) {
    @apply col-span-2;
  }
  &:nth-of-type(3n + 3) {
    @apply col-span-3;
  }
}
</style>
