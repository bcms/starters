<template>
  <div
    class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
  >
    <div
      class="relative z-10 bg-white rounded-2xl border border-[#D4D4D4] p-6 w-[962px] max-w-[95vw] max-h-[90vh] overflow-y-auto overscroll-contain lg:p-14"
    >
      <div class="grid grid-cols-1 gap-6">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="border border-[#E6E6E6] rounded-lg p-4 lg:p-6"
        >
          <h2
            class="leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-3 lg:text-[32px] lg:leading-none lg:mb-5"
          >
            {{ item.meta.en?.title }}
          </h2>
          <ContentManager
            :item="item.content.en || []"
            class="text-sm leading-[1.4] font-medium tracking-[-0.02em] text-appGray-500 lg:text-lg lg:leading-normal lg:tracking-[-0.04em]"
          />
        </div>
      </div>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full cursor-pointer bg-[#171717B2]"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import { LegalEntry } from "~~/bcms/types";

defineProps({
  data: {
    type: Array as PropType<LegalEntry[]>,
    required: true,
  },
});

defineEmits(["close"]);
</script>
