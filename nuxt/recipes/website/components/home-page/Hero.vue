<template>
  <section class="relative">
    <div class="container">
      <div class="relative pt-24 pb-6 md:pb-10 lg:pt-[250px] lg:pb-[88px]">
        <div
          class="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <ContentManager
            :item="data.title"
            class="homePage--hero-title text-xl leading-[1.2] font-medium text-white mb-3 md:text-3xl lg:text-7xl lg:leading-[1.1] lg:mb-6"
          />
          <ContentManager
            :item="data.description"
            class="text-xs leading-none font-medium text-white mb-6 md:text-sm lg:text-xl lg:leading-none lg:mb-10"
          />
          <Btn to="/recipes">
            <span class="mr-2">{{ data.cta_label }}</span>
            <ArrowIcon class="w-[14px] h-[14px] lg:w-5 lg:h-5" />
          </Btn>
        </div>
        <RecipesSearch
          :recipes="recipes"
          class="absolute z-10 top-10 right-0 w-[300px] max-lg:hidden"
        />
      </div>
    </div>
    <div class="absolute top-0 left-0 w-full h-full">
      <BCMSImage
        :media="data.cover"
        :options="{
          sizes: {
            exec: [
              {
                width: 750,
                height: 516,
              },
              {
                width: 1440,
                height: 640,
              },
              {
                width: 2880,
                height: 1280,
              },
            ],
          },
        }"
        class="absolute top-0 left-0 w-full h-full cover position-top"
      />
      <div
        class="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E]/0"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { HomeHeroGroup, RecipeEntryMeta } from "~~/bcms/types";
import ArrowIcon from "@/assets/icons/arrow-right.svg";

defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
  recipes: {
    type: Array as PropType<RecipeEntryMeta[]>,
    required: true,
  },
});
</script>

<style lang="scss">
.homePage--hero-title {
  i {
    @apply font-PlayfairDisplay;
  }
}
</style>
