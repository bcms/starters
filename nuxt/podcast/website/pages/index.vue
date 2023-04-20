<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero
      :data="data.data.meta.hero"
      :episodes="episodes.slice(0, 3)"
    />
    <HomePageEpisodes :data="data.data.meta.episodes" :episodes="episodes" />
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
const { episodes } = useEpisodes();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
