<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <ContactHero
      :title="data.page.meta.title"
      :email="data.page.meta.email"
      :phone="data.page.meta.phone"
    />
    <ContactForm />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { ContactPageEntry, ContactPageEntryMeta } from '~~/bcms/types';
import { ContactPageData, PageProps } from '~~/types';
import { getHeaderAndFooter } from '~~/utils/page-data';

const { data, error } = useAsyncData<PageProps<ContactPageData> | undefined>(
  'contact',
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Contact Page entry
    const contactPage = (await ctx?.$bcms.entry.get({
      template: 'contact_page',
      entry: 'contact',
    })) as ContactPageEntry;
    if (!contactPage) {
      throw new Error('Contact page entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        // Return Contact Page entry for `en` locale
        meta: contactPage.meta.en as ContactPageEntryMeta,
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
