<template>
    <div v-if="data">
        <HomePageHero
            :title="data.meta.hero_title"
            :open_time="data.meta.hero_open_time"
            :address="data.meta.hero_address"
            :map="data.meta.hero_map_image"
            :description="data.meta.description"
            :bcms="data.bcms"
        />
        <HomePageMenu
            :title="data.meta.menu_title"
            :description="data.meta.menu_description"
            :meals="data.meta.menu_meals"
            :bcms="data.bcms"
        />
        <HomePageSeasons
            :title="data.meta.seasons_title"
            :description="data.meta.seasons_description"
            :seasons="data.meta.seasons"
            :bcms="data.bcms"
        />
        <HomePageAmbience
            :title="data.meta.ambience_title"
            :description="data.meta.ambience_description"
            :items="data.meta.ambience_items"
            :bcms="data.bcms"
        />
        <HomePageSpecials
            :title="data.meta.specials_title"
            :description="data.meta.specials_description"
            :items="
                data.foodItems
                    .map((e) => e.meta.en as FoodItemEntryMetaItem)
                    .filter((e) => e.special)
            "
            :bcms="data.bcms"
        />
        <HomePageEvents
            :title="data.meta.events_title"
            :description="data.meta.events_description"
            :items="data.meta.events"
            :bcms="data.bcms"
        />
        <HomePageTestimonials
            :title="data.meta.testimonials_title"
            :description="data.meta.testimonials_description"
            :items="data.meta.testimonials"
            :bcms="data.bcms"
        />
    </div>
</template>

<script setup lang="ts">
import type { FoodItemEntryMetaItem } from '~/bcms/types/ts';
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
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Tastyyy`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
