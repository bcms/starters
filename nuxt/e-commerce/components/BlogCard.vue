<template>
  <NuxtLink :to="`/blog/${card.slug}`" class="group flex flex-col">
    <div class="flex overflow-hidden mb-6">
      <BCMSImage
        :media="card.cover"
        :options="{
          sizes: {
            exec: [
              {
                width: 640,
              },
            ],
          },
        }"
        class="w-full h-[320px] cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="mb-6">
      <div
        class="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-500 mb-3 lg:text-[18px]"
      >
        <div>
          {{ formattedDate(card.date) }}
        </div>
        <div class="w-1 h-1 rounded-full bg-current mt-1" />
        <div>By {{ card.author.meta.en?.title }}</div>
      </div>
      <h3 class="text-xl leading-none tracking-[-2%] lg:text-[24px]">
        {{ card.title }}
      </h3>
    </div>
    <div
      class="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] mt-auto bg-appText text-white transition-colors duration-300 hover:bg-appText/80"
    >
      Read now
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { BlogEntryMeta } from '~~/bcms/types';

defineProps({
  card: {
    type: Object as PropType<BlogEntryMeta>,
    required: true,
  },
});

const formattedDate = (date: number) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
