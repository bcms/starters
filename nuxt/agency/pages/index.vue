<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomeHero :data="data.page.meta.hero" />
    <HomeAbout :data="data.page.meta.about" />
    <HomeServices :data="data.page.meta.services" />
    <HomeCapabilities :data="data.page.meta.capabilities" />
    <HomeTeam :data="data.page.meta.team" />
    <ContactBlock :data="data.page.meta.contact_block" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { HomePageEntry, HomePageEntryMeta } from '~~/bcms/types';
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
    return {
      header,
      footer,
      page: {
        // Return Home Page entry for `en` locale
        meta: homePage.meta.en as HomePageEntryMeta,
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
