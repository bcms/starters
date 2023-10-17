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
              v-for="(item, index) in data.page.entries"
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
import type { NuxtApp } from 'nuxt/app';
import { LegalPageEntry } from '~~/bcms/types';
import { LegalPageData } from '~~/types';
import { PageProps } from '~~/types/page-props';

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

useHead(() =>
  setOgHead({
    title: 'Legal',
  }),
);
</script>
