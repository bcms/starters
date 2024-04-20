<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <h1 class="sr-only">Legal page</h1>
    <div class="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
      <div class="container">
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="(item, index) in data.page.entries"
            :key="index"
            class="border border-[#DBD9D5] p-6"
          >
            <h2
              class="text-[24px] leading-none tracking-[-1.4px] text-appGray-900 mb-5 md:text-[32px]"
            >
              {{ item.meta.title }}
            </h2>
            <ContentManager
              :item="item.content"
              class="grid grid-cols-1 gap-4 leading-[1.5] tracking-[-4%] text-appGray-500 md:text-lg"
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
import { LegalEntry, LegalEntryMeta } from '@/bcms/types';
import { LegalPageData, PageProps } from '@/types';

const { data, error } = useAsyncData<PageProps<LegalPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const legalEntries = (await ctx?.$bcms.entry.getAll({
    template: 'legal',
  })) as LegalEntry[];
  return {
    header,
    footer,
    page: {
      entries: legalEntries.map((entry) => {
        return {
          meta: entry.meta.en as LegalEntryMeta,
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
