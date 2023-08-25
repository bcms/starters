<template>
  <article>
    <NuxtLink
      :to="`/jobs/${card.slug}`"
      class="flex flex-col border border-[#DBD9D5] rounded-[5px] p-5 transition-colors duration-300 hover:bg-[#E0DED9] lg:px-6 lg:py-7 lg:rounded-lg"
    >
      <div class="flex items-center justify-between mb-3 lg:mb-6">
        <div>
          <h3
            class="text-sm leading-none font-semibold font-PlayfairDisplay tracking-[-0.41px] mb-2 lg:text-xl lg:leading-none"
          >
            {{ card.title }}
          </h3>
          <div
            class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-base lg:leading-none"
          >
            {{ card.location }}
          </div>
        </div>
        <div
          v-if="card.featured"
          class="px-3 py-1.5 rounded-[32px] bg-appAccent/10 text-xs leading-none font-medium tracking-[-0.41px] text-appAccent lg:px-7 lg:py-[13px] lg:text-sm lg:leading-none"
        >
          Featured
        </div>
      </div>
      <ContentManager
        :item="card.description"
        class="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 mb-6 lg:text-base lg:leading-[1.4] lg:mb-8"
      />
      <Btn tag="div" size="sm" class="justify-center mt-auto">
        <span>Apply</span>
      </Btn>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { JobLite } from '@/types';

defineProps({
  card: {
    type: Object as PropType<JobLite>,
    required: true,
  },
});
</script>
