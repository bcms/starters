<template>
  <div class="flex flex-col">
    <NuxtLink :to="`/shop/${card.slug}`" class="group flex flex-col">
      <div class="flex overflow-hidden mb-6">
        <BCMSImage
          :media="card.cover"
          class="w-full h-[320px] cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div class="mb-6">
        <h3 class="text-2xl leading-none tracking-[-0.5px] mb-3">
          {{ card.title }}
        </h3>
        <div class="flex items-center gap-1">
          <span class="text-2xl leading-none tracking-[-0.5px] font-bold">
            ${{ card.discounted_price || card.price }}
          </span>
          <span
            v-if="card.discounted_price"
            class="text-lg leading-none tracking-[-0.4px] line-through text-appGray-500"
          >
            ${{ card.price }}
          </span>
        </div>
      </div>
    </NuxtLink>
    <div class="flex flex-wrap gap-3 mb-6">
      <button
        v-for="(size, index) in card.sizes"
        :key="index"
        :disabled="!size.available"
        class="w-8 h-8 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] transition-colors duration-300"
        :class="[
          size.available
            ? selectedSize === size.size.meta.en?.title
              ? 'text-appAccent-orange bg-appGray-200 hover:bg-appGray-200'
              : 'text-appGray-800 hover:bg-appGray-200'
            : 'text-appGray-400 cursor-default',
        ]"
        @click="selectedSize = size.size.meta.en?.title"
      >
        {{ size.size.meta.en?.title }}
      </button>
    </div>
    <button
      class="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-appText text-white transition-colors duration-300 hover:bg-appText/80"
      @click="addToCart"
    >
      Add to cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { ProductLite } from '~~/types';

defineProps({
  card: {
    type: Object as PropType<ProductLite>,
    required: true,
  },
});

const selectedSize = ref();

const addToCart = () => {};
</script>
