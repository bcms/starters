<template>
  <section class="pb-[72px] lg:pb-[136px]">
    <div class="container">
      <div class="flex items-center justify-between mb-6 lg:mb-16">
        <div
          class="leading-none tracking-[-0.02em] font-semibold text-center lg:text-5xl lg:leading-none"
        >
          {{ data.title }}
        </div>
        <div
          class="flex px-2 py-[5px] bg-[#6BCD7D1A] rounded-[25px] text-sm leading-none tracking-[-0.04em] font-medium text-[#388045] lg:px-[15px] lg:py-2.5 lg:text-xl lg:leading-none"
        >
          {{ data.days[activeSlide].label }}
        </div>
      </div>
      <Swiper
        :modules="[A11y, Pagination]"
        :slides-per-view="1"
        watch-overflow
        grab-cursor
        :space-between="20"
        :pagination="{
          el: '.homeAgenda--pagination',
          clickable: true,
        }"
        @active-index-change="handleActiveIndexChange"
        class="mb-8 lg:mb-20"
      >
        <SwiperSlide v-for="(day, index) in data.days" :key="index">
          <div class="grid grid-cols-1 gap-6 lg:gap-12">
            <div
              v-for="(item, itemIndex) in day.items"
              :key="itemIndex"
              class="grid grid-cols-[70px,1fr] lg:grid-cols-[295px,1fr]"
            >
              <div
                class="text-sm leading-none tracking-[-0.04em] font-medium text-appGray-600 lg:text-2xl lg:leading-none"
              >
                {{ item.hours }}
              </div>
              <div>
                <div
                  class="text-xs leading-none font-medium tracking-[-0.04em] text-appGray-600 mb-3 lg:text-xl lg:leading-none lg:mb-4"
                >
                  {{ item.title }}
                </div>
                <ContentManager
                  :item="item.description"
                  class="text-sm leading-[1.4] tracking-[-0.41px] font-medium text-appGray-500 mb-4 lg:text-xl lg:leading-[1.4] lg:mb-6"
                />
                <div
                  class="text-sm leading-none tracking-[-0.04em] font-medium text-appGray-600 lg:text-2xl lg:leading-none"
                >
                  Location: {{ item.location }}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="homeAgenda--pagination swiper--customPagination" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { AgendaGroup } from "~~/bcms/types";
import { A11y, Pagination } from "swiper";
import type Swiper from "swiper";

defineProps({
  data: {
    type: Object as PropType<AgendaGroup>,
    required: true,
  },
});

const activeSlide = ref(0);

const handleActiveIndexChange = (event: Swiper) => {
  activeSlide.value = event.activeIndex;
};
</script>
