<template>
  <header class="absolute top-0 left-0 w-full z-50">
    <div class="relative z-10 container">
      <nav class="relative flex items-center justify-between pt-6 lg:pt-8">
        <NuxtLink to="/" class="flex" aria-label="Home page">
          <BCMSImage :media="data.logo" svg class="w-[101px] md:w-[135px]" />
        </NuxtLink>
        <ul
          class="flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row lg:gap-8"
          :class="[showMobileMenu ? 'flex flex-col' : 'max-md:hidden']"
        >
          <li v-for="(item, index) in data.nav" :key="index">
            <ContentManager
              :item="item"
              class="text-lg leading-none font-semibold tracking-[-0.8px] md:text-xl md:leading-none"
              :class="[
                $route.path === getNavLinkPath(item)
                  ? ''
                  : 'md:text-appGray-300',
              ]"
            />
          </li>
        </ul>
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
      class="fixed top-0 left-0 w-screen h-screen bg-appBody md:hidden"
    />
  </header>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import {
  BCMSEntryContentParsedItem,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
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

const getNavLinkPath = (content: BCMSPropRichTextDataParsed) => {
  let path = '';

  for (let i = 0; i < content.length; i++) {
    const item = content[i] as BCMSEntryContentParsedItem;

    const href = (item.value as string).match(/href="([^"]*)"/)?.[1];

    if (href) {
      path = href;
      break;
    }
  }

  return path;
};
</script>
