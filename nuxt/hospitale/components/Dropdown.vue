<template>
  <div class="relative z-10">
    <button
      class="flex items-center justify-between border-b border-appGray-400 py-[19px] w-full"
      @click="showOptions = !showOptions"
    >
      <div class="flex items-center">
        <component :is="icon" class="w-[14px] h-[14px] mr-1.5" />
        <span
          class="text-sm leading-none font-medium tracking-[-0.41px] transition-colors duration-300"
          :class="[modelValue ? '' : 'text-appGray-500']"
        >
          {{ modelValue || placeholder }}
        </span>
      </div>
      <ChevronIcon
        class="w-[14px] h-[14px] transition-transform duration-300"
        :class="[showOptions ? 'rotate-180' : '']"
      />
    </button>
    <Transition name="fade">
      <div
        v-if="showOptions"
        v-click-outside="() => (showOptions = !showOptions)"
        class="absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px border border-[#DBD9D5] bg-[#DBD9D5] rounded-md max-h-[204px] overflow-y-auto"
        :style="{
          boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.07)',
        }"
      >
        <button
          v-for="(option, index) in options"
          :key="index"
          class="px-5 py-[13px] w-full text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500 text-left transition-colors duration-300 hover:bg-[#DEDCD7]"
          :class="[modelValue === option ? 'bg-[#DEDCD7] ' : 'bg-white']"
          @click="handleOptionSelect(option)"
        >
          {{ option }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ChevronIcon from "@/assets/icons/chevron-down.svg";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  icon: {
    type: Object as PropType<any>,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const showOptions = ref(false);

const handleOptionSelect = (option: string) => {
  if (props.modelValue === option) {
    emits("update:modelValue", "");
  } else {
    emits("update:modelValue", option);
  }

  showOptions.value = false;
};
</script>
