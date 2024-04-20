<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-16 lg:pb-[120px]">
      <div class="container">
        <div class="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
          <h1 class="sr-only">Legal page content</h1>
          <div
            v-for="(item, index) in data.page.entries"
            :key="index"
            class="border border-[#DBD9D5] rounded-[7px] p-6"
          >
            <h2
              class="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay mb-3 lg:text-[32px] lg:leading-none lg:mb-5"
            >
              {{ item.meta.title }}
            </h2>
            <ContentManager
              :item="item.content"
              class="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
            />
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { LegalPageEntry, LegalPageEntryMeta } from '@/bcms/types';
import { LegalPageData, PageProps } from '@/types';

const { data, error } = useAsyncData<PageProps<LegalPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const legalEntries = (await ctx?.$bcms.entry.getAll({
    template: 'legal_page',
  })) as LegalPageEntry[];
  return {
    header,
    footer,
    page: {
      entries: legalEntries.map((entry) => {
        return {
          meta: entry.meta.en as LegalPageEntryMeta,
          content: entry.content.en as BCMSEntryContentParsedItem[],
        };
      }),
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
    title: 'Legal',
  }),
);
</script>
