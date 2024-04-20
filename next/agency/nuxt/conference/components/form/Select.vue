<template>
  <label class="relative flex flex-col">
    <div
      v-if="label"
      class="text-xs leading-none tracking-[-0.04em] text-appGray-500 mb-3 lg:text-xl lg:leading-none lg:mb-6"
    >
      {{ label }}
    </div>
    <div class="relative">
      <button
        type="button"
        class="flex items-center justify-between w-full border bg-[#FAFAFA] rounded-lg px-5 py-[14px] text-sm leading-none tracking-[-0.04em] text-appGray-600 transition-colors duration-300 placeholder:text-appGray-600 focus:outline-none lg:px-5 lg:py-[19px] lg:text-2xl lg:leading-none"
        :class="[error ? 'border-red-500' : 'border-transparent']"
        @click="showOptions = !showOptions"
      >
        <span class="truncate mr-2">
          {{ modelValue || placeholder }}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[14px] h-[14px] transition-transform duration-300 lg:w-6 lg:h-6"
          :class="[showOptions ? 'rotate-180' : '']"
        >
          <mask
            id="mask0_1207_1541"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1207_1541)">
            <path
              d="M12 15.3751L6 9.3751L7.4 7.9751L12 12.5751L16.6 7.9751L18 9.3751L12 15.3751Z"
              fill="#1C1B1F"
            />
          </g>
        </svg>
      </button>
      <Transition name="fade">
        <div
          v-if="showOptions"
          v-click-outside="() => (showOptions = false)"
          class="absolute z-50 -top-1 left-0 w-full -translate-y-full grid grid-cols-1 bg-white border border-appGray-400 overflow-hidden rounded-lg lg:rounded-2xl"
        >
          <button
            v-for="(option, index) in options"
            :key="index"
            type="button"
            class="flex w-full text-sm leading-none tracking-[-0.04em] text-appGray-600 transition-colors duration-300 hover:bg-[#FAFAFA] px-5 py-[14px] lg:text-2xl lg:leading-none lg:px-5 lg:py-4"
            @click="
              $emit('update:modelValue', option);
              showOptions = false;
            "
          >
            {{ option }}
          </button>
        </div>
      </Transition>
    </div>
  </label>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
});

defineEmits(['update:modelValue']);

const showOptions = ref(false);
</script>
