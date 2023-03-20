<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    class="flex items-center px-4 py-[13px] rounded-lg text-sm leading-none font-medium transition-colors duration-300 border border-transparent lg:text-xl lg:leading-none lg:px-8 lg:py-[18px]"
    :class="[
      theme === 'light'
        ? 'bg-appGray-200 text-appAccent hover:bg-appAccent hover:text-appGray-200 hover:border-appGray-200'
        : 'bg-appAccent text-appGray-200 hover:bg-appGray-200 hover:text-appAccent hover:border-appAccent',
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  to: {
    type: String,
    required: false,
  },
  theme: {
    type: String as PropType<"light" | "dark">,
    required: false,
    default: "light",
  },
});

const NuxtLink = resolveComponent("NuxtLink");
</script>
