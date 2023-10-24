<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.page.meta.hero" />
    <HomePageMenu :data="data.page.meta.menu" />
    <HomePageSeasons :data="data.page.meta.seasons" />
    <HomePageAmbience :data="data.page.meta.ambience" />
    <HomePageSpecials
      :data="data.page.meta.specials"
      :items="data.page.specials"
    />
    <HomePageEvents :data="data.page.meta.events" :items="data.page.events" />
    <HomePageTestimonials
      :data="data.page.meta.testimonials"
      :items="data.page.testimonials"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import type { NuxtApp } from 'nuxt/app';
import {
  EventEntry,
  EventEntryMeta,
  FoodItemEntry,
  FoodItemEntryMeta,
  HomePageEntry,
  HomePageEntryMeta,
  TestimonialEntry,
  TestimonialEntryMeta,
} from '~~/bcms/types';
import { HomePageData } from '~~/types';
import { PageProps } from '~~/types/page-props';

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
  const foodItems = (await ctx?.$bcms.entry.getAll({
    // Food name or ID
    template: 'food_item',
  })) as FoodItemEntry[];
  const eventItems = (await ctx?.$bcms.entry.getAll({
    // Event name or ID
    template: 'event',
  })) as EventEntry[];
  const testimonialItems = (await ctx?.$bcms.entry.getAll({
    // Testimonial name or ID
    template: 'testimonial',
  })) as TestimonialEntry[];
  return {
    header,
    footer,
    page: {
      meta: homePage.meta.en as HomePageEntryMeta,
      specials: foodItems
        .filter((e) => e.meta.en?.special)
        .map((e) => e.meta.en) as FoodItemEntryMeta[],
      events: eventItems.map((e) => e.meta.en) as EventEntryMeta[],
      testimonials: testimonialItems.map(
        (e) => e.meta.en,
      ) as TestimonialEntryMeta[],
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
