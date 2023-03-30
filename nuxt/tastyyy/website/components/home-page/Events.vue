<template>
  <section class="overflow-hidden">
    <div class="container">
      <div class="flex flex-col items-center mb-8 lg:mb-20">
        <div
          class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
        >
          [ 5 ]
        </div>
        <h2
          class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
        >
          {{ data.title }}
        </h2>
        <ContentManager
          :item="data.description"
          class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
        />
      </div>
      <div
        v-if="items.length > 0"
        class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="px-6 py-8 rounded-2xl bg-[#EDEBE1]"
        >
          <BCMSImage
            :media="item.cover"
            class="cover aspect-[1.25] rounded-2xl overflow-hidden mb-4 lg:aspect-[1.77] lg:mb-6"
          />
          <div
            class="text-xs leading-none tracking-[-0.41px] text-appGray-600 uppercase mb-2 lg:text-base lg:leading-none lg:mb-3"
          >
            {{ item.date }}
          </div>
          <h3
            class="leading-none font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-6"
          >
            {{ item.title }}
          </h3>
          <ContentManager
            :item="item.description"
            class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-300 lg:text-xl lg:leading-none"
          />
        </div>
      </div>
      <div
        v-else
        class="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20"
      >
        No events
      </div>
    </div>
    <HomePageDivider arc />
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { EventEntryMeta } from "~~/bcms/types";
import { HomeEventsGroup } from "~~/bcms/types/group/home_events";

defineProps({
  data: {
    type: Object as PropType<HomeEventsGroup>,
    required: true,
  },
  items: {
    type: Array as PropType<EventEntryMeta[]>,
    required: true,
  },
});
</script>
