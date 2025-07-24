<template>
    <div v-if="data">
        <div class="container pb-14 md:pb-20 lg:pb-[136px]">
            <div
                v-if="activeColor"
                class="grid grid-cols-1 gap-8 mb-14 lg:grid-cols-2"
            >
                <ShopPageGallery
                    :gallery="data.meta.gallery"
                    :active-color="activeColor"
                />
                <ShopPageDetails
                    :meta="data.meta"
                    :active-color="activeColor"
                    @color-change="handleColorChange"
                />
            </div>
            <div v-if="data.otherProducts.length > 0">
                <div
                    class="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-8 lg:text-[24px] lg:flex-row"
                >
                    <div>Others you may like</div>
                    <NuxtLink to="/shop" class="underline"> See all </NuxtLink>
                </div>
                <div
                    class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    <ProductCard
                        v-for="(product, index) in data.otherProducts"
                        :key="index"
                        :card="product"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductColorEntry } from '~/bcms/type/ts';
import type { ShopProductResponse } from '~/server/api/shop/[slug]';

const { setOgHead } = useHeadTags();
const route = useRoute();

const { data, error } = await useFetch<ShopProductResponse>(
    `/api/shop/${route.params.slug}`,
);

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const activeColor = ref<ProductColorEntry>();

const handleColorChange = (color: ProductColorEntry) => {
    activeColor.value = color;
};

onMounted(() => {
    activeColor.value = data.value?.meta.gallery[0].color;
});

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Moda`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
