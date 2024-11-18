<template>
    <div v-if="data">
        <HomePageHero
            :title="data.meta.hero_title"
            :gallery="data.meta.hero_gallery_image"
            :bcms="data.bcms"
        />
        <HomePageAbout
            :title="data.meta.about_title"
            :subtitle="data.meta.about_subtitle"
            :cover="data.meta.about_cover_image"
            :description="data.meta.about_description"
            :bcms="data.bcms"
        />
        <HomePageServices
            :title="data.meta.services_title"
            :subtitle="data.meta.services_subtitle"
            :description="data.meta.services_description"
            :cover="data.meta.services_cover_image"
            :bcms="data.bcms"
        />
        <HomePageCapabilities
            :title="data.meta.capabilities_title"
            :subtitle="data.meta.capabilities_subtitle"
            :description="data.meta.capabilities_description"
            :portfolio_items="data.meta.capabilities_portfolio_items"
            :bcms="data.bcms"
        />
        <HomePageTeam
            :title="data.meta.team_title"
            :subtitle="data.meta.team_subtitle"
            :description="data.meta.team_description"
            :cover="data.meta.team_cover_image"
            :members_title="data.meta.team_members_title"
            :members_description="data.meta.team_members_description"
            :members="data.meta.team_members"
            :bcms="data.bcms"
        />
        <ContactBlock
            :title="data.meta.contact_title"
            :description="data.meta.contact_description"
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
        title: 'Home - BrandCrafters',
    }),
);
</script>
