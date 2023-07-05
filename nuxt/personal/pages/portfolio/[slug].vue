<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
      <div class="relative mb-4 lg:mb-6">
        <div class="py-6">
          <div class="container">
            <div class="relative z-10 aspect-[1.23] md:aspect-[1.95]">
              <h1
                class="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none"
              >
                {{ data.data.meta.title }}
              </h1>
              <div class="flex items-end justify-between gap-5 h-full">
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Project
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ data.data.meta.project_no.padStart(2, "0") }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Brand name
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ data.data.meta.brand_name }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Role
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ data.data.meta.role }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                  >
                    Year
                  </div>
                  <div
                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                  >
                    {{ new Date(data.data.meta.year).getFullYear() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BCMSImage
          :media="data.data.meta.gallery[0]"
          :options="{
            sizes: {
              exec: [
                {
                  width: 1440,
                  height: 740,
                },
              ],
            },
          }"
          class="absolute top-0 left-0 w-full h-full cover"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-appText/80" />
      </div>
      <div class="container">
        <ContentManager
          :item="data.data.meta.description"
          class="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
        />
        <div class="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
          <BCMSImage
            v-for="(image, index) in data.data.meta.gallery.slice(1)"
            :key="index"
            :media="image"
            class="portfolioItemPage--galleryImage w-full cover h-full"
          />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, PortfolioItemPageData } from "~~/types";

const route = useRoute();

const pageSlug = route.params.slug as string;

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<PortfolioItemPageData>>({
    url: `/portfolio/${pageSlug}/data.json`,
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
.portfolioItemPage--galleryImage {
  &:nth-of-type(3n + 1) {
    @apply col-span-2;
  }
  &:nth-of-type(3n + 3) {
    @apply col-span-3;
  }
}
</style>
