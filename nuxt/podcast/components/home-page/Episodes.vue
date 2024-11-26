<template>
  <section id="episodes" class="relative pt-8 pb-10 lg:pt-[151px] lg:pb-[128px]">
    <div class="container max-w-[1229px]">
      <ContentManager :items="title.nodes"
        class="homeEpisodes--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center mb-1 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4" />
      <ContentManager :items="description.nodes"
        class="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto mb-8 lg:text-xl lg:leading-none lg:max-w-none lg:mb-16" />
      <div class="grid grid-cols-1 rounded-2xl bg-[#383838]/80 overflow-hidden space-y-px">
        <EpisodesItem v-for="(e, index) in episodes" :key="index" :item="e" :index="index + 1" :bcms="bcms"
          class="bg-appBody" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { EpisodeEntryMetaItem } from '~/bcms/types/ts';


defineProps({
  title: {
    type: Object as PropType<PropRichTextDataParsed>,
    required: true,
  },
  description: {
    type: Object as PropType<PropRichTextDataParsed>,
    required: true,
  },
  episodes: {
    type: Array as PropType<EpisodeEntryMetaItem[]>,
    required: true,
  },
  bcms: {
    type: Object as PropType<ClientConfig>,
    required: true,
  }
});
</script>

<style lang="scss">
.homeEpisodes--title {
  u {
    @apply no-underline text-appAccent font-bold;
  }
}
</style>
