<template>
    <section>
        <div class="container py-[72px]">
            <div
                class="flex flex-col items-start justify-between gap-12 mb-16 md:flex-row md:gap-20"
            >
                <div class="flex flex-wrap gap-8">
                    <FormCheck
                        v-for="(filter, index) in productFilters"
                        :key="index"
                        v-model="filter.active"
                        :label="filter.label"
                    />
                </div>
                <button
                    class="flex items-center gap-2 transition-colors duration-300 hover:text-appError"
                    @click="clearFilters"
                >
                    <SvgoTrash
                        class="w-6 h-6"
                        filled
                        :font-controlled="false"
                    />
                    <span
                        class="text-lg leading-none tracking-[-2%] mb-1 md:text-[24px]"
                    >
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
import type {
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '~/bcms/type/ts';
import type { ProductFilter } from '~/types';

const props = defineProps({
    products: {
        type: Object as PropType<ProductLite[]>,
        required: true,
    },
    filters: {
        type: Object as PropType<{
            genders: ProductGenderEntryMetaItem[];
            categories: ProductCategoryEntryMetaItem[];
        }>,
        required: true,
    },
});

const productFilters = ref<ProductFilter[]>([]);

const activeFilters = computed(() => {
    return productFilters.value.filter((e) => e.active);
});

const clearFilters = () => {
    productFilters.value.forEach((filter) => {
        filter.active = false;
    });
};

const filteredProducts = computed(() => {
    return props.products.filter((e) => {
        let show = true;

        activeFilters.value.forEach((filter) => {
            if (filter.type === 'gender' && filter.active) {
                show = show && e.gender.slug === filter.value;
            }
            if (filter.type === 'category' && filter.active) {
                show =
                    show &&
                    !!e.categories.find(
                        (c) => c.meta.en?.slug === filter.value,
                    );
            }
        });

        return show;
    });
});

onMounted(() => {
    props.filters.genders.forEach((gender) => {
        productFilters.value.push({
            active: false,
            label: gender.title,
            value: gender.slug,
            type: 'gender',
        });
    });
    props.filters.categories.forEach((category) => {
        productFilters.value.push({
            active: false,
            label: category.title,
            value: category.slug,
            type: 'category',
        });
    });
});
</script>
