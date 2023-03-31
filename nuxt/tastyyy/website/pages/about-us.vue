<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <AboutPageHero :data="data.data.meta.hero" />
    <AboutPageTextImage :data="data.data.meta.text_image_cols" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { AboutPageData, APIResponse } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<AboutPageData>>({
    url: "/about.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
