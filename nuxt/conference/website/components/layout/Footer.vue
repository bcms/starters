<template>
  <footer class="bg-black py-8 lg:py-14">
    <div class="container">
      <div class="flex flex-col items-center">
        <div
          class="flex items-center justify-center space-x-8 mb-14 lg:space-x-[74px] lg:mb-[72px]"
        >
          <NuxtLink
            v-for="(item, index) in data.social"
            :key="index"
            :to="item.url"
            target="_blank"
          >
            <BCMSImage :media="item.icon" class="w-6 h-6 lg:w-8 lg:h-8" />
          </NuxtLink>
        </div>
        <div
          class="flex flex-col text-appGray-100 lg:flex-row lg:w-full lg:justify-between"
        >
          <div
            class="flex items-center space-x-1.5 text-sm leading-none tracking-[-0.41px] max-lg:mb-4 lg:text-base lg:leading-none lg:order-3"
          >
            <a :href="`mailto:${data.email}`" class="flex">
              {{ data.email }}
            </a>
            <div class="w-[3px] h-[3px] rounded-full bg-appGray-100" />
            <button>Legal page</button>
          </div>
          <div
            class="flex items-end text-xs leading-none tracking-[-0.41px] max-lg:mb-8 lg:text-base lg:leading-none lg:order-1"
          >
            &copy; 2023 CONference. All rights reserved
          </div>
          <a
            href="https://thebcms.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center lg:order-2"
          >
            <span
              class="text-sm leading-none font-medium tracking-[-0.41px] mr-2 lg:text-base lg:leading-none lg:mr-1.5"
            >
              Powered by
            </span>
            <BCMSLogo class="w-[55px] lg:w-[83px]" />
          </a>
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
