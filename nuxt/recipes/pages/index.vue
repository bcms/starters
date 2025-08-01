<template>
    <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
        <HomePageHero
            :title="data.meta.headline"
            :description="data.meta.description"
            :cover="data.meta.cover_image"
            :recipes="data.recipes"
        />
        <HomePageRecipes
            :title="data.meta.recipes_title"
            :recipes="data.recipes"
        />
        <HomePageAboutUs :data="data.meta.about_us" />
        <HomePageLetsTalk
            :title="data.meta.contact_title"
            :description="data.meta.contact_description"
            :email="data.meta.contact_email"
            :phone="data.meta.contact_phone"
        />
    </PageWrapper>
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
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Flavour Fushion`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
