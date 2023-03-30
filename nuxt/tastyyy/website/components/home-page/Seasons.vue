<template>
  <section>
    <div class="container">
      <div class="flex flex-col items-center mb-8 lg:mb-[88px]">
        <div
          class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
        >
          [ 2 ]
        </div>
        <h2
          class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
        >
          {{ data.title }}
        </h2>
        <ContentManager
          :item="data.description"
          class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto lg:text-base lg:leading-[1.3]"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div v-for="(meal, index) in data.seasons" :key="index" class="relative">
        <div v-if="meal.meta.en" class="container">
          <div
            class="relative z-10 flex flex-col items-center justify-center text-center py-12 min-h-[200px] lg:aspect-[1.73]"
          >
            <h3
              class="text-xl leading-none font-Gloock text-white uppercase lg:text-[32px] lg:leading-none"
            >
              {{ meal.meta.en.title }}
            </h3>
          </div>
          <BCMSImage
            :media="meal.meta.en?.cover"
            class="absolute top-0 left-0 w-full h-full cover"
          />
          <div class="absolute top-0 left-0 w-full h-full bg-black/40" />
        </div>
      </div>
    </div>
    <HomePageDivider />
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { HomeSeasonsGroup } from "~~/bcms/types";

defineProps({
  data: {
    type: Object as PropType<HomeSeasonsGroup>,
    required: true,
  },
});
</script>
