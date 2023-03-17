<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { HeaderEntryMeta } from "~~/bcms/types";

defineProps({
  header: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});
</script>
