<template>
  <label>
    <input
      v-if="type !== 'textarea'"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full border bg-transparent rounded-[7px] px-4 py-3 font-Inter text-xs leading-none font-medium tracking-[-0.28px] transition-colors duration-300 placeholder:text-appText hover:border-appGray-100/50 focus:outline-none focus:border-appGray-100/50"
      :class="[error ? 'border-red-500' : 'border-transparent']"
      :style="{
        boxShadow:
          '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
      }"
      @input="handleInput"
    />
    <textarea
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full border bg-transparent rounded-[7px] px-4 py-3 font-Inter text-xs leading-none font-medium tracking-[-0.28px] transition-colors duration-300 placeholder:text-appText resize-none h-[334px] hover:border-appGray-100/50 focus:outline-none focus:border-appGray-100/50"
      :class="[error ? 'border-red-500' : 'border-transparent']"
      :style="{
        boxShadow:
          '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
      }"
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
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'text' | 'email' | 'textarea'>,
    required: false,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits('update:modelValue', target.value);
};
</script>
