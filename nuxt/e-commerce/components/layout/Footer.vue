<template>
  <footer class="bg-appGray-200 pt-[72px]">
    <div class="container">
      <nav
        class="grid grid-cols-1 gap-[55px] pb-14 border-b border-[#ccc] md:grid-cols-2 lg:grid-cols-4"
      >
        <div v-for="(col, index) in data.nav_columns" :key="index" class="">
          <ContentManager :item="col" class="footer--col" />
        </div>
      </nav>
      <div class="py-10">
        <a
          href="https://thebcms.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-1.5"
        >
          <span class="leading-none tracking-[-0.41px] text-gray-700">
            Powered by
          </span>
          <BCMSLogo class="w-[60px] lg:w-[83px]" :font-controlled="false" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FooterEntryMeta } from '~~/bcms/types';
import BCMSLogo from '@/assets/media/bcms-logo.svg';

defineProps({
  data: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>

<style lang="scss">
.footer {
  &--col {
    p {
      @apply text-lg leading-none mb-4 md:text-xl md:mb-8;
    }
    ul {
      @apply grid grid-cols-1 gap-6;
      li {
        p {
          @apply text-xl leading-none mb-0 md:text-2xl;
          a {
            @apply hover:underline;
          }
        }
      }
    }
  }
}
</style>
