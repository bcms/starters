<template>
    <div v-if="data">
        <HomePageHero :title="data.meta.hero_title" :description="data.meta.hero_description"
            :episodes="data.episodes.slice(0, 3)" :bcms="data.bcms" :cover="data.meta.hero_cover_image" />
        <HomePageEpisodes :title="data.meta.episodes_title" :description="data.meta.episodes_description"
            :episodes="data.episodes" :bcms="data.bcms" />
    </div>
</template>

<script setup lang="ts">
import type { HomePageResponse } from '~/server/api/home-page';

const { setOgHead } = useHeadTags();
const { setEpisodes } = useEpisodes()

const { data, error } = await useFetch<HomePageResponse>('/api/home-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

setEpisodes(
    data.value.episodes ? data.value.episodes.sort((a, b) => b.date.timestamp - a.date.timestamp) : [],
    data.value.bcms
);

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - The Podium`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
