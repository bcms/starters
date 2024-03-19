<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <Hero
      :title="data.page.meta.title"
      subtitle="Team"
      :description="data.page.meta.description"
    />
    <TeamList :items="data.page.meta.team_members" />
    <ContactBlock :data="data.page.meta.contact_block" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { TeamPageEntry, TeamPageEntryMeta } from '~~/bcms/types';
import { PageProps, TeamPageData } from '~~/types';
import { getHeaderAndFooter } from '~~/utils/page-data';

const { data, error } = useAsyncData<PageProps<TeamPageData> | undefined>(
  'team',
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Team Page entry
    const teamPage = (await ctx?.$bcms.entry.get({
      template: 'team_page',
      entry: 'team',
    })) as TeamPageEntry;
    if (!teamPage) {
      throw new Error('Team page entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        // Return Team Page entry for `en` locale
        meta: teamPage.meta.en as TeamPageEntryMeta,
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
