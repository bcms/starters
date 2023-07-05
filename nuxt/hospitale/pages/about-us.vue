<template>
  <PageWrapper v-if="data && meta" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
      <BCMSImage
        :media="meta.cover"
        class="w-full aspect-[2.76] cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]"
      />
      <div class="container">
        <h1
          class="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16"
        >
          {{ meta.title }}
        </h1>
        <div class="aboutUs--content text-center mb-12 md:mb-20 lg:mb-[120px]">
          <template v-for="(item, index) in meta.content" :key="index">
            <ContentManager
              v-if="item.text && item.text.length > 0"
              :key="index"
              :item="item.text"
              class="leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-[32px] lg:leading-normal"
            />
            <span
              v-if="item.image"
              :key="index"
              :style="{
                backgroundImage: `url(/bcms-media${item.image.src})`,
              }"
              class="image w-[37px] h-4 flex-shrink-0 mx-1 translate-y-0.5 bg-center bg-cover lg:w-[112px] lg:h-12 lg:mx-3 lg:translate-y-3"
            />
          </template>
        </div>
      </div>
      <AboutPageTeam :data="meta.team" :members="data.data.team" />
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

const meta = computed(() => {
  return data.value?.data.meta;
});

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>

<style lang="scss">
.aboutUs--content {
  * {
    @apply inline;
  }
  .image {
    @apply inline-block;
  }
  strong {
    @apply text-[#48465F];
  }
  u {
    @apply text-appText;
  }
}
</style>
