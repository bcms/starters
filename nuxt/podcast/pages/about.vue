<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div
      class="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]"
    >
      <div
        class="relative aspect-square rounded overflow-hidden mb-6 md:aspect-[2.47] lg:rounded-2xl lg:mb-10"
      >
        <h1
          class="absolute z-10 bottom-6 left-6 text-lg leading-none font-medium tracking-[-0.41px] lg:bottom-10 lg:left-10 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px]"
        >
          {{ data.data.meta.title }}
        </h1>
        <BCMSImage
          :media="data.data.meta.cover"
          class="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60"
        />
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="(item, index) in data.data.meta.content"
          :key="index"
          class="p-4 border border-appGray-600 rounded-2xl bg-appBody lg:p-8"
        >
          <ContentManager :item="item" class="aboutPage--content" />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, AboutPageData } from "~~/types";

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

<style lang="scss">
.aboutPage--content {
  h2 {
    @apply text-sm leading-none font-medium tracking-[-1.41px] text-white mb-2.5 lg:text-[32px] lg:leading-none lg:mb-6;
  }
  p {
    @apply text-xs leading-[1.3] tracking-[-0.8px] text-appGray-500 lg:text-2xl lg:leading-[1.3];
  }
}
</style>
