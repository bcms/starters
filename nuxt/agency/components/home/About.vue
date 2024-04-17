<template>
  <section class="pb-8 md:pb-20 lg:pb-[150px] xl:pb-[280px]">
    <div class="container">
      <div class="flex flex-col gap-4 lg:gap-6">
        <BCMSImage
          :media="data.cover"
          :options="{
            sizes: {
              exec: [
                {
                  width: 686,
                  height: 302,
                },
                {
                  width: 1372,
                  height: 604,
                },
              ],
            },
          }"
          class="full aspect-[2.26] rounded-lg overflow-hidden lg:aspect-[2.35]"
          :style="{
            boxShadow:
              '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
          }"
        />
        <div class="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div
            class="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0"
          >
            {{ data.subtitle }}
          </div>
          <div class="lg:max-w-[50%]">
            <h2
              class="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[66%] xl:max-w-[60%]"
            >
              {{ data.title }}
            </h2>
            <ContentManager
              :item="data.description"
              class="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { HomeAboutGroup } from '~~/bcms/types';

defineProps({
  data: {
    type: Object as PropType<HomeAboutGroup>,
    required: true,
  },
});
</script>
