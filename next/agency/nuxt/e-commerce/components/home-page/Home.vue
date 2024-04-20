<template>
  <section class="relative overflow-hidden h-screen flex items-center">
    <div class="container">
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-center"
      >
        <h1 class="sr-only">
          {{ data.title }}
        </h1>
        <Logo
          class="w-[250px] text-white mb-8 md:w-[378px]"
          :font-controlled="false"
        />
        <p class="text-xl leading-none text-white">
          {{ data.description }}
        </p>
      </div>
    </div>
    <BCMSImage
      :media="data.cover"
      :options="{
        quality: 100,
        sizes: {
          exec: [
            {
              width: 1280,
            },
            {
              width: 1600,
            },
          ],
        },
      }"
      class="absolute inset-0 cover"
    />
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { HomeHeroGroup } from '~~/bcms/types';
import Logo from '@/assets/media/logo-white.svg';

defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
});
</script>
