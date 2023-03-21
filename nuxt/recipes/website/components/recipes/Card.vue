<template>
  <article>
    <NuxtLink :to="`/recipes/${card.slug}`" class="flex flex-col">
      <dir class="relative">
        <BCMSImage
          :media="card.cover_image"
          :alt="card.title"
          class="rounded-[10px] aspect-square overflow-hidden cover mb-[14px]"
        />
        <Btn
          size="sm"
          class="absolute z-10 bottom-10 left-1/2 -translate-x-1/2 justify-center min-w-max bg-white max-lg:hidden"
        >
          <span>Download recipe</span>
        </Btn>
      </dir>
      <div class="mb-4 lg:flex lg:flex-row-reverse lg:justify-between lg:mb-3">
        <div class="flex flex-wrap gap-2 mb-2.5">
          <div
            v-for="(tag, index) in card.tags"
            :key="index"
            class="px-2.5 py-[7px] bg-[#BCBD87]/10 rounded-[5px] text-xs leading-none font-medium tracking-[-0.41px] text-appAccent lg:px-[14px] lg:py-[9px] lg:text-sm lg:leading-none"
          >
            {{ tag.meta.en?.title }}
          </div>
        </div>
        <div
          class="text-appGray-600 text-sm leading-[1.3] font-medium tracking-[-0.41px] lg:text-2xl lg:leading-none"
        >
          {{ card.title }}
        </div>
      </div>
      <ContentManager
        :item="card.description"
        class="text-lg font-medium leading-[1.4] tracking-[-0.41px] text-appGray-500 mb-[18px] max-lg:hidden"
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
import { RecipeEntryMeta } from "~~/bcms/types";
import ArrowIcon from "@/assets/icons/arrow-right.svg";
import DownloadIcon from "@/assets/icons/download.svg";

defineProps({
  card: {
    type: Object as PropType<RecipeEntryMeta>,
    required: true,
  },
});
</script>
