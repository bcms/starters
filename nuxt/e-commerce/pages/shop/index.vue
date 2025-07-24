<template>
    <div v-if="data">
        <div class="container pb-14 md:pb-20 lg:pb-[136px]">
            <ShopPageMain
                :products="data.products"
                :genders="data.genders"
                :categories="data.categories"
                :brands="data.brands"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ShopPageResponse } from '~/server/api/shop/page';

const { data, error } = await useFetch<ShopPageResponse>('/api/shop/page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const { setOgHead } = useHeadTags();

useHead(() =>
    setOgHead({
        title: 'Shop - Moda',
    }),
);
</script>
