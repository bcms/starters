<template>
  <section class="pt-8 pb-16 lg:pt-[120px] lg:pb-[240px]">
    <div class="container">
      <div class="flex items-center justify-between mb-4 lg:mb-[72px]">
        <h2
          class="leading-none tracking-[-0.05em] font-semibold lg:text-[104px] lg:leading-none"
        >
          {{ data.title }}
        </h2>
        <ArrowIcon class="w-4 h-4 lg:w-[100px] lg:h-[104px]" />
      </div>
      <BCMSImage
        :media="data.cover"
        :options="{
          sizes: {
            exec: [
              {
                width: 660,
                height: 360,
              },
              {
                width: 960,
                height: 450,
              },
              {
                width: 1344,
                height: 625,
              },
            ],
          },
        }"
        class="w-full aspect-[1.78] cover mb-5 lg:aspect-[2.15] lg:mb-12"
      />
      <ContentManager
        :item="data.description"
        class="text-sm leading-[1.4] tracking-[-0.8px] text-appGray-500 font-medium mb-6 lg:text-[26px] lg:leading-[1.4] lg:mb-[112px]"
      />
      <div
        class="flex flex-wrap justify-around gap-x-14 gap-y-8 lg:justify-center lg:gap-x-[96px]"
      >
        <div
          v-for="(topic, index) in data.topics"
          :key="index"
          class="text-sm leading-none tracking-[-0.04em] font-semibold lg:text-[32px] lg:leading-none"
        >
          {{ topic }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { AboutGroup } from '~~/bcms/types';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { BCMSImage } from '~~/bcms-components';

defineProps({
  data: {
    type: Object as PropType<AboutGroup>,
    required: true,
  },
});
</script>
