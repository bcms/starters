<template>
    <div v-if="data">
        <HomePageHero
            :title="data.meta.hero_title"
            :description="data.meta.hero_description"
            :image="data.meta.hero_cover_image"
            :bcms="data.bcms"
        />
        <HomePageCategories
            :data="data.categories.slice(0, 6)"
            cta-theme="dark-green"
            :bcms="data.bcms"
        />
        <HomePageCta
            :title="data.meta.cta_title"
            :description="data.meta.cta_description"
            :image="data.meta.cta_cover_image"
            :cta="{
                label: data.meta.cta_label,
                to: data.meta.cta_link,
            }"
            :bcms="data.bcms"
        />
        <HomePageCategories
            :data="data.categories.slice(6, 12)"
            cta-theme="orange"
            :bcms="data.bcms"
        />
        <HomePageProducts
            :products="data.products"
            :filters="data.filters"
            :bcms="data.bcms"
        />
    </div>
</template>

<script setup lang="ts">
import type { HomePageResponse } from '~/server/api/home-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<HomePageResponse>('/api/home-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Moda`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
