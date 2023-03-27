<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.data.meta.hero" />
    <HomePageJobs :data="data.data.meta.jobs" :jobs="data.data.jobs" />
    <HomePageAbout :data="data.data.meta.about" />
    <HomePageTestimonials :data="data.data.testimonials" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, HomePageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<HomePageData>>({
    url: "/home.json",
  });
});

useHead({
  title: data.value?.data.meta.title,
});
</script>
