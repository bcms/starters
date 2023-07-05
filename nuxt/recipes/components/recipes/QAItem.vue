<template>
  <div class="border border-[#E8E8E8] rounded-lg">
    <button
      class="flex items-center justify-between px-[14px] py-4 w-full text-left lg:px-6 lg:py-5"
      @click="showAnswer = !showAnswer"
    >
      <span
        class="text-xs leading-none font-semibold text-appGray-700 tracking-[-0.41px] lg:text-base lg:leading-none"
      >
        {{ item.question }}
      </span>
      <ChevronIcon
        class="w-4 h-4 transition-transform duration-300"
        :class="[showAnswer ? 'rotate-180' : '']"
      />
    </button>
    <ContentManager
      v-if="showAnswer"
      :item="item.answer"
      class="px-[14px] pb-[18px] -mt-1 text-sm leading-[1.55] tracking-[-0.41px] text-appGray-500 lg:px-6 lg:pb-5 lg:text-lg"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { QaItemGroup } from "~~/bcms/types";
import ChevronIcon from "@/assets/icons/chevron-down.svg";

defineProps({
  item: {
    type: Object as PropType<QaItemGroup>,
    required: true,
  },
});

const showAnswer = ref(false);
</script>
