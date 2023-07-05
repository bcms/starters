<template>
  <footer class="bg-appGray-100 pt-6 pb-[35px] md:pb-8 lg:pt-14">
    <div class="container">
      <div
        class="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-[auto,1fr] lg:mb-24"
      >
        <div class="lg:max-w-[320px]">
          <BCMSImage :media="data.logo" svg class="mb-3 lg:mb-4" />
          <ContentManager
            :item="data.description"
            class="text-xs tracking-[-0.41px] font-medium leading-normal text-appGray-500 lg:text-base"
          />
        </div>
        <nav
          class="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end lg:gap-x-10 xl:gap-x-[72px] xl:pr-[130px]"
        >
          <ContentManager
            v-for="(col, index) in data.nav"
            :key="index"
            :item="col"
            class="footer--nav-col"
          />
        </nav>
      </div>
      <div
        class="text-[#898C8A] leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-between"
      >
        <a
          href="https://thebcms.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center text-sm max-md:mb-3 lg:text-base lg:leading-none"
        >
          Powered by
          <BCMSLogo class="w-[55px] ml-2 lg:w-[83px] lg:h-6 lg:ml-3" />
        </a>
        <div class="text-xs lg:text-base lg:leading-none">
          &copy; {{ new Date().getFullYear() }} BCMS. All rights reserved
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { FooterEntryMeta } from "~~/bcms/types";
import BCMSLogo from "@/assets/media/bcms-logo.svg";

defineProps({
  data: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>

<style lang="scss">
.footer--nav-col {
  p {
    @apply text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 mb-4 lg:text-base lg:leading-none lg:mb-5;
  }
  ul {
    @apply grid grid-cols-1 gap-[14px] lg:gap-4;
    p {
      @apply text-sm text-appAccent mb-0 lg:text-[17px];
      a {
        @apply hover:underline focus-visible:underline;
      }
    }
  }
}
</style>
