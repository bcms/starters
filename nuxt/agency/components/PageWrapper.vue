<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <LayoutHeader :data="header" />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter :data="footer" />
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
