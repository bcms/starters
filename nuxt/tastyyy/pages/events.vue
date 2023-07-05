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
            {{ data.data.meta.title }}
          </h1>
          <ContentManager
            :item="data.data.meta.description"
            class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
          />
        </div>
      </div>
      <div class="container">
        <div
          v-if="data.data.events.length > 0"
          class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <EventsPageEventCard
            v-for="(item, index) in data.data.events"
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
import { APIResponse, EventsPageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<EventsPageData>>({
    url: "/events.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
