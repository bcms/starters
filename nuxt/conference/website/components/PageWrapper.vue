<template>
  <div>
    <LayoutHeader :data="header" />
    <main>
      <slot />
    </main>
    <LayoutFooter :data="footer" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { HeaderEntryMeta } from "~~/bcms/types";
import { FooterPageData } from "~~/types/footer";

defineProps({
  header: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
  footer: {
    type: Object as PropType<FooterPageData>,
    required: true,
  },
});
</script>
