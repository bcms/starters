<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <AboutPageHero :data="data.page.meta.hero" />
    <AboutPageTextImage :data="data.page.meta.text_image_cols" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { AboutPageEntry, AboutPageEntryMeta } from '~~/bcms/types';
import { AboutPageData } from '~~/types';
import { PageProps } from '~~/types/page-props';

const { data, error } = useAsyncData<PageProps<AboutPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const aboutPage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'about_page',
    // Entry slug or ID
    entry: 'about-us',
  })) as AboutPageEntry;
  if (!aboutPage) {
    throw new Error('About page entry does not exist.');
  }
  return {
    header,
    footer,
    page: {
      meta: aboutPage.meta.en as AboutPageEntryMeta,
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
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
