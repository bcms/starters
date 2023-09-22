<template>
  <header class="relative z-50">
    <div class="relative z-10 container">
      <nav class="relative flex items-center justify-between py-6 md:py-8">
        <NuxtLink to="/" class="flex">
          <BCMSImage
            :media="data.logo"
            class="w-[92px]"
            :class="[
              showMobileMenu
                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                : '',
            ]"
          />
        </NuxtLink>
        <div class="flex items-center gap-5 md:gap-8">
          <ContentManager
            :item="data.nav"
            class="header--nav gap-6 text-xl max-md:text-white max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:text-appGray-700 md:text-base"
            :class="[showMobileMenu ? '' : 'max-md:hidden']"
          />
          <button
            class="flex items-center gap-2 leading-none px-3 py-2 bg-appGray-100 rounded-[5px] transition-colors duration-300 hover:bg-appGray-300"
          >
            <CartIcon
              class="translate-y-0.5 w-4 h-4"
              filled
              :font-controlled="false"
            />
            <span class="text-gray-700">My cart</span>
            <span class="font-bold font-sans text-sm">(0)</span>
          </button>
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
        </div>
      </nav>
    </div>
    <div
      v-if="showMobileMenu"
      class="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden"
    />
  </header>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { HeaderEntryMeta } from '~~/bcms/types';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import CartIcon from '@/assets/icons/cart.svg';

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});

const showMobileMenu = ref(false);
</script>

<style lang="scss">
.header {
  &--nav {
    ul {
      @apply flex flex-col gap-x-4 md:flex-row;
      li {
        @apply flex items-center gap-4;
        &:not(:first-of-type) {
          @apply md:before:w-1 md:before:h-1 md:before:mt-1 md:before:rounded-full md:before:bg-appGray-700;
        }
        a {
          @apply flex leading-none py-2 transition-colors duration-300 md:hover:text-appText;
        }
      }
    }
  }
}
</style>
