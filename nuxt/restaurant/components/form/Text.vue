<template>
  <label class="relative flex flex-col">
    <div
      v-if="label"
      class="absolute -top-2 left-[14px] px-[14px] bg-appBody text-xs leading-none tracking-[-0.41px] text-appGray-400 lg:left-7 lg:text-sm lg:leading-none"
    >
      {{ label }}
    </div>
    <input
      v-if="type !== 'textarea'"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="border bg-transparent rounded-[48px] px-[14px] py-[17px] text-sm leading-none tracking-[-0.41px] transition-colors duration-300 placeholder:text-[#665E5E] focus:outline-none lg:px-7 lg:py-6 lg:text-base lg:leading-none"
      :class="[error ? 'border-red-500' : 'border-[#A8A7A0]']"
      @input="handleInput"
    />
    <textarea
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      class="border bg-transparent rounded-[32px] px-[14px] py-[17px] text-sm leading-none tracking-[-0.41px] placeholder:text-[#665E5E] resize-none h-[140px] transition-colors duration-300 focus:outline-none lg:px-7 lg:py-6 lg:text-base lg:leading-none lg:h-[224px]"
      :class="[error ? 'border-red-500' : 'border-[#A8A7A0]']"
      @input="handleInput"
    />
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
  type: {
    type: String as PropType<'text' | 'email' | 'date' | 'time' | 'textarea'>,
    required: false,
    default: 'text',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits('update:modelValue', target.value);
};
</script>
