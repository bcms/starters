<template>
  <section>
    <div class="container">
      <div class="flex flex-col items-center mb-8 lg:mb-[88px]">
        <div
          class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
        >
          [ 1 ]
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
    <NuxtLink
      v-for="(meal, index) in data.meals"
      :key="index"
      :to="`/menu?s=${meal.meta.en?.title.toLowerCase()}`"
      class="flex relative"
    >
      <div v-if="meal.meta.en" class="container">
        <div
          class="relative z-10 flex flex-col items-center text-center py-12 max-w-[765px] mx-auto lg:py-[150px]"
        >
          <h3
            class="text-sm leading-none font-Gloock text-white uppercase mb-3 lg:text-[32px] lg:leading-none lg:mb-[18px]"
          >
            {{ meal.meta.en.title }}
          </h3>
          <ContentManager
            :item="meal.meta.en.description"
            class="text-xs leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 lg:text-lg lg:leading-[1.3]"
          />
        </div>
        <BCMSImage
          :media="meal.meta.en?.cover"
          class="absolute top-0 left-0 w-full h-full cover"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-black/40" />
      </div>
    </NuxtLink>
    <HomePageDivider />
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { HomeMenuGroup } from '~~/bcms/types/group/home_menu';

defineProps({
  data: {
    type: Object as PropType<HomeMenuGroup>,
    required: true,
  },
});
</script>
