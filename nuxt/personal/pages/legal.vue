<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
      <div class="container">
        <AnimatedTitle
          title="Legal Page"
          class="mb-10 md:mb-20 lg:mb-[192px]"
          title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
        />
        <div class="grid grid-cols-1 gap-8 lg:gap-14">
          <div
            v-for="(item, index) in data.data.entries"
            :key="index"
            class="lg:grid lg:grid-cols-[300px,1fr] lg:items-start lg:gap-[100px]"
          >
            <h2
              class="text-lg leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px]"
            >
              {{ item.meta.en?.title }}
            </h2>
            <ContentManager
              :item="item.content.en || []"
              class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-[1.35] lg:text-appGray-500"
            />
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, LegalPageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<LegalPageData>>({
    url: "/legal.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: "Legal",
  })
);
</script>
