<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-16 lg:pb-[120px]">
      <div class="container">
        <div class="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
          <h1 class="sr-only">Legal page content</h1>
          <div
            v-for="(item, index) in data.data.entries"
            :key="index"
            class="border border-[#DBD9D5] rounded-[7px] p-6"
          >
            <h2
              class="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay mb-3 lg:text-[32px] lg:leading-none lg:mb-5"
            >
              {{ item.meta.en?.title }}
            </h2>
            <ContentManager
              :item="item.content.en || []"
              class="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
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
