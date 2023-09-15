<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero
      :data="data.page.meta.hero"
      :episodes="episodes.slice(0, 3)"
    />
    <HomePageEpisodes :data="data.page.meta.episodes" :episodes="episodes" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { HomePageEntry, HomePageEntryMeta } from '~~/bcms/types';
import { HomePageData, PageProps } from '~~/types';
import { getHeaderAndFooter } from '~~/utils/page-props';

const { data, error } = useAsyncData<PageProps<HomePageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const homePage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'home_page',
    // Entry slug or ID
    entry: 'home',
  })) as HomePageEntry;
  if (!homePage) {
    throw new Error('Home page entry does not exist.');
  }
  return {
    header,
    footer,
    page: {
      meta: homePage.meta.en as HomePageEntryMeta,
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
const { episodes } = useEpisodes();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
