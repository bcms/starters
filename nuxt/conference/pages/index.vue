<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.data.meta.hero" />
    <HomePageAbout :data="data.data.meta.about" />
    <HomePageSpeakers :data="data.data.meta.speakers" />
    <HomePageSponsors :data="data.data.meta.sponsors" />
    <HomePageTickets :data="data.data.meta.tickets" />
    <HomePageAgenda :data="data.data.meta.agenda" />
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
    title: data.value?.data.meta.title,
  })
);
</script>
