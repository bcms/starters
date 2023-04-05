<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
      <div class="container mb-10 lg:mb-[128px] xl:pr-[220px]">
        <AnimatedTitle
          :title="data.data.meta.title"
          class="mb-10 lg:mb-[192px]"
          title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
        />
        <div class="mb-8 lg:flex lg:items-start lg:gap-[98px] lg:mb-14">
          <div class="flex items-center mb-[14px] flex-shrink-0 lg:w-[200px]">
            <div
              class="w-1.5 h-1.5 flex-shrink-0 bg-appText rounded-full mr-2 lg:w-2 lg:h-2 lg:mr-4"
            />
            <div
              class="text-lg leading-none font-Helvetica tracking-[-0.41px] lg:text-[32px]"
            >
              {{ data.data.meta.education.title }}
            </div>
          </div>
          <div>
            <ContentManager
              :item="data.data.meta.education.description"
              class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-6 lg:text-base lg:leading-[1.4] lg:mb-8"
            />
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(degree, index) in data.data.meta.education.degrees"
                :key="index"
                class="flex text-sm leading-none tracking-[-0.41px] text-appGray-500 font-medium px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
              >
                {{ degree }}
              </div>
            </div>
          </div>
        </div>
        <div class="lg:flex lg:items-start lg:gap-[98px]">
          <div class="flex items-center mb-[14px] flex-shrink-0 lg:w-[200px]">
            <div
              class="w-1.5 h-1.5 flex-shrink-0 bg-appText rounded-full mr-2 lg:w-2 lg:h-2 lg:mr-4"
            />
            <div
              class="text-lg leading-none font-Helvetica tracking-[-0.41px] lg:text-[32px]"
            >
              {{ data.data.meta.work_history.title }}
            </div>
          </div>
          <div>
            <ContentManager
              :item="data.data.meta.work_history.description"
              class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-6 lg:text-base lg:leading-[1.4] lg:mb-8"
            />
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(item, index) in data.data.meta.work_history.items"
                :key="index"
                class="flex items-center text-sm leading-none tracking-[-0.41px] text-appGray-500 px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
              >
                <span>{{ item.company_name }}</span>
                <span
                  class="w-[3px] h-[3px] rounded-full bg-appGray-500 mx-1.5 lg:mx-2"
                />
                <span>{{ new Date(item.from).getFullYear() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BCMSImage
        :media="data.data.meta.cover"
        class="w-full cover aspect-[1.84] mb-10 lg:aspect-[2.59] lg:mb-20"
      />
      <div class="container">
        <div class="max-w-[969px] mx-auto">
          <ContentManager
            :item="data.data.meta.awards.title"
            class="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica mb-6 lg:text-[40px] lg:mb-16"
          />
          <div class="grid grid-cols-1 gap-[14px] lg:gap-6">
            <div
              v-for="(award, index) in data.data.meta.awards.items"
              :key="index"
              class="flex items-center justify-between pb-[14px] border-b border-appGray-200 lg:pb-6"
            >
              <div class="flex">
                <span
                  class="text-xs leading-none tracking-[-0.41px] mr-1 lg:text-base lg:leading-none lg:mr-2"
                >
                  {{ award.place }}
                </span>
                <span
                  class="text-sm leading-none tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-none"
                >
                  {{ award.title }}
                </span>
              </div>
              <div
                class="text-sm leading-none tracking-[-0.41px] lg:text-base lg:leading-none"
              >
                ({{ new Date(award.year).getFullYear() }})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse } from "~~/types";
import { AboutPageData } from "~~/types/pages/about";

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
