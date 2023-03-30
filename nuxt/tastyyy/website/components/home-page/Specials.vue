<template>
  <section>
    <div class="container">
      <div class="flex flex-col items-center mb-8 lg:mb-20">
        <div
          class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14p]"
        >
          [ 4 ]
        </div>
        <h2
          class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
        >
          {{ data.title }}
        </h2>
        <ContentManager
          :item="data.description"
          class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
        />
        <Swiper
          :modules="[A11y]"
          slides-per-view="auto"
          watch-overflow
          grab-cursor
          :space-between="12"
          :breakpoints="{
            1024: {
              spaceBetween: 16,
            },
          }"
          class="homeSpecials--swiper w-full max-w-max"
        >
          <SwiperSlide
            v-for="(day, index) in days"
            :key="index"
            class="homeSpecials--dayItem"
          >
            <button
              class="flex justify-center w-full py-2.5 border rounded-[32px] transition-colors duration-300"
              :class="[
                day === activeDay
                  ? 'border-appAccent bg-appAccent text-appBody'
                  : 'border-appText',
              ]"
              @click="activeDay = day"
            >
              <span
                class="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none"
              >
                {{ day }}
              </span>
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        v-if="filteredItems.length > 0"
        class="grid grid-cols-2 gap-4 auto-rows-fr lg:gap-6"
      >
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="homeSpecials--gridItem w-full h-full relative lg:min-h-[360px]"
        >
          <div
            class="relative z-10 flex flex-col items-center justify-center h-full p-2 lg:items-start lg:justify-between lg:p-10"
          >
            <h3
              class="text-xs leading-none uppercase text-white font-Gloock text-center lg:text-[32px] lg:leading-none lg:mb-[18px]"
            >
              {{ item.title }}
            </h3>
            <ContentManager
              :item="item.description"
              class="leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[475px] max-lg:hidden"
            />
          </div>
          <BCMSImage
            :media="item.cover"
            class="absolute top-0 left-0 w-full h-full cover"
          />
          <div class="absolute top-0 left-0 w-full h-full bg-black/50" />
        </div>
      </div>
      <div
        v-else
        class="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20"
      >
        No specials for this day
      </div>
    </div>
    <HomePageDivider />
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { A11y } from "swiper";
import { HomeSpecialsGroup, FoodItemEntryMeta } from "~~/bcms/types";

const props = defineProps({
  data: {
    type: Object as PropType<HomeSpecialsGroup>,
    required: true,
  },
  items: {
    type: Array as PropType<FoodItemEntryMeta[]>,
    required: true,
  },
});

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const activeDay = ref("SUN");

const filteredItems = computed(() => {
  return props.items.filter((item) => {
    return item.day_available.selected === activeDay.value;
  });
});
</script>

<style lang="scss">
.homeSpecials {
  &--swiper {
    @apply overflow-visible;
  }
  &--dayItem {
    @apply w-[72px] lg:w-[112px];
  }
  &--gridItem {
    &:nth-of-type(5n + 1) {
      @apply row-span-2;
    }
    &:nth-of-type(5n + 2) {
      @apply aspect-[1.49] lg:aspect-[3.82];
    }
    &:nth-of-type(5n + 3) {
      @apply row-span-2;
    }
    &:nth-of-type(5n + 5) {
      @apply col-span-2 row-span-2 md:row-span-1;
      & > div {
        @apply justify-center items-center text-center;
      }
    }
  }
}
</style>
