<template>
    <div v-if="data">
        <HomePageHero
            :title="data.meta.hero_title"
            :description="data.meta.hero_description"
            :cover="data.meta.image"
            :bcms="data.bcms"
        />
        <HomePageServices
            :title="data.servicesMeta.title"
            :description="data.servicesMeta.description"
            :items="data.services"
        />
        <HomePageAbout
            :title="data.aboutMeta.title"
            :description="data.aboutMeta.description"
            :education="{
                title: data.aboutMeta.education_title,
                degrees: data.aboutMeta.education_degrees,
            }"
            :workHistory="{
                title: data.aboutMeta.work_history_title,
                items: data.aboutMeta.work_history_items,
            }"
        />
        <HomePagePortfolio
            :title="data.portfolioMeta.title"
            :description="data.portfolioMeta.description"
            :items="data.portfolio"
            :bcms="data.bcms"
        />
        <HomePageTestimonials
            :title="data.testimonialsMeta.title"
            :description="data.testimonialsMeta.description"
            :items="data.testimonials"
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
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Personal Website`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
