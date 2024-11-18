<template>
    <div v-if="data">
        <Hero
            :title="data.meta.title"
            subtitle="Team"
            :description="data.meta.description"
        />
        <TeamList :items="data.members" :bcms="data.bcms" />
        <ContactBlock
            :title="data.meta.contact_title"
            :description="data.meta.contact_description"
        />
    </div>
</template>

<script setup lang="ts">
import type { TeamPageResponse } from '~/server/api/team-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<TeamPageResponse>('/api/team-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: data.value?.meta.seo?.title || data.value?.meta.title,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
