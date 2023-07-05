<template>
  <div class="flex flex-col">
    <div
      v-if="label"
      class="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-4 lg:text-base lg:leading-none"
    >
      {{ label }}
    </div>
    <div class="relative">
      <button
        class="flex items-center justify-between w-full border bg-transparent rounded-[40px] px-4 py-[14px] transition-colors duration-300 focus:outline-none lg:px-5 lg:py-[17px]"
        :class="[
          error ? 'border-red-500' : 'border-[#C2C0BC]',
          !modelValue ? 'text-[#56565F]' : '',
        ]"
        :style="{
          boxShadow: '0px 0px 4px rgba(196, 202, 217, 0.3)',
        }"
        @click="showOptions = !showOptions"
      >
        <span
          class="text-xs leading-none font-medium tracking-[-0.41px] lg:text-sm lg:leading-none"
        >
          {{ modelValue || placeholder }}
        </span>
        <ChevronIcon
          class="w-[14px] h-[14px] transition-transform duration-300"
          :class="[showOptions ? 'rotate-180' : '']"
        />
      </button>
      <Transition name="fade">
        <div
          v-if="showOptions"
          v-click-outside="() => (showOptions = false)"
          class="absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px border border-[#DBD9D5] bg-[#DBD9D5] rounded-lg max-h-[204px] overflow-y-auto"
          :style="{
            boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.07)',
          }"
        >
          <button
            v-for="(option, index) in options"
            :key="index"
            class="px-5 py-[13px] w-full text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500 text-left transition-colors duration-300 hover:bg-[#DEDCD7]"
            :class="[modelValue === option ? 'bg-[#DEDCD7]' : 'bg-white']"
            @click="handleOptionSelect(option)"
          >
            {{ option }}
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ChevronIcon from "@/assets/icons/chevron-down.svg";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["update:modelValue"]);

const showOptions = ref(false);

const handleOptionSelect = (option: string) => {
  emits("update:modelValue", option);
};
</script>
