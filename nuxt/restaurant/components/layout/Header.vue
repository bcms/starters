<template>
  <header class="relative z-50">
    <div class="relative z-10 container">
      <nav class="relative flex items-center justify-between pt-6 lg:pt-8">
        <NuxtLink to="/" class="flex md:flex-1" aria-label="Home page">
          <BCMSImage
            :media="data.logo"
            svg
            class="w-[60px] md:w-[101px]"
            :class="[
              showMobileMenu
                ? 'max-md:grayscale-0 max-md:brightness-[0.2] max-md:invert-0'
                : '',
            ]"
          />
        </NuxtLink>
        <ul
          class="flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-8"
          :class="[showMobileMenu ? 'flex flex-col' : 'max-md:hidden']"
        >
          <li v-for="(item, index) in data.nav" :key="index">
            <ContentManager
              :item="item"
              class="text-lg leading-none tracking-[-0.41px] uppercase md:text-sm"
            />
          </li>
          <li>
            <NuxtLink
              to="/"
              class="text-lg leading-none tracking-[-0.41px] uppercase md:hidden"
            >
              Contact us
            </NuxtLink>
          </li>
        </ul>
        <div class="flex justify-end max-md:hidden md:flex-1">
          <Btn to="/contact" class="uppercase">
            <span>Contact us</span>
          </Btn>
        </div>
        <button
          class="flex md:hidden"
          aria-label="Toggle mobile menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <XIcon v-if="showMobileMenu" class="w-6 h-6" />
          <MenuIcon v-else class="w-6 h-6" />
        </button>
      </nav>
    </div>
    <div
      v-if="showMobileMenu"
      class="fixed top-0 left-0 w-screen h-screen bg-appAccent md:hidden"
    />
  </header>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { HeaderEntryMeta } from '~~/bcms/types';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});

const showMobileMenu = ref(false);
</script>
