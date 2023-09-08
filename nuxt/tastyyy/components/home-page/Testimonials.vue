<template>
  <section class="overflow-hidden pb-14 md:pb-20 lg:pb-[120px]">
    <div class="container">
      <div class="flex flex-col items-center">
        <div
          class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
        >
          [ 6 ]
        </div>
        <h2
          class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
        >
          {{ data.title }}
        </h2>
        <ContentManager
          :item="data.description"
          class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-10 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
        />
        <div class="grid grid-cols-[auto,1fr,auto] gap-5 w-full lg:gap-24">
          <button class="homeTestimonials--swiperPrev flex translate-y-[60px]">
            <ArrowIcon
              class="w-4 h-4 rotate-180 flex-shrink-0 lg:w-12 lg:h-12"
            />
          </button>
          <Swiper
            :modules="[A11y, Navigation]"
            :navigation="{
              prevEl: '.homeTestimonials--swiperPrev',
              nextEl: '.homeTestimonials--swiperNext',
            }"
            :slides-per-view="1"
            watch-overflow
            grab-cursor
            :space-between="12"
            class="max-w-full"
          >
            <SwiperSlide
              v-for="(testimonial, index) in items"
              :key="index"
              class="flex flex-col items-center text-center"
            >
              <ContentManager
                :item="testimonial.quote"
                class="text-sm leading-[1.4] font-Gloock text-appGray-700 mb-4 lg:text-[32px] lg:leading-[1.4] lg:mb-12"
              />
              <BCMSImage
                :media="testimonial.author.avatar"
                class="w-10 h-10 rounded-full overflow-hidden cover mb-3 mx-auto lg:w-16 lg:h-16 lg:mb-6"
              />
              <div
                class="text-xs leading-none tracking-[-0.41px] text-appGray-700 uppercase lg:text-xl lg:leading-none"
              >
                {{ testimonial.author.name }}
              </div>
            </SwiperSlide>
          </Swiper>
          <button class="homeTestimonials--swiperNext flex translate-y-[60px]">
            <ArrowIcon class="w-4 h-4 flex-shrink-0 lg:w-12 lg:h-12" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { A11y, Navigation } from 'swiper/modules';
import { BCMSImage } from '~~/bcms-components';
import { TestimonialEntryMeta, HomeTestimonialsGroup } from '~~/bcms/types';
import ArrowIcon from '@/assets/icons/arrow.svg';

defineProps({
  data: {
    type: Object as PropType<HomeTestimonialsGroup>,
    required: true,
  },
  items: {
    type: Array as PropType<TestimonialEntryMeta[]>,
    required: true,
  },
});
</script>

<style lang="scss">
.homeTestimonials {
  &--swiperPrev,
  &--swiperNext {
    &.swiper-button-lock {
      @apply flex opacity-50;
    }
  }
}
</style>
