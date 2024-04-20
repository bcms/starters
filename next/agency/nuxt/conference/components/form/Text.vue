<template>
  <label class="relative flex flex-col">
    <div
      v-if="label"
      class="text-xs leading-none tracking-[-0.04em] text-appGray-500 mb-3 lg:text-xl lg:leading-none lg:mb-6"
    >
      {{ label }}
    </div>
    <input
      v-if="type !== 'textarea'"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="border rounded-lg px-5 py-[13px] text-sm leading-none tracking-[-0.04em] text-appGray-600 bg-[#FAFAFA] transition-colors duration-300 placeholder:text-appGray-600 focus:outline-none lg:px-5 lg:py-4 lg:text-2xl lg:leading-none"
      :class="[error ? 'border-red-500' : 'border-transparent']"
      @input="handleInput"
    />
    <textarea
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      class="border rounded-lg px-5 py-[13px] text-sm leading-none tracking-[-0.04em] text-appGray-600 bg-[#FAFAFA] transition-colors duration-300 placeholder:text-appGray-600 resize-none h-[110px] focus:outline-none lg:px-5 lg:py-4 lg:text-2xl lg:leading-none lg:h-[256px]"
      :class="[error ? 'border-red-500' : 'border-transparent']"
      @input="handleInput"
    >
    </textarea>
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
    type: String as PropType<'text' | 'email' | 'textarea'>,
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
