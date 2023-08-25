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
            {{ data.page.meta.subtitle }}
          </div>
          <h1
            class="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6"
          >
            {{ data.page.meta.title }}
          </h1>
          <ContentManager
            :item="data.page.meta.description"
            class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
          />
        </div>
        <div
          class="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8"
        >
          <BCMSImage
            :media="data.page.meta.cover"
            class="w-full h-full cover"
          />
          <div class="absolute top-0 left-0 w-full h-full bg-black/50" />
        </div>
        <ContentManager :item="data.page.content" class="prose" />
      </div>
      <TopGradient />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { NuxtApp } from 'nuxt/app';
import { BCMSImage } from '~~/bcms-components';
import { AboutPageEntry, AboutPageEntryMeta } from '~~/bcms/types';
import { AboutPageData, PageProps } from '~~/types';

const { data, error } = useAsyncData<PageProps<AboutPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  // Get About Page entry
  const aboutPage = (await ctx?.$bcms.entry.get({
    // Template name of ID
    template: 'about_page',
    // Entry slug or ID
    entry: 'about',
  })) as AboutPageEntry;
  if (!aboutPage) {
    throw new Error('About page entry does not exist.');
  }
  return {
    header,
    footer,
    page: {
      meta: aboutPage.meta.en as AboutPageEntryMeta,
      content: aboutPage.content.en as BCMSEntryContentParsedItem[],
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
    title: data.value?.page.meta.title,
  }),
);
</script>
