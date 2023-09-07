<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.page.meta.hero" :recipes="data.page.recipes" />
    <HomePageRecipes :data="data.page.meta.recipes" />
    <HomePageAboutUs :data="data.page.meta.about_us" />
    <HomePageLetsTalk :data="data.page.meta.lets_talk" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { HomePageEntry, HomePageEntryMeta, RecipeEntry } from '~~/bcms/types';
import { PageProps, HomePageData } from '~~/types';

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
    // Get all Recipe entries
    const recipes = (await ctx?.$bcms.entry.getAll({
      template: 'recipe',
    })) as RecipeEntry[];
    return {
      header,
      footer,
      page: {
        // Return Home Page entry for `en` locale
        meta: homePage.meta.en as HomePageEntryMeta,
        // Return all Blogs which are not in Featured
        // section of the Home Page.
        recipes: recipeToLight(recipes),
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
