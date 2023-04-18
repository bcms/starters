<template>
  <section
    id="episodes"
    class="relative pt-8 pb-10 lg:pt-[151px] lg:pb-[128px]"
  >
    <div class="container max-w-[1229px]">
      <ContentManager
        :item="data.title"
        class="homeEpisodes--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center mb-1 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4"
      />
      <ContentManager
        :item="data.description"
        class="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto mb-8 lg:text-xl lg:leading-none lg:max-w-none lg:mb-16"
      />
      <div
        class="grid grid-cols-1 rounded-2xl bg-[#383838]/80 overflow-hidden space-y-px"
      >
        <EpisodesItem
          v-for="(episode, index) in episodes"
          :key="index"
          :item="episode"
          :index="index + 1"
          class="bg-appBody"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { EpisodeEntryMeta, HomeEpisodesGroup } from "~~/bcms/types";

defineProps({
  data: {
    type: Object as PropType<HomeEpisodesGroup>,
    required: true,
  },
  episodes: {
    type: Array as PropType<EpisodeEntryMeta[]>,
    required: true,
  },
});
</script>

<style lang="scss">
.homeEpisodes--title {
  u {
    @apply no-underline text-appAccent font-bold;
  }
}
</style>
