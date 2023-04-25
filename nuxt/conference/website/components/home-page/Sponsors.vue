<template>
  <section class="pb-16 lg:pb-[176px]">
    <div class="container">
      <div
        class="leading-none tracking-[-0.02em] font-semibold text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16"
      >
        {{ data.title }}
      </div>
      <div
        class="p-1.5 rounded-[64px] bg-appGray-200 grid grid-cols-4 mb-8 lg:max-w-[828px] lg:mx-auto lg:mb-[128px]"
      >
        <button
          class="flex justify-center px-1 py-[7px] rounded-[38px] text-xs leading-none tracking-[-0.04em] transition-colors duration-300 lg:py-[18px] lg:text-2xl lg:leading-none"
          :class="[
            activeTier === 'general'
              ? 'text-white bg-appAccent font-semibold'
              : 'text-appGray-600 font-medium',
          ]"
          @click="activeTier = 'general'"
        >
          General
        </button>
        <button
          class="flex justify-center px-1 py-[7px] rounded-[38px] text-xs leading-none tracking-[-0.04em] transition-colors duration-300 lg:py-[18px] lg:text-2xl lg:leading-none"
          :class="[
            activeTier === 'platinum'
              ? 'text-white bg-appAccent font-semibold'
              : 'text-appGray-600 font-medium',
          ]"
          @click="activeTier = 'platinum'"
        >
          Platinum
        </button>
        <button
          class="flex justify-center px-1 py-[7px] rounded-[38px] text-xs leading-none tracking-[-0.04em] transition-colors duration-300 lg:py-[18px] lg:text-2xl lg:leading-none"
          :class="[
            activeTier === 'gold'
              ? 'text-white bg-appAccent font-semibold'
              : 'text-appGray-600 font-medium',
          ]"
          @click="activeTier = 'gold'"
        >
          Gold
        </button>
        <button
          class="flex justify-center px-1 py-[7px] rounded-[38px] text-xs leading-none tracking-[-0.04em] transition-colors duration-300 lg:py-[18px] lg:text-2xl lg:leading-none"
          :class="[
            activeTier === 'pr partners'
              ? 'text-white bg-appAccent font-semibold'
              : 'text-appGray-600 font-medium',
          ]"
          @click="activeTier = 'pr partners'"
        >
          PR Partners
        </button>
      </div>
      <div class="mb-10 lg:mb-[128px]">
        <Swiper
          :modules="[A11y, Pagination]"
          :slides-per-view="1"
          watch-overflow
          grab-cursor
          :space-between="20"
          :pagination="{
            el: '.homeSponsors--pagination',
            clickable: true,
          }"
          class="mb-8 lg:mb-[72px]"
        >
          <SwiperSlide
            v-for="(sponsor, index) in filteredSponsors"
            :key="index"
          >
            <div
              class="flex items-center justify-center w-[295px] aspect-[2.17] rounded-lg bg-white mx-auto mb-6 lg:w-[462px] lg:aspect-[1.7] lg:rounded-2xl lg:mb-12"
            >
              <BCMSImage
                :media="sponsor.cover"
                class="w-auto h-6 cover lg:h-12"
              />
            </div>
            <ContentManager
              :item="sponsor.description"
              class="text-sm leading-[1.4] tracking-[-0.8px] font-medium text-center text-appGray-500 max-w-[1152px] mx-auto lg:text-[26px] lg:leading-[1.4]"
            />
          </SwiperSlide>
        </Swiper>
        <div class="homeSponsors--pagination swiper--customPagination" />
      </div>
      <button
        class="flex px-7 py-[13px] bg-black rounded-[72px] text-sm leading-none tracking-[-0.04em] font-semibold text-white mx-auto lg:px-16 lg:py-8 lg:text-[32px] lg:leading-none"
      >
        Contact us
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SponsorsGroup } from "~~/bcms/types";
import { BCMSImage } from "~~/bcms-components";
import { A11y, Pagination } from "swiper";

const props = defineProps({
  data: {
    type: Object as PropType<SponsorsGroup>,
    required: true,
  },
});

const activeTier = ref<"general" | "platinum" | "gold" | "pr partners">(
  "platinum"
);

const filteredSponsors = computed(() => {
  return props.data.sponsors.filter(
    (sponsor) => sponsor.tier.toLowerCase() === activeTier.value.toLowerCase()
  );
});
</script>
