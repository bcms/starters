<template>
  <header class="relative z-50">
    <div class="relative z-10 container">
      <nav class="relative flex items-center justify-between pt-6">
        <NuxtLink to="/" class="flex">
          <BCMSImage
            :media="data.logo"
            svg
            class="w-[125px] md:w-[165px]"
            :class="[
              showMobileMenu
                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                : '',
            ]"
          />
        </NuxtLink>
        <ul
          class="flex gap-6 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center lg:gap-10"
          :class="[showMobileMenu ? 'flex-col' : 'max-md:hidden']"
        >
          <li v-for="(item, index) in data.nav" :key="index">
            <ContentManager
              :item="item"
              class="text-xl leading-none tracking-[-0.41px] max-md:text-white"
            />
          </li>
        </ul>
        <button
          class="flex md:hidden"
          @click="showMobileMenu = !showMobileMenu"
        >
          <XIcon
            v-if="showMobileMenu"
            class="w-6 h-6"
            :class="[
              showMobileMenu
                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                : '',
            ]"
          />
          <MenuIcon v-else class="w-6 h-6" />
        </button>
      </nav>
    </div>
    <div
      v-if="showMobileMenu"
      class="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden"
    />
  </header>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { HeaderEntryMeta } from "~~/bcms/types";
import MenuIcon from "@/assets/icons/menu.svg";
import XIcon from "@/assets/icons/x.svg";

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});

const showMobileMenu = ref(false);
</script>
