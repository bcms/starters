<template>
  <header class="relative z-50">
    <nav>
      <div class="bg-appText py-[14px] lg:hidden">
        <div class="container">
          <div class="flex justify-center">
            <ContentManager
              :item="data.job_cta"
              class="header--jobCta text-appGray-600 text-xs leading-none tracking-[-0.41px]"
            />
          </div>
        </div>
      </div>
      <div class="pt-6 lg:py-4 lg:border-b lg:border-appGray-200">
        <div class="container">
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="flex lg:flex-1">
              <BCMSImage :media="data.logo" svg class="w-[90px] lg:w-[115px]" />
            </NuxtLink>
            <div class="flex justify-center flex-1 max-lg:hidden">
              <ContentManager
                :item="data.job_cta"
                class="header--jobCta text-appGray-600 text-sm leading-none tracking-[-0.41px]"
              />
            </div>
            <div
              class="flex items-center gap-2.5 lg:flex-1 lg:justify-end lg:gap-4"
            >
              <NuxtLink
                v-for="(btn, index) in data.buttons"
                :key="index"
                :to="btn.path"
                class="flex items-center rounded-[32px] px-[14px] py-2.5 transition-all duration-300 lg:px-6 lg:py-[13px]"
                :class="[
                  index === 0
                    ? 'border border-appText hover:border-transparent hover:bg-appGray-100'
                    : 'bg-appText text-white',
                ]"
              >
                <span
                  class="text-xs leading-none font-medium tracking-[-0.41px] mr-1.5 lg:text-sm lg:leading-none lg:mr-2"
                >
                  {{ btn.label }}
                </span>
                <BCMSImage
                  :media="btn.icon"
                  class="w-3 h-3 lg:w-[14px] lg:h-[14px]"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { HeaderEntryMeta } from "~~/bcms/types";

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});
</script>

<style lang="scss">
.header--jobCta {
  a {
    @apply text-white underline font-semibold lg:text-appText;
  }
}
</style>
