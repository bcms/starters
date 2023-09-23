<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <section
      class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
    >
      <div class="container max-w-[1198px]">
        <ArchWithStar />
        <div
          class="relative px-4 max-w-[400px] mx-auto mb-10 lg:max-w-[745px] lg:mb-20 xl:px-0"
        >
          <h1
            class="text-xl leading-none font-Gloock uppercase text-center mb-6 lg:text-5xl lg:leading-none"
          >
            {{ data.page.meta.title }}
          </h1>
          <ContentManager
            :item="data.page.meta.description"
            class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
          />
        </div>
      </div>
      <div class="container">
        <div
          v-if="data.page.events.length > 0"
          class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <EventsPageEventCard
            v-for="(item, index) in data.page.events"
            :key="index"
            :card="item"
          />
        </div>
        <div
          v-else
          class="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20"
        >
          No events
        </div>
      </div>
    </section>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import {
  EventEntryMeta,
  EventsPageEntry,
  EventsPageEntryMeta,
} from '~~/bcms/types';
import { EventsPageData } from '~~/types';
import { PageProps } from '~~/types/page-props';

const { data, error } = useAsyncData<PageProps<EventsPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const eventsPage = (await ctx?.$bcms.entry.get({
    // Template name or ID
    template: 'events_page',
    // Entry slug or ID
    entry: 'events',
  })) as EventsPageEntry;
  if (!eventsPage) {
    throw new Error('Events page entry does not exist.');
  }
  const eventItems = (await ctx?.$bcms.entry.getAll({
    // Event item name or ID
    template: 'event',
  })) as EventsPageEntry[];
  return {
    header,
    footer,
    page: {
      meta: eventsPage.meta.en as EventsPageEntryMeta,
      events: eventItems.map((e) => e.meta.en) as EventEntryMeta[],
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
