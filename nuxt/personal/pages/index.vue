<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.page.meta.hero" />
    <HomePageServices :data="data.page.services" />
    <HomePageAbout :data="data.page.about" />
    <HomePagePortfolio :data="data.page.portfolio" />
    <HomePageTestimonials :data="data.page.testimonials" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import {
  AboutPageEntry,
  HomePageEntry,
  HomePageEntryMeta,
  PortfolioItemEntry,
  PortfolioPageEntry,
  ServiceItemEntry,
  ServicesPageEntry,
  TestimonialItemEntry,
  TestimonialsPageEntry,
} from '@/bcms/types';
import { PageProps, HomePageData } from '~~/types';
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
  const servicesPage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'services_page',
    // Entry slug or ID
    entry: 'services',
  })) as ServicesPageEntry;
  if (!servicesPage) {
    throw new Error('Services page entry does not exist.');
  }
  const serviceItems = (await ctx?.$bcms.entry.getAll({
    // Template name or ID
    template: 'service_item',
  })) as ServiceItemEntry[];
  const aboutPage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'about_page',
    // Entry slug or ID
    entry: 'abooout',
  })) as AboutPageEntry;
  if (!aboutPage) {
    throw new Error('About page entry does not exist.');
  }
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
  const testimonialsPage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'testimonials_page',
    // Entry slug or ID
    entry: 'testimonials',
  })) as TestimonialsPageEntry;
  if (!testimonialsPage) {
    throw new Error('Testimonials page entry does not exist.');
  }
  const testimonialItems = (await ctx?.$bcms.entry.getAll({
    // Template name or ID
    template: 'testimonial_item',
  })) as TestimonialItemEntry[];
  return {
    header,
    footer,
    page: {
      meta: homePage.meta.en as HomePageEntryMeta,
      services: {
        title: servicesPage.meta.en?.title,
        description: servicesPage.meta.en?.description,
        items: serviceItems.map((item) => item.meta.en),
      },
      about: {
        title: aboutPage.meta.en?.title,
        description: aboutPage.meta.en?.description,
        education: aboutPage.meta.en?.education,
        workHistory: aboutPage.meta.en?.work_history,
      },
      portfolio: {
        title: portfolioPage.meta.en?.title,
        description: portfolioPage.meta.en?.description,
        items: portfolioItems.map((e) => e.meta.en),
      },
      testimonials: {
        title: testimonialsPage.meta.en?.title,
        description: testimonialsPage.meta.en?.description,
        items: testimonialItems.map((e) => e.meta.en),
      },
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
    title: data.value?.page.meta.title,
  }),
);
</script>
