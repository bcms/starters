<template>
  <div>
    <LayoutHeader :data="header" />
    <main>
      <slot />
    </main>
    <LayoutFooter :data="footer" />
    <LayoutPlayingEpisode v-if="$route.name !== 'now-playing'" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FooterEntryMeta, HeaderEntryMeta } from '~~/bcms/types';

defineProps({
  header: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
  footer: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>
