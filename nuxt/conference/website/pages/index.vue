<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, HomePageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<HomePageData>>({
    url: "/home.json",
  });
});
</script>
