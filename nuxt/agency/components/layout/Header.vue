<template>
  <header class="relative z-50">
    <div class="relative z-10 container">
      <nav class="relative flex items-center justify-between py-4 lg:py-5">
        <NuxtLink to="/" class="flex" aria-label="Home page">
          <img
            :src="Logo"
            alt="Logo"
            class="w-auto h-4"
            :class="[
              showMobileMenu
                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                : '',
            ]"
          />
        </NuxtLink>
        <ul
          class="flex gap-5 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center"
          :class="[showMobileMenu ? 'flex-col' : 'max-md:hidden']"
        >
          <li v-for="(item, index) in data.nav" :key="index">
            <ContentManager
              :item="item"
              class="relative font-Inter text-sm leading-none font-medium tracking-[-0.56px] max-md:text-appText-light transition-colors duration-300 md:hover:text-appText"
              :class="[
                getHref(item) === $route.path
                  ? 'text-appAccent-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:translate-y-full after:w-1.5 after:h-1.5 after:bg-appAccent-300 after:rounded-full max-md:after:opacity-0'
                  : 'text-appGray-300',
              ]"
            />
          </li>
        </ul>
        <ContactUs class="max-md:hidden" />
        <button
          class="flex md:hidden"
          aria-label="Toggle mobile menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <SvgoX
            v-if="showMobileMenu"
            filled
            :font-controlled="false"
            class="w-6 h-6"
            :class="[
              showMobileMenu
                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                : '',
            ]"
          />
          <SvgoMenu v-else filled :font-controlled="false" class="w-6 h-6" />
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
import { PropType } from 'vue';
import {
  BCMSEntryContentParsedItem,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { HeaderEntryMeta } from '~~/bcms/types';
import Logo from '@/assets/media/logo.svg?inline';

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});

const showMobileMenu = ref(false);

const getHref = (item: BCMSPropRichTextDataParsed) => {
  let href = '';

  for (let i = 0; i < item.length; i++) {
    const e = item[i] as BCMSEntryContentParsedItem;
    const match = (e.value as string).match(/href="([^"]*)"/);
    if (match) {
      href = match[1];
      break;
    }
  }
  return href;
};
</script>
