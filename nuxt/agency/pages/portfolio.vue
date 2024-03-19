<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <Hero
      :title="data.page.meta.title"
      subtitle="Portfolio"
      :description="data.page.meta.description"
    />
    <PortfolioList :items="data.page.meta.items" />
    <ContactBlock :data="data.page.meta.contact_block" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { PortfolioPageEntry, PortfolioPageEntryMeta } from '~~/bcms/types';
import { PageProps, PortfolioPageData } from '~~/types';
import { getHeaderAndFooter } from '~~/utils/page-data';

const { data, error } = useAsyncData<PageProps<PortfolioPageData> | undefined>(
  'portfolio',
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Portfolio Page entry
    const portfolioPage = (await ctx?.$bcms.entry.get({
      template: 'portfolio_page',
      entry: 'portfolio',
    })) as PortfolioPageEntry;
    if (!portfolioPage) {
      throw new Error('Portfolio page entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        // Return Portfolio Page entry for `en` locale
        meta: portfolioPage.meta.en as PortfolioPageEntryMeta,
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
