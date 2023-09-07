<template>
  <PageWrapper
    v-if="data"
    :header="data.header"
    :footer="{
      meta: data.footer,
      legal: data.legal,
    }"
  >
    <h1 class="sr-only">Conference website</h1>
    <HomePageHero :data="data.page.meta.hero" />
    <HomePageAbout :data="data.page.meta.about" />
    <HomePageSpeakers :data="data.page.meta.speakers" />
    <HomePageSponsors :data="data.page.meta.sponsors" />
    <HomePageTickets :data="data.page.meta.tickets" />
    <HomePageAgenda :data="data.page.meta.agenda" />
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
    const { header, footer, legal } = await getHeaderAndFooter(ctx as NuxtApp);
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
      legal,
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
