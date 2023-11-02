<template>
  <div class="flex flex-col">
    <BCMSImage
      v-for="(image, index) in galleryByColor"
      :key="index"
      :media="image.image"
      class="aspect-square w-full cover mb-6 flex-1"
      :class="[activeImage === index ? 'flex' : 'hidden']"
    />
    <!-- :options="{
        sizes: {
          exec: [
            {
              width: 800,
            },
          ],
        },
      }" -->
    <div class="flex gap-4 overflow-x-auto">
      <button
        v-for="(image, index) in galleryByColor"
        :key="index"
        class="group flex flex-shrink-0 w-[124px] aspect-square border p-2 transition-colors duration-300"
        :class="[
          index === activeImage ? 'border-appText' : 'border-appGray-300',
        ]"
        @click="activeImage = index"
      >
        <div class="overflow-hidden">
          <BCMSImage
            :media="image.image"
            class="w-full h-full cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { ProductColorEntry, ProductImageGroup } from '~~/bcms/types';

const props = defineProps({
  gallery: {
    type: Array as PropType<ProductImageGroup[]>,
    required: true,
  },
  activeColor: {
    type: Object as PropType<ProductColorEntry>,
    required: true,
  },
});

const activeImage = ref(0);

const galleryByColor = computed(() => {
  return props.gallery.filter(
    (e) => e.color.meta.en?.slug === props.activeColor.meta.en?.slug,
  );
});

watch(
  () => props.activeColor,
  () => {
    activeImage.value = 0;
  },
);
</script>
