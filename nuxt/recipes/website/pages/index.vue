<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer" />
</template>

<script setup lang="ts">
import { APIResponse } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse>({
    url: "/home.json",
  });
});
</script>
