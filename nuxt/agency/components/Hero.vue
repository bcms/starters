<template>
  <section class="mt-6 mb-8 md:mt-10 md:mb-12 lg:mt-[68px] lg:mb-16">
    <div class="container">
      <div class="flex flex-col items-center text-center max-w-[755px] mx-auto">
        <div
          class="text-appAccent font-Inter text-xs font-medium leading-none tracking-[-0.24px] px-2 py-1.5 bg-appAccent/10 rounded-[5px] mb-3 lg:text-sm lg:leading-none lg:tracking-[-0.28px] lg:mb-4"
        >
          {{ subtitle }}
        </div>
        <h1
          class="font-bold leading-none tracking-[-0.32px] mb-2 md:text-3xl md:leading-none lg:font-Inter lg:font-medium lg:text-5xl lg:leading-none lg:tracking-[-0.96px] lg:mb-4"
        >
          {{ title }}
        </h1>
        <ContentManager
          :item="description"
          class="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] lg:text-base lg:leading-[1.4] lg:tracking-[-0.32px]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: Object as PropType<BCMSPropRichTextDataParsed>,
    required: true,
  },
});
</script>
