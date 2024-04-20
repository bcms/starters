<template>
  <section class="pb-10 lg:pb-14">
    <div class="container">
      <div
        class="mb-8 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20 lg:mb-10"
      >
        <div class="flex items-center mb-[14px] md:mt-4">
          <div
            class="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1"
          />
          <h2
            class="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none"
          >
            {{ data.title }}
          </h2>
        </div>
        <div>
          <ContentManager
            :item="data.description"
            class="homeAbout--description text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 md:max-w-[761px] lg:text-base lg:leading-[1.4]"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-4 xl:grid-cols-[repeat(16,1fr)]"
      >
        <div
          v-for="(item, index) in data.items"
          :key="index"
          class="flex flex-col rounded-3xl p-6 lg:p-8 lg:pb-4"
          :class="[
            index % 2 === 2 || index % 3 === 0
              ? 'xl:col-span-7'
              : 'xl:col-span-9',
          ]"
          :style="{
            backgroundColor: item.theme,
          }"
        >
          <h3
            class="leading-none tracking-[-0.41px] text-white mb-5 lg:text-xl lg:leading-none lg:mb-6"
          >
            {{ item.title }}
          </h3>
          <NuxtLink
            :to="`/portfolio/${item.slug}`"
            class="group relative flex mb-auto w-full xl:flex-1"
          >
            <Swiper
              :modules="[A11y, Pagination]"
              :slides-per-view="1"
              watch-overflow
              :space-between="12"
              :pagination="{
                el: `.homePortfolio--galleryPagination_${index}`,
              }"
              class="w-full rounded-3xl overflow-hidden"
            >
              <SwiperSlide
                v-for="(galleryItem, galleryIndex) in item.gallery"
                :key="galleryIndex"
                class="w-full"
              >
                <BCMSImage
                  :media="galleryItem"
                  :options="{
                    sizes: {
                      exec: [
                        {
                          width: 840,
                          height: 580,
                        },
                      ],
                    },
                  }"
                  class="w-full h-full aspect-[1.45] cover rounded-3xl overflow-hidden"
                  :class="[
                    index % 2 === 2 || index % 3 === 0
                      ? 'xl:aspect-[1.45]'
                      : 'xl:aspect-[1.84]',
                  ]"
                />
              </SwiperSlide>
            </Swiper>
            <div
              class="absolute z-10 top-0 left-0 w-full h-full rounded-3xl flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
              :style="{
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(217, 217, 217, 0) 0%, #FFFFFF 100%)',
              }"
            >
              <div
                class="px-6 py-4 bg-appText rounded-[32px] leading-none font-medium tracking-[-0.41px] text-white"
              >
                Open project
              </div>
            </div>
          </NuxtLink>
          <div
            v-if="item.gallery.length > 0"
            class="mt-6 lg:mt-8"
            :class="`homePortfolio--galleryPagination homePortfolio--galleryPagination_${index}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { A11y, Pagination } from 'swiper';
import { HomePortfolio } from '~~/types';
import { BCMSImage } from '~~/bcms-components';

defineProps({
  data: {
    type: Object as PropType<HomePortfolio>,
    required: true,
  },
});
</script>

<style lang="scss">
.homePortfolio {
  &--description {
    strong {
      @apply font-medium text-appGray-600;
    }
  }
  &--galleryPagination {
    @apply flex items-center justify-center gap-1.5;
    .swiper-pagination-bullet {
      @apply w-6 h-[3px] rounded-[3px] mx-0 opacity-40 transition-all duration-300 lg:h-1;
      &-active {
        @apply w-20 bg-white opacity-100;
      }
    }
  }
}
</style>
