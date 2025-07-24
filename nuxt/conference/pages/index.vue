<template>
    <PageWrapper :legal="data.legalEntries" v-if="data">
        <HomePageHero
            :gallery="data.meta.hero_gallery"
            :description="data.meta.hero_description"
            :cover="data.meta.hero_cover_image"
        />
        <HomePageAbout
            :title="data.meta.about_title"
            :cover="data.meta.about_cover"
            :description="data.meta.about_description"
            :topics="data.meta.about_topics"
        />
        <HomePageSpeakers
            :title="data.meta.speakers_title"
            :description="data.meta.speakers_description"
            :cover="data.meta.speakers_cover_image"
            :speakers="data.meta.speakers"
        />
        <HomePageSponsors
            :title="data.meta.sponsors_title"
            :sponsors="data.meta.sponsors"
        />
        <HomePageTickets
            :title="data.meta.tickets_title"
            :description="data.meta.tickets_description"
            :tickets="data.meta.tickets"
        />
        <HomePageAgenda
            :title="data.meta.agenda_title"
            :days="data.meta.agenda_days"
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
        title: 'Home - CONference',
    }),
);
</script>
