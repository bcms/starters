<template>
    <div
        class="grid grid-cols-1 gap-x-8 gap-y-10 items-start lg:grid-cols-[198px,1fr] lg:grid-rows-[auto,1fr]"
    >
        <div class="lg:row-span-2 sticky top-0">
            <div class="grid grid-cols-1 gap-8 border border-appGray-300 p-8">
                <div class="text-2xl leading-none font-bold tracking-[-2%]">
                    Filters
                </div>
                <div>
                    <div class="text-2xl leading-none tracking-[-2%] mb-5">
                        Gender
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <FormCheck
                            v-for="(filter, index) in filters.filter(
                                (e) => e.type === 'gender',
                            )"
                            :key="index"
                            v-model="filter.active"
                            :label="filter.label"
                            size="sm"
                        />
                    </div>
                </div>
                <div>
                    <div class="text-2xl leading-none tracking-[-2%] mb-5">
                        Price
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <FormCheck
                            v-for="(filter, index) in filters.filter(
                                (e) => e.type === 'price',
                            )"
                            :key="index"
                            v-model="filter.active"
                            :label="filter.label"
                            size="sm"
                        />
                    </div>
                </div>
                <div>
                    <div class="text-2xl leading-none tracking-[-2%] mb-5">
                        Popularity
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <FormCheck
                            v-for="(filter, index) in filters.filter(
                                (e) => e.type === 'popularity',
                            )"
                            :key="index"
                            v-model="filter.active"
                            :label="filter.label"
                            size="sm"
                        />
                    </div>
                </div>
                <div>
                    <div class="text-2xl leading-none tracking-[-2%] mb-5">
                        Categories
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <FormCheck
                            v-for="(filter, index) in filters.filter(
                                (e) => e.type === 'category',
                            )"
                            :key="index"
                            v-model="filter.active"
                            :label="filter.label"
                            size="sm"
                        />
                    </div>
                </div>
                <div>
                    <div class="text-2xl leading-none tracking-[-2%] mb-5">
                        Brands
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <FormCheck
                            v-for="(filter, index) in filters.filter(
                                (e) => e.type === 'brand',
                            )"
                            :key="index"
                            v-model="filter.active"
                            :label="filter.label"
                            size="sm"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:col-start-2">
            <div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
                <label
                    class="flex items-center px-5 flex-1 border border-appGray-300"
                >
                    <SvgoSearch
                        class="w-[18px] h-[18px]"
                        filled
                        :font-controlled="false"
                    />
                    <input
                        v-model="searchVal"
                        type="search"
                        placeholder="Search"
                        class="bg-transparent px-1.5 py-[15px] w-full text-lg leading-none tracking-[-2%] placeholder:text-appText focus:outline-none"
                    />
                </label>
                <button
                    class="flex items-center gap-1.5 p-[15px] transition-colors duration-300 text-appError bg-appError/10 hover:bg-appError/20"
                    @click="clearFilters"
                >
                    <SvgoTrash
                        class="w-[18px] h-[18px]"
                        filled
                        :font-controlled="false"
                    />
                    <span class="text-lg leading-none tracking-[-2%] mb-1">
                        Clear filters
                    </span>
                </button>
            </div>
            <div
                v-if="activeFilters.length > 0"
                class="flex flex-wrap gap-4 mt-6"
            >
                <button
                    v-for="(filter, index) in activeFilters"
                    :key="index"
                    class="flex items-center gap-2 px-3 py-2 border border-appGray-300 leading-none tracking-[-0.3px] text-appGray-500 transition-colors duration-300 hover:text-appGray-800"
                    @click="filter.active = false"
                >
                    <span class="mb-1">{{ filter.label }}</span>
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                    >
                        <g id="cancel">
                            <mask
                                id="mask0_1616_67979"
                                style="mask-type: alpha"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="16"
                                height="16"
                            >
                                <rect
                                    id="Bounding box"
                                    width="16"
                                    height="16"
                                    fill="#D9D9D9"
                                />
                            </mask>
                            <g mask="url(#mask0_1616_67979)">
                                <path
                                    id="cancel_2"
                                    d="M5.59967 11.332L7.99967 8.93203L10.3997 11.332L11.333 10.3987L8.93301 7.9987L11.333 5.5987L10.3997 4.66536L7.99967 7.06536L5.59967 4.66536L4.66634 5.5987L7.06634 7.9987L4.66634 10.3987L5.59967 11.332ZM7.99967 14.6654C7.07745 14.6654 6.21079 14.4904 5.39967 14.1404C4.58856 13.7904 3.88301 13.3154 3.28301 12.7154C2.68301 12.1154 2.20801 11.4098 1.85801 10.5987C1.50801 9.78759 1.33301 8.92092 1.33301 7.9987C1.33301 7.07648 1.50801 6.20981 1.85801 5.3987C2.20801 4.58759 2.68301 3.88203 3.28301 3.28203C3.88301 2.68203 4.58856 2.20703 5.39967 1.85703C6.21079 1.50703 7.07745 1.33203 7.99967 1.33203C8.9219 1.33203 9.78856 1.50703 10.5997 1.85703C11.4108 2.20703 12.1163 2.68203 12.7163 3.28203C13.3163 3.88203 13.7913 4.58759 14.1413 5.3987C14.4913 6.20981 14.6663 7.07648 14.6663 7.9987C14.6663 8.92092 14.4913 9.78759 14.1413 10.5987C13.7913 11.4098 13.3163 12.1154 12.7163 12.7154C12.1163 13.3154 11.4108 13.7904 10.5997 14.1404C9.78856 14.4904 8.9219 14.6654 7.99967 14.6654Z"
                                    fill="#1C1B1F"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
        <div class="lg:col-start-2">
            <div class="text-2xl leading-none tracking-[-2%] mb-6">
                {{ filteredProducts.length }} Product{{
                    filteredProducts.length === 1 ? '' : 's'
                }}
                found
            </div>
            <div
                class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <ProductCard
                    v-for="(product, index) in filteredProducts"
                    :key="index"
                    :card="product"
                    :style="{
                        display: index < loadedProducts ? '' : 'none',
                    }"
                />
            </div>
            <button
                v-if="loadedProducts < products.length"
                class="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto mt-12 transition-colors duration-300 hover:bg-appText hover:text-white"
                @click="loadMore"
            >
                Load more
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductFilter } from '~/types';
import type {
    ProductBrandEntryMetaItem,
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '~/bcms/type/ts';

const props = defineProps({
    products: {
        type: Array as PropType<ProductLite[]>,
        required: true,
    },
    genders: {
        type: Array as PropType<ProductGenderEntryMetaItem[]>,
        required: true,
    },
    categories: {
        type: Array as PropType<ProductCategoryEntryMetaItem[]>,
        required: true,
    },
    brands: {
        type: Array as PropType<ProductBrandEntryMetaItem[]>,
        required: true,
    },
});

const route = useRoute();

const loadedProducts = ref(12);

const loadMore = () => {
    loadedProducts.value += 12;
};

const searchVal = ref('');
const filters = ref([
    {
        active: false,
        type: 'price',
        label: 'Lowest',
        value: 0,
    },
    {
        active: false,
        type: 'price',
        label: 'Most expensive',
        value: 1,
    },
    {
        active: false,
        type: 'popularity',
        label: 'Best selling',
        value: 0,
    },
    {
        active: false,
        type: 'popularity',
        label: 'New comer',
        value: 1,
    },
] as ProductFilter[]);

const activeFilters = computed(() => {
    return filters.value.filter((e) => e.active);
});

const clearFilters = () => {
    activeFilters.value.forEach((filter) => {
        filter.active = false;
    });
    searchVal.value = '';
};

const filteredProducts = computed(() => {
    return (
        props.products.filter((e) => {
            let show = true;

            if (searchVal.value) {
                show =
                    show &&
                    `${e.title} $${e.price} ${
                        e.discounted_price ? '$' + e.discounted_price : ''
                    } ${e.brand.title} ${e.gender.title} ${e.categories
                        .map((i) => i.meta.en?.title)
                        .join(' ')}`
                        .toLowerCase()
                        .includes(searchVal.value.toLowerCase());
            }
            activeFilters.value.forEach((filter) => {
                if (filter.type === 'gender') {
                    show = show && e.gender.slug === filter.value;
                }
                if (filter.type === 'category') {
                    show =
                        show &&
                        !!e.categories.find(
                            (c) => c.meta.en?.slug === filter.value,
                        );
                }
                if (filter.type === 'brand') {
                    show = show && e.brand.slug === filter.value;
                }
            });

            return show;
        }) || []
    )
        .sort((a, b) => {
            const priceFilter = activeFilters.value.find(
                (e) => e.type === 'price',
            );

            if (priceFilter) {
                if (priceFilter.value === 0) {
                    return a.price - b.price;
                } else if (priceFilter.value === 1 && priceFilter.active) {
                    return b.price - a.price;
                }
            }
            return 0;
        })
        .sort((a, b) => {
            const popularityFilter = activeFilters.value.find(
                (e) => e.type === 'popularity',
            );

            if (popularityFilter) {
                if (popularityFilter.value === 0) {
                    return b.units_sold - a.units_sold;
                } else if (
                    popularityFilter.value === 1 &&
                    popularityFilter.active
                ) {
                    return b.date - a.date;
                }
            }
            return 0;
        });
});

onMounted(() => {
    props.genders.forEach((gender) => {
        filters.value.push({
            active: false,
            label: gender.title,
            value: gender.slug,
            type: 'gender',
        });
    });
    props.categories.forEach((category) => {
        filters.value.push({
            active: false,
            label: category.title,
            value: category.slug,
            type: 'category',
        });
    });
    props.brands.forEach((brand) => {
        filters.value.push({
            active: false,
            label: brand.title,
            value: brand.slug,
            type: 'brand',
        });
    });
    const queryCategory = route.query.category;
    const category = filters.value.find(
        (e) => e.type === 'category' && e.value === queryCategory,
    );
    if (queryCategory && category) {
        category.active = true;
    }
});
</script>
