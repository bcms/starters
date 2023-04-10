<template>
  <PageWrapper v-if="data"> </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse>({
    url: "/home.json",
  });
});
</script>
