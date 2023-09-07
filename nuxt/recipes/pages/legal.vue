<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-24 pb-10 lg:pt-[104px] lg:pb-20 xl:pb-[120px]">
      <div class="container">
        <div class="grid grid-cols-1 gap-6 lg:gap-12">
          <div
            v-for="(item, index) in data.page.entries"
            :key="index"
            class="border border-[#E6E6E6] rounded-[10px] px-4 py-6 lg:rounded-2xl lg:px-8 lg:py-10"
          >
            <h2
              class="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-2 lg:text-[40px] lg:leading-none lg:mb-5"
            >
              {{ item.meta.en?.title }}
            </h2>
            <div
              class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-4 lg:text-base lg:leading-none lg:mb-6"
            >
              Last updated: {{ updatedDate(item.updatedAt) }}
            </div>
            <ContentManager
              :item="item.content.en || []"
              class="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
            />
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { LegalPageEntry } from '@/bcms/types';
import { PageProps, LegalPageData } from '~~/types';

const { data, error } = useAsyncData<PageProps<LegalPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);

  const legalPage = (await ctx?.$bcms.entry.getAll({
    // Template name or ID
    template: 'legal_page',
  })) as LegalPageEntry[];
  return {
    header,
    footer,
    page: {
      entries: legalPage,
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

const updatedDate = (val: number) => {
  const date = new Date(val);

  const day = date.getDate();
  const month = date.toLocaleString('default', {
    month: 'long',
  });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

useHead(() =>
  setOgHead({
    title: 'Legal',
  }),
);
</script>
