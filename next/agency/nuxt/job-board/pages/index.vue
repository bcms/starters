<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.page.meta.hero" />
    <HomePageJobs :data="data.page.meta.jobs" :jobs="data.page.jobs" />
    <HomePageAbout :data="data.page.meta.about" />
    <HomePageTestimonials :data="data.page.testimonials" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import {
  HomePageEntry,
  HomePageEntryMeta,
  JobEntry,
  TestimonialEntry,
  TestimonialEntryMeta,
} from '@/bcms/types';
import { HomePageData, PageProps } from '@/types';
import { toJobLite } from '@/utils/job';
import { getHeaderAndFooter } from '@/utils/page-props';

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
  const jobs = (await ctx?.$bcms.entry.getAll({
    template: 'job',
  })) as JobEntry[];
  const testimonials = (await ctx?.$bcms.entry.getAll({
    template: 'testimonial',
  })) as TestimonialEntry[];
  return {
    header,
    footer,
    page: {
      jobs: jobs.map((job) => toJobLite(job)),
      meta: homePage.meta.en as HomePageEntryMeta,
      testimonials: testimonials.map(
        (testimonial) => testimonial.meta.en as TestimonialEntryMeta,
      ),
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
