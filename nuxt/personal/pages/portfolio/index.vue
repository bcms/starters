<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
      <div class="container">
        <AnimatedTitle
          :title="data.page.meta.title"
          class="mb-10 md:mb-20 lg:mb-[192px]"
          title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
        />
        <div class="grid grid-cols-1 gap-[33px] lg:gap-20">
          <NuxtLink
            v-for="(item, index) in data.page.items"
            :key="index"
            :to="`/portfolio/${item.slug}`"
          >
            <BCMSImage
              :media="item.gallery[0]"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 1264,
                      height: 611,
                    },
                  ],
                },
              }"
              class="w-full aspect-[2.07] cover rounded-[6px] overflow-hidden mb-4 lg:rounded-3xl lg:mb-12"
            />
            <div class="lg:flex lg:items-start lg:justify-between">
              <h3
                class="flex text-sm leading-none tracking-[-0.41px] font-Helvetica mb-3 md:text-2xl md:leading-none lg:text-[32px]"
              >
                {{ item.brand_name }}
                <span class="text-[10px] ml-1.5 md:text-sm lg:text-xl"
                  >&#169;</span
                >
              </h3>
              <ContentManager
                :item="item.description"
                class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:max-w-[551px]"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSImage } from '~~/bcms-components';
import {
  PortfolioItemEntry,
  PortfolioItemEntryMeta,
  PortfolioPageEntry,
  PortfolioPageEntryMeta,
} from '@/bcms/types';
import { PageProps, PortfolioPageData } from '~~/types';
import { getHeaderAndFooter } from '@/utils/page-props';

const { data, error } = useAsyncData<PageProps<PortfolioPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const portfolioPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'portfolio_page',
      // Entry slug or ID
      entry: 'portfolio',
    })) as PortfolioPageEntry;
    if (!portfolioPage) {
      throw new Error('Portfolio page entry does not exist.');
    }
    const portfolioItems = (await ctx?.$bcms.entry.getAll({
      // Template name or ID
      template: 'portfolio_item',
    })) as PortfolioItemEntry[];
    return {
      header,
      footer,
      page: {
        meta: portfolioPage.meta.en as PortfolioPageEntryMeta,
        items: portfolioItems.map(
          (item) => item.meta.en as PortfolioItemEntryMeta,
        ),
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
    title: data.value?.page.meta.title,
  }),
);
</script>
