<template>
  <section class="mb-8 md:mb-14 lg:mb-20 xl:mb-32">
    <div class="container">
      <div class="grid grid-cols-1 gap-6 md:gap-12 lg:gap-[72px]">
        <template v-for="(item, index) in items">
          <div
            v-if="item.meta.en"
            :key="index"
            class="flex flex-col gap-4 lg:gap-6 xl:gap-8"
          >
            <div
              class="flex rounded-2xl overflow-hidden bg-[#E05C32] px-4 pt-4 aspect-[1.7] lg:aspect-[2.47]"
              :style="{
                boxShadow:
                  '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
              }"
            >
              <BCMSImage
                :media="item.meta.en.cover"
                :options="{
                  sizes: {
                    exec: [
                      {
                        width: 1238,
                        height: 518,
                      },
                    ],
                  },
                }"
                class="w-full full rounded-t-xl overflow-hidden"
              />
            </div>
            <div class="flex flex-col lg:flex-row lg:justify-between lg:gap-20">
              <div
                class="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] max-lg:mb-6 lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0"
              >
                {{ item.meta.en.subtitle }}
              </div>
              <h3
                class="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] max-lg:mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[254px] xl:text-[40px] xl:tracking-[-0.8px]"
              >
                {{ item.meta.en.title }}
              </h3>
              <ContentManager
                :item="item.meta.en.description"
                class="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px] lg:max-w-[512px]"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { PortfolioEntry } from '~~/bcms/types';

defineProps({
  items: {
    type: Array as PropType<PortfolioEntry[]>,
    required: true,
  },
});
</script>
