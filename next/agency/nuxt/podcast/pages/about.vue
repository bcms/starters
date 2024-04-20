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
          {{ data.page.meta.title }}
        </h1>
        <BCMSImage
          :media="data.page.meta.cover"
          :options="{
            sizes: {
              exec: [
                {
                  width: 654,
                  height: 654,
                },
                {
                  width: 768,
                  height: 291,
                },
                {
                  width: 1344,
                  height: 544,
                },
              ],
            },
          }"
          class="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60"
        />
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="(item, index) in data.page.meta.content"
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
import { NuxtApp } from 'nuxt/app';
import { BCMSImage } from '~~/bcms-components';
import { AboutPageEntry, AboutPageEntryMeta } from '~~/bcms/types';
import { AboutPageData, PageProps } from '~~/types';

const { data, error } = useAsyncData<PageProps<AboutPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const aboutPage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'about_page',
    // Entry slug or ID
    entry: 'about-us',
  })) as AboutPageEntry;
  if (!aboutPage) {
    throw new Error('About page entry does not exist.');
  }
  return {
    header,
    footer,
    page: {
      meta: aboutPage.meta.en as AboutPageEntryMeta,
    },
  };
});
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
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
