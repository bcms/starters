<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
      <div class="container">
        <div
          class="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12"
        >
          <h1
            class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
          >
            {{ data.page.meta.title }}
          </h1>
          <h2
            class="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none"
          >
            {{ data.page.meta.subtitle }}
          </h2>
        </div>
      </div>
      <TopGradient />
    </div>
    <ContactPageForm :email="data.page.meta.email" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { ContactPageEntry, ContactPageEntryMeta } from '~~/bcms/types';
import { ContactPageData, PageProps } from '~~/types';

const { data, error } = useAsyncData<PageProps<ContactPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const contactPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'contact_page',
      // Entry slug or ID
      entry: 'contact',
    })) as ContactPageEntry;
    if (!contactPage) {
      throw new Error('Contact page entry does not exist.');
    }
    return {
      header,
      footer,
      page: { meta: contactPage.meta.en as ContactPageEntryMeta },
    };
  },
);
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
