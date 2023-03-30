<template>
  <section class="pt-10 md:pt-20 lg:pt-[200px]">
    <div class="container">
      <div class="relative mb-[14px] lg:mb-12">
        <svg
          viewBox="0 0 1376 986"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="w-full"
        >
          <path
            d="M0 238.786C403.766 -78.5849 972.234 -78.5849 1376 238.786V986H0V238.786Z"
            fill="url(#pattern0)"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlink:href="#image0_560_272"
                transform="matrix(0.000558036 0 0 0.000596162 0 -0.301242)"
              />
            </pattern>
            <image
              id="image0_560_272"
              width="1792"
              height="2688"
              :xlink:href="imageUtils.getPath(data.cover)"
            />
          </defs>
        </svg>
        <div
          class="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between xl:top-10 xl:w-full"
        >
          <div class="flex flex-col items-end max-xl:hidden">
            <div class="text-lg leading-none mb-1.5">
              {{ data.address }}
            </div>
            <HomePageMap :map="data.map" />
          </div>
          <div class="h-px flex-1 bg-[#D9D9D9] mx-4 max-xl:hidden" />
          <div
            class="bg-white px-4 py-[14px] rounded-[128px] max-w-max lg:px-20 lg:py-14"
          >
            <div class="flex items-center">
              <StarIcon class="w-2 h-2 lg:w-12 lg:h-12" />
              <h1
                class="text-xl leading-none font-Gloock mx-2.5 lg:text-[80px] lg:leading-none lg:mx-12 2xl:text-[112px] 2xl:leading-none"
              >
                {{ data.title }}
              </h1>
              <StarIcon class="w-2 h-2 lg:w-12 lg:h-12" />
            </div>
          </div>
          <div class="h-px flex-1 bg-[#D9D9D9] mx-4 max-xl:hidden" />
          <ContentManager
            :item="data.open_time"
            class="homeHero--openTime max-xl:hidden"
          />
        </div>
      </div>
      <div class="flex items-start justify-between mb-6 xl:hidden">
        <div>
          <div class="text-sm leading-none mb-1.5 lg:text-lg lg:leading-none">
            {{ data.address }}
          </div>
          <HomePageMap :map="data.map" />
        </div>
        <ContentManager :item="data.open_time" class="homeHero--openTime" />
      </div>
      <div class="homeHero--description mb-6 lg:mb-14">
        <template v-for="(item, index) in data.description" :key="index">
          <ContentManager
            v-if="item.text && item.text.length > 0"
            :key="index"
            :item="item.text"
            class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-[40px] lg:leading-none"
          />
          <span
            v-if="item.image"
            :key="index"
            :style="{
              backgroundImage: `url(${imageUtils.getPath(item.image)})`,
              width: `${item.image.width / 5}px`,
            }"
            class="image image_sm h-4 flex-shrink-0 mx-2 translate-y-[3px] bg-center bg-cover"
          />
          <span
            v-if="item.image"
            :key="index"
            :style="{
              backgroundImage: `url(${imageUtils.getPath(item.image)})`,
              width: `${item.image.width / 2}px`,
            }"
            class="image image_lg h-10 flex-shrink-0 mx-4 translate-y-[3px] bg-center bg-cover"
          />
        </template>
      </div>
      <Btn class="uppercase mx-auto">
        <span>Learn more</span>
      </Btn>
      <HomePageDivider />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { HomeHeroGroup } from "~~/bcms/types";
import StarIcon from "@/assets/icons/star.svg";

defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
});
</script>

<style lang="scss">
.homeHero {
  &--openTime {
    @apply text-xs leading-none text-appGray-400 text-right lg:text-sm lg:leading-none xl:text-left;
    strong {
      @apply inline-block text-sm leading-none font-normal text-appText mb-1.5 lg:text-lg lg:leading-none;
    }
  }
  &--description {
    * {
      @apply inline;
    }
    .image {
      @apply inline-block;
      &_lg {
        @apply hidden;
      }
      @media screen and (min-width: 1024px) {
        &_sm {
          @apply hidden;
        }
        &_lg {
          @apply inline-block;
        }
      }
    }
  }
}
</style>
