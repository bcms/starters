<template>
  <component
    :is="tag ? tag : to ? NuxtLink : 'button'"
    :to="to"
    class="group relative flex items-center text-sm leading-none rounded-[32px] border transition-all duration-300 focus:outline-none lg:text-base lg:leading-none"
    :class="[
      theme === 'fill'
        ? 'bg-[#D1D0C7] text-white border-transparent'
        : theme === 'accent'
        ? 'bg-appAccent text-white border-transparent'
        : 'border-appText',
      size === 'sm'
        ? ''
        : size === 'lg'
        ? 'px-4 py-[17px] lg:p-6'
        : 'px-4 py-[13px] md:px-6 md:py-4',
    ]"
    @mouseover="isArrowVisible = true"
    @mouseleave="isArrowVisible = false"
  >
    <slot />
    <Transition name="scaleBtnArrow">
      <ArrowIcon
        v-if="isArrowVisible && !hideArrow"
        class="w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100"
      />
    </Transition>
  </component>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import ArrowIcon from '@/assets/icons/arrow.svg';

defineProps({
  to: {
    type: String,
    required: false,
    default: '',
  },
  theme: {
    type: String as PropType<'fill' | 'outline' | 'accent'>,
    required: false,
    default: 'outline',
  },
  hideArrow: Boolean,
  tag: {
    type: String,
    required: false,
    default: '',
  },
  size: {
    type: String as PropType<'sm' | 'regular' | 'lg'>,
    required: false,
    default: 'regular',
  },
});

const NuxtLink = resolveComponent('NuxtLink');

const isArrowVisible = ref(false);
</script>
