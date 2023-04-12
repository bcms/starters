<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
      <div class="container">
        <div
          class="flex flex-col items-center text-center mb-8 md:mb-20 lg:mb-[134px]"
        >
          <div
            class="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
          >
            {{ data.data.meta.subtitle }}
          </div>
          <h1
            class="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6"
          >
            {{ data.data.meta.title }}
          </h1>
          <ContentManager
            :item="data.data.meta.description"
            class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
          />
        </div>
        <div
          class="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8"
        >
          <BCMSImage
            :media="data.data.meta.cover"
            class="w-full h-full cover"
          />
          <div class="absolute top-0 left-0 w-full h-full bg-black/50" />
        </div>
        <ContentManager :item="data.data.content" class="prose" />
      </div>
      <TopGradient />
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
