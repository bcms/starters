<template>
  <footer class="pt-10 md:pt-16 lg:pt-20">
    <div class="container">
      <div class="flex flex-col items-center">
        <div class="flex items-center gap-1.5 mb-4 lg:mb-6">
          <span
            class="text-appGray-300 font-Helvetica text-sm font-semibold leading-none tracking-[-0.28px] lg:text-appGray-100 lg:text-base lg:leading-none lg:tracking-[-0.41px] lg:font-normal"
          >
            Powered by
          </span>
          <a
            href="https://thebcms.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BCMS website"
            class="flex transition-opacity duration-300 hover:opacity-80"
          >
            <img :src="BCMSLogo" alt="BCMS" draggable="false" />
          </a>
        </div>
        <img
          :src="Logo"
          alt="Logo"
          draggable="false"
          class="w-full max-w-[1111px] mx-auto"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FooterEntryMeta } from '~~/bcms/types';
import BCMSLogo from '@/assets/media/bcms-logo.svg?inline';
import Logo from '@/assets/media/logo-cut-off.svg?inline';

defineProps({
  data: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>
