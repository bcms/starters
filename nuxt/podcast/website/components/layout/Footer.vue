<template>
  <footer class="relative pt-8 pb-10 lg:pt-[86px] lg:pb-14">
    <div class="container">
      <div class="flex flex-col items-center">
        <a
          :href="`mailto:${data.email.toLowerCase()}`"
          class="text-sm leading-none tracking-[-0.41px] text-appGray-200 mb-4 lg:text-lg lg:leading-none lg:mb-6"
        >
          {{ data.email }}
        </a>
        <div class="flex items-center space-x-5 lg:space-x-8">
          <NuxtLink
            v-for="(item, index) in data.social"
            :href="item.url"
            :item="index"
            target="_blank"
            class="flex"
          >
            <BCMSImage :media="item.icon" class="w-5 h-5 lg:w-10 lg:h-10" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] min-w-[1056px] aspect-square rounded-full pointer-events-none"
      style="box-shadow: 0px -12px 250px rgba(255, 75, 35, 0.5)"
    />
  </footer>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { FooterEntryMeta } from "~~/bcms/types";

defineProps({
  data: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>
