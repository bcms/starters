<template>
    <div v-if="data">
        <HomePageHero
            :title="data.meta.hero_title"
            :description="data.meta.hero_description"
            :cover="data.meta.hero_cover_image"
            :bcms="data.bcms"
        />
        <HomePageJobs
            :title="data.meta.jobs_title"
            :description="data.meta.jobs_description"
            :jobs="data.jobs"
        />
        <HomePageAbout
            :title="data.meta.about_title"
            :description="data.meta.about_description"
            :features="data.meta.about_features"
        />
        <HomePageTestimonials
            :testimonials="data.testimonials"
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
        title: 'Home - Hospitale',
    }),
);
</script>
