<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
      <div class="container">
        <div class="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
          <div
            class="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
          >
            {{ dateUtil.format(data.data.meta.date) }}
          </div>
          <h1
            class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
          >
            {{ data.data.meta.title }}
          </h1>
        </div>
        <BCMSImage
          :media="data.data.meta.cover"
          class="aspect-[2.07] rounded-lg overflow-hidden w-full cover mb-6 md:mb-8 lg:aspect-[2.43] lg:rounded-2xl lg:mb-12"
        />
        <ContentManager :item="data.data.content" class="prose" />
      </div>
    </div>
    <TopGradient />
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, BlogPageData } from "~~/types";

const route = useRoute();

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<BlogPageData>>({
    url: `/blogs/${route.params.slug}/data.json`,
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
