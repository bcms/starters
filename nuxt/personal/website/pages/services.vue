<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
      <div class="container">
        <AnimatedTitle
          :title="data.data.meta.title"
          class="mb-10 lg:mb-[192px]"
          title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
        />
        <div class="grid grid-cols-1 gap-10 lg:gap-[72px]">
          <div
            v-for="(service, index) in data.data.services"
            :key="index"
            class="lg:grid lg:grid-cols-[1fr,378px,minmax(auto,1fr)] lg:items-start lg:gap-10"
          >
            <div class="flex items-center max-lg:mb-[14px]">
              <div
                class="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-2"
              />
              <h2
                class="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none"
              >
                {{ service.title }}
              </h2>
            </div>
            <div class="max-lg:mb-6 lg:max-w-[378px]">
              <ContentManager
                :item="service.description"
                class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-[14px] lg:text-base lg:leading-[1.4] lg:mb-6"
              />
              <div
                class="leading-none tracking-[-0.41px] font-Helvetica lg:text-xl lg:leading-none"
              >
                Start from ${{ service.start_price }}
              </div>
            </div>
            <div class="flex lg:justify-end">
              <button
                class="flex justify-center items-center w-full px-6 py-[13px] border border-appGray-200 rounded-[32px] text-appGray-500 transition-colors duration-300 hover:border-appText hover:bg-appText hover:text-white lg:px-10 lg:py-5 lg:w-auto"
              >
                <span
                  class="text-sm leading-none tracking-[-0.41px] font-medium lg:text-2xl lg:leading-none"
                >
                  Start project
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, ServicesPageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<ServicesPageData>>({
    url: "/services.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
