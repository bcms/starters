<template>
    <div v-if="data">
        <AboutPageHero
            :title="data.meta.hero_title"
            :subtitle="data.meta.hero_subtitle"
            :description="data.meta.hero_description"
            :cover="data.meta.hero_cover"
            :bcms="data.bcms"
        />
        <AboutPageTextImage
            :data="data.meta.text_image_cols"
            :bcms="data.bcms"
        />
    </div>
</template>

<script setup lang="ts">
import type { AboutUsPageResponse } from '~/server/api/about-us-page';

const { setOgHead } = useHeadTags();

const { data, error } =
    await useFetch<AboutUsPageResponse>('/api/about-us-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Tastyyy`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
