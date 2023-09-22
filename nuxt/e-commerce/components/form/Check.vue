<template>
  <label class="relative flex items-center gap-3 cursor-pointer">
    <input
      :value="modelValue"
      type="checkbox"
      class="sr-only"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <div
      class="flex items-center justify-center w-6 h-6 rounded-sm bg-white border border-appGray-400"
    >
      <div
        class="w-4 h-4 bg-appText rounded-[1px] transition-opacity duration-300"
        :class="[modelValue ? '' : 'opacity-0']"
      />
    </div>
    <div
      class="text-lg leading-none tracking-[-2%] select-none mb-1 md:text-[24px]"
    >
      {{ label }}
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: { type: String, required: true },
});

defineEmits(['update:modelValue']);
</script>
