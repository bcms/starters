<template>
  <label class="flex flex-col">
    <div
      v-if="label"
      class="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-4 lg:text-base lg:leading-none"
    >
      {{ label }}
    </div>
    <input
      v-if="type !== 'textarea'"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="border border-[#C2C0BC] bg-transparent rounded-[40px] px-4 py-[14px] text-xs leading-none font-medium tracking-[-0.41px] placeholder:text-[#56565F] focus:outline-none lg:px-5 lg:py-[17px] lg:text-sm lg:leading-none"
      :style="{
        boxShadow: '0px 0px 4px rgba(196, 202, 217, 0.3)',
      }"
      @input="handleInput"
    />
    <textarea
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      class="border border-[#C2C0BC] bg-transparent rounded-[10px] px-4 py-[14px] text-xs leading-none font-medium tracking-[-0.41px] placeholder:text-[#56565F] resize-none h-[96px] focus:outline-none lg:px-5 lg:py-[17px] lg:text-sm lg:leading-none lg:h-[152px]"
      :style="{
        boxShadow: '0px 0px 4px rgba(196, 202, 217, 0.3)',
      }"
      @input="handleInput"
    >
    </textarea>
  </label>
</template>

<script setup lang="ts">
import { PropType } from "vue";

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
  type: {
    type: String as PropType<"text" | "email" | "date" | "textarea">,
    required: false,
    default: "text",
  },
  error: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("update:modelValue", target.value);
};
</script>
