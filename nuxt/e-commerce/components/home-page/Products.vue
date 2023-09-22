<template>
  <section>
    <div class="container py-[72px]">
      <div
        class="flex flex-col items-start justify-between gap-12 mb-16 md:flex-row md:gap-20"
      >
        <div class="flex flex-wrap gap-8">
          <FormCheck
            v-for="(filter, index) in activeFilters"
            :key="index"
            v-model="filter.active"
            :label="filter.label"
          />
        </div>
        <button
          class="flex items-center gap-2 transition-colors duration-300 hover:text-red-500"
          @click="clearFilters"
        >
          <TrashIcon class="w-6 h-6" :font-controlled="false" />
          <span class="text-lg leading-none tracking-[-2%] mb-1 md:text-[24px]">
            Clear filters
          </span>
        </button>
      </div>
      <div
        class="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-y-12"
      >
        <ProductCard
          v-for="(card, index) in filteredProducts"
          :key="index"
          :card="card"
        />
      </div>
      <NuxtLink
        to="/shop"
        class="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
      >
        See all
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import TrashIcon from '@/assets/icons/trash.svg';
import {
  ProductCategoryEntryMeta,
  ProductGenderEntryMeta,
} from '~~/bcms/types';
import { ProductFilter, ProductLite } from '~~/types';

const props = defineProps({
  products: {
    type: Object as PropType<ProductLite[]>,
    required: true,
  },
  filters: {
    type: Object as PropType<{
      genders: ProductGenderEntryMeta[];
      categories: ProductCategoryEntryMeta[];
    }>,
    required: true,
  },
});

const activeFilters = ref<ProductFilter[]>([]);

const clearFilters = () => {
  activeFilters.value.forEach((filter) => {
    filter.active = false;
  });
};

const filteredProducts = computed(() => {
  return props.products.filter((e) => {
    let show = true;

    activeFilters.value.forEach((filter) => {
      if (filter.type === 'gender') {
        show = show && e.gender.slug === filter.value;
      }
      if (filter.type === 'category') {
        show = show && !!e.categories.find((c) => c.slug === filter.value);
      }
    });

    return show;
  });
});

onMounted(() => {
  props.filters.genders.forEach((gender) => {
    activeFilters.value.push({
      active: false,
      label: gender.title,
      value: gender.slug,
      type: 'gender',
    });
  });
  props.filters.categories.forEach((category) => {
    activeFilters.value.push({
      active: false,
      label: category.title,
      value: category.slug,
      type: 'category',
    });
  });
});
</script>
