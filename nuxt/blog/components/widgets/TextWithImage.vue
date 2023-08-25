<template>
  <div
    class="flex flex-col gap-6 mb-6 md:mb-8 lg:gap-8 lg:items-start lg:mb-12"
    :class="[
      data.image_position.selected === 'LEFT'
        ? 'lg:flex-row-reverse'
        : 'lg:flex-row',
    ]"
  >
    <ContentManager
      v-if="data.text && hasText"
      :item="data.text"
      class="prose"
    />
    <BCMSImage
      :media="data.image"
      class="aspect-[2.07] rounded-lg overflow-hidden w-full cover flex-shrink-0 lg:rounded-2xl"
      :class="[
        hasText
          ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
          : 'lg:aspect-[2.43]',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { PropType } from 'vue';
import { BCMSImage } from '~~/bcms-components';
import { TextWithImageWidget } from '~~/bcms/types';

const props = defineProps({
  data: {
    type: Object as PropType<TextWithImageWidget>,
    required: true,
  },
});

const hasText = computed(() => {
  const text = props.data.text as BCMSEntryContentParsedItem[];

  return text && text[0].value;
});
</script>
