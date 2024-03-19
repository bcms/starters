<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <ServicesList
      :title="data.page.meta.title"
      :description="data.page.meta.description"
      :services="data.page.meta.services"
    />
    <ContactBlock :data="data.page.meta.contact_block" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { ServicesPageEntry, ServicesPageEntryMeta } from '~~/bcms/types';
import { PageProps, ServicesPageData } from '~~/types';
import { getHeaderAndFooter } from '~~/utils/page-data';

const { data, error } = useAsyncData<PageProps<ServicesPageData> | undefined>(
  'services',
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Services Page entry
    const servicesPage = (await ctx?.$bcms.entry.get({
      template: 'services_page',
      entry: 'services',
    })) as ServicesPageEntry;
    if (!servicesPage) {
      throw new Error('Services page entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        // Return Services Page entry for `en` locale
        meta: servicesPage.meta.en as ServicesPageEntryMeta,
      },
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
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
