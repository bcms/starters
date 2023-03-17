<template>
  <header class="bg-appAccent text-appAccent/100 py-[13px]">
    <nav>
      <div class="container">
        <div class="flex items-center justify-between">
          <div class="relative">
            <NuxtLink to="/" class="flex w-[120px] h-auto">
              <BCMSImage :media="data.logo" svg class="w-full" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { HeaderEntryMeta } from "~~/bcms/types";

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});
</script>
