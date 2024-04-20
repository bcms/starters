<template>
  <section>
    <div class="container">
      <div
        class="flex flex-col items-center text-center max-w-[672px] mx-auto max-md:px-2"
      >
        <h2
          class="font-bold leading-[1.2] tracking-[-0.32px] mb-3 lg:mb-4 lg:text-[32px] lg:tracking-[-0.64px]"
        >
          {{ data.title }}
        </h2>
        <ContentManager
          :item="data.description"
          class="text-appGray-200 text-xs font-medium leading-none tracking-[-0.24px] mb-4 lg:mb-8 lg:text-base lg:leading-none lg:tracking-[-0.32px]"
        />
        <ContactUs />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ContactBlockGroup } from '~~/bcms/types';

defineProps({
  data: {
    type: Object as PropType<ContactBlockGroup>,
    required: true,
  },
});
</script>
