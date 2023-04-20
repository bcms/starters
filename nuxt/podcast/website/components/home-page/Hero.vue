<template>
  <section class="relative pt-[104px] lg:pt-[324px]">
    <div class="container">
      <div class="relative z-10 max-w-[488px] mx-auto lg:max-w-[784px]">
        <ContentManager
          :item="data.title"
          class="homeHero--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center mb-1 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4"
        />
        <ContentManager
          :item="data.description"
          class="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto mb-8 lg:text-xl lg:leading-none lg:max-w-none lg:mb-[72px]"
        />
        <div
          class="grid grid-cols-1 rounded-2xl bg-[#383838]/20 overflow-hidden space-y-px"
        >
          <EpisodesItem
            v-for="(e, index) in episodes"
            :key="index"
            :item="e.episode"
            :index="index + 1"
            class="bg-appBody/80"
          />
        </div>
      </div>
    </div>
    <BCMSImage
      :media="data.cover"
      class="absolute top-0 left-0 w-full h-full cover"
    />
    <div class="absolute top-0 left-0 w-full h-full bg-black/40" />
    <div
      class="absolute z-10 bottom-0 left-0 w-full h-12 bg-gradient-to-b from-appBody/0 to-appBody pointer-events-none lg:h-[114px]"
    />
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { HomeHeroGroup } from "~~/bcms/types";
import { EpisodeWithSettings } from "~~/types";

defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
  episodes: {
    type: Array as PropType<EpisodeWithSettings[]>,
    required: true,
  },
});
</script>

<style lang="scss">
.homeHero--title {
  u {
    @apply no-underline text-appAccent font-bold;
  }
}
</style>
