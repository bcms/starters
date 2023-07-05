<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <section
      class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
    >
      <div class="container max-w-[1198px]">
        <ArchWithStar />
        <div
          class="relative px-4 max-w-[400px] mx-auto lg:max-w-[850px] xl:px-0"
        >
          <h1
            class="text-xl leading-none font-Gloock uppercase text-center mb-12 lg:text-5xl lg:leading-none lg:mb-20"
          >
            Legal
          </h1>
          <div class="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
            <div
              v-for="(item, index) in data.data.entries"
              :key="index"
              class="border border-[#DBD9D5] rounded-[7px] p-6"
            >
              <h2
                class="leading-none tracking-[-0.41px] font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-5"
              >
                {{ item.meta.en?.title }}
              </h2>
              <ContentManager
                :item="item.content.en || []"
                class="text-sm leading-normal tracking-[-0.41px] text-appGray-200 lg:text-lg lg:leading-normal"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
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
