<template>
  <header>
    <div class="container">
      <nav
        class="flex items-center justify-between pt-6 pb-8 lg:pt-12 lg:pb-[72px]"
      >
        <NuxtLink to="/" class="flex">
          <BCMSImage :media="data.logo" svg class="w-[140px]" />
        </NuxtLink>
        <ul class="flex items-center space-x-4 lg:space-x-10">
          <li
            v-for="(item, index) in data.nav"
            :key="index"
            :class="index === 0 ? 'cursor-pointer' : ''"
            @click="index === 0 ? (showContactForm = true) : ''"
          >
            <ContentManager
              :item="item"
              class="text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-xl lg:leading-none"
            />
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <Teleport to="body">
    <Transition name="fade">
      <ContactForm v-if="showContactForm" @close="showContactForm = false" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { HeaderEntryMeta } from '~~/bcms/types';

defineProps({
  data: {
    type: Object as PropType<HeaderEntryMeta>,
    required: true,
  },
});

const showContactForm = ref(false);
</script>
