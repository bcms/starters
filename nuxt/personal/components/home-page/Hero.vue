<template>
  <section class="py-10 lg:pb-14">
    <div class="container">
      <div
        class="grid grid-cols-1 gap-4 auto-rows-fr md:grid-cols-[2fr,3fr] lg:grid-cols-[500px,1fr] xl:grid-cols-[615px,1fr]"
      >
        <div
          class="relative bg-[#FAFAFA] rounded-3xl p-6 overflow-hidden xl:p-10"
        >
          <div class="relative z-10 h-full flex flex-col items-start">
            <h1
              class="leading-[1.2] tracking-[-0.41px] mb-2.5 lg:text-[34px] lg:leading-[1.2] lg:mb-4"
            >
              {{ data.title }}
            </h1>
            <ContentManager
              :item="data.description"
              class="text-xs leading-[1.4] tracking-[-0.41px] text-appGray-400 pr-[70px] mb-8 lg:text-base lg:leading-[1.4] lg:mb-8"
            />
            <NuxtLink
              to="/"
              class="flex px-[18px] py-[14px] rounded-[32px] border border-appGray-200 text-xs leading-none tracking-[-0.41px] font-medium text-appGray-500 uppercase mb-14 lg:px-6 lg:py-4 lg:text-sm lg:leading-none"
            >
              Contact me
            </NuxtLink>
            <ul class="flex items-center gap-3 mt-auto lg:gap-5">
              <li v-for="(item, index) in data.social" :key="index">
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center"
                >
                  <BCMSImage
                    v-if="item.icon"
                    :media="item.icon"
                    svg
                    class="w-4 h-4 mr-1.5"
                  />
                  <span
                    class="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none"
                  >
                    {{ item.label }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div
            class="absolute top-0 right-0 w-[244px] h-[244px] translate-x-1/2 -translate-y-1/2 bg-[#3A437E] bg-blend-overlay rounded-full opacity-50 blur-[100px]"
          />
          <div
            class="absolute bottom-0 left-0 w-[244px] h-[244px] -translate-x-1/2 translate-y-1/2 bg-[#FFBF4B] bg-blend-overlay rounded-full opacity-50 blur-[100px] xl:-translate-y-1/3"
          />
        </div>
        <div
          class="relative rounded-3xl overflow-hidden aspect-square md:aspect-auto xl:aspect-[1.3]"
        >
          <BCMSImage
            :media="data.image"
            class="absolute top-0 left-0 w-full h-full cover"
            :options="{
              sizes: {
                exec: [
                  {
                    width: 800,
                    height: 612,
                  },
                ],
              },
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { HomeHeroGroup } from '~~/bcms/types/group/home_hero';

defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
});
</script>
