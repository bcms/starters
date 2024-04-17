<template>
  <section class="mb-8 lg:mb-16 xl:mb-[104px]">
    <div class="container">
      <div
        class="flex flex-col gap-6 mb-8 lg:grid lg:grid-cols-[254px,1fr] lg:mb-12 xl:mb-16"
      >
        <div
          class="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0"
        >
          {{ data.subtitle }}
        </div>
        <div>
          <h2
            class="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[488px]"
          >
            {{ data.title }}
          </h2>
          <ContentManager
            :item="data.description"
            class="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] mb-8 lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px] lg:max-w-[488px]"
          />
          <NuxtLink
            to="/portfolio"
            class="flex items-center gap-1 text-appGray-300 transition-colors duration-300 hover:text-appText"
          >
            <span
              class="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]"
            >
              See all portfolios
            </span>
            <SvgoArrow />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="lg:container">
      <Swiper
        :modules="[SwiperA11y]"
        :slides-per-view="1.6"
        :space-between="24"
        :breakpoints="{
          768: {
            slidesPerView: 2.1,
          },
        }"
        class="[&.swiper]:overflow-visible [&.swiper]:px-5 lg:[&.swiper]:pl-[278px]"
      >
        <SwiperSlide v-for="(item, index) in data.portfolio_items" :key="index">
          <NuxtLink
            :to="item.meta.en?.url"
            target="_blank"
            class="flex flex-col gap-2.5 lg:gap-6"
          >
            <BCMSImage
              v-if="item.meta.en?.project_cover"
              :media="item.meta.en?.project_cover"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 786,
                      height: 902,
                    },
                  ],
                },
              }"
              class="full rounded overflow-hidden lg:rounded-2xl"
              :style="{
                boxShadow:
                  '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
              }"
            />
            <h3
              class="text-appGray-300 font-Inter text-xs font-semibold leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]"
            >
              {{ item.meta.en?.subtitle }}
            </h3>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { HomeCapabilitiesGroup } from '~~/bcms/types';

defineProps({
  data: {
    type: Object as PropType<HomeCapabilitiesGroup>,
    required: true,
  },
});
</script>
