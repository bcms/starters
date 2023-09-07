<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.data.meta.hero" />
    <HomePageMenu :data="data.data.meta.menu" />
    <HomePageSeasons :data="data.data.meta.seasons" />
    <HomePageAmbience :data="data.data.meta.ambience" />
    <HomePageSpecials
      :data="data.data.meta.specials"
      :items="data.data.specials"
    />
    <HomePageEvents :data="data.data.meta.events" :items="data.data.events" />
    <HomePageTestimonials
      :data="data.data.meta.testimonials"
      :items="data.data.testimonials"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, HomePageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<HomePageData>>({
    url: "/home.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.seo?.title || data.value?.data.meta.title,
    description: data.value?.data.meta.seo?.description,
  })
);
</script>
