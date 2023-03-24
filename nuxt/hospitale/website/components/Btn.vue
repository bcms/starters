<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    class="group relative flex items-center text-sm leading-none font-medium tracking-[-0.41px] px-5 py-[17px] rounded-[32px] transition-all duration-300 focus:outline-none hover:px-7 lg:px-7 lg:py-[21px]"
    :class="[
      theme === 'accent'
        ? 'bg-appAccent text-white'
        : 'bg-appAccent/10 text-appAccent',
    ]"
    @mouseover="showArrow = true"
    @mouseleave="showArrow = false"
  >
    <slot />
    <Transition name="scaleBtnArrow">
      <ArrowIcon
        v-if="showArrow && !hideArrow"
        class="w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100"
      />
    </Transition>
  </component>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ArrowIcon from "@/assets/icons/arrow.svg";

defineProps({
  to: {
    type: String,
    required: false,
  },
  theme: {
    type: String as PropType<"accent" | "pale">,
    required: false,
    default: "accent",
  },
  hideArrow: Boolean,
});

const NuxtLink = resolveComponent("NuxtLink");

const showArrow = ref(false);
</script>
