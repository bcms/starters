<template>
  <article>
    <NuxtLink :to="`/recipes/${card.slug}`" class="flex flex-col">
      <dir class="relative" :class="[showTitleLayer ? 'lg:mb-[34px]' : '']">
        <BCMSImage
          :media="card.cover"
          :alt="card.title"
          :options="{
            sizes: {
              exec: [
                {
                  width: 800,
                  height: 800,
                },
              ],
            },
          }"
          class="rounded-[10px] aspect-square overflow-hidden cover mb-[14px]"
          :class="[
            showTitleLayer ? 'lg:aspect-[1.88] lg:rounded-2xl lg:mb-0' : '',
          ]"
        />
        <Btn
          size="sm"
          class="absolute z-10 bottom-10 left-1/2 -translate-x-1/2 justify-center min-w-max bg-white max-lg:hidden"
          :class="[showTitleLayer ? 'lg:hidden' : '']"
        >
          <span>Download recipe</span>
        </Btn>
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center p-4 rounded-2xl"
          :class="[showTitleLayer ? 'max-lg:hidden' : 'hidden']"
        >
          <div
            class="text-[32px] leading-none font-semibold tracking-[-0.41px] text-white text-center"
          >
            {{ card.title }}
          </div>
        </div>
      </dir>
      <div class="mb-4 lg:flex lg:flex-row-reverse lg:justify-between lg:mb-3">
        <div class="flex flex-wrap gap-2 mb-2.5 lg:mb-0">
          <div
            v-for="(category, index) in card.categories"
            :key="index"
            class="px-2.5 py-[7px] bg-[#BCBD87]/10 rounded-[5px] text-xs leading-none font-medium tracking-[-0.41px] text-appAccent lg:px-[14px] lg:py-[9px] lg:text-sm lg:leading-none"
          >
            {{ category }}
          </div>
        </div>
        <div
          class="text-appGray-600 text-sm leading-[1.3] font-medium tracking-[-0.41px] lg:leading-none"
          :class="[showTitleLayer ? 'lg:text-xl' : 'lg:text-2xl']"
        >
          {{ card.title }}
        </div>
      </div>
      <ContentManager
        :item="card.description"
        class="text-lg font-medium leading-[1.4] tracking-[-0.41px] text-appGray-500 max-lg:hidden"
        :class="[showTitleLayer ? 'lg:mb-6' : 'mb-[18px]']"
      />
      <Btn size="sm" theme="gray" class="mb-2 justify-center lg:max-w-max">
        <span class="text-left mr-1 lg:hidden">Ingredients and steps</span>
        <span class="text-left mr-2 max-lg:hidden">
          Show ingredients and steps
        </span>
        <ArrowIcon class="w-3 h-3 flex-shrink-0 lg:w-4 lg:h-4" />
      </Btn>
      <Btn
        size="sm"
        theme="gray"
        class="justify-center bg-transparent border-[#E8E8E8]/100 mb-2 lg:hidden"
      >
        <span class="text-left mr-1">Download recipe</span>
        <DownloadIcon class="w-3 h-3 flex-shrink-0" />
      </Btn>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import ArrowIcon from "@/assets/icons/arrow-right.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import { RecipeLight } from "~~/types";

defineProps({
  card: {
    type: Object as PropType<RecipeLight>,
    required: true,
  },
  showTitleLayer: {
    type: Boolean,
    required: false,
  },
});
</script>
