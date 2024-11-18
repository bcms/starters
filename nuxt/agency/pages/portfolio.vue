<template>
    <div v-if="data">
        <Hero
            :title="data.meta.title"
            subtitle="Portfolio"
            :description="data.meta.description"
        />
        <PortfolioList :items="data.portfolio" :bcms="data.bcms" />
        <ContactBlock
            :title="data.meta.contact_title"
            :description="data.meta.contact_description"
        />
    </div>
</template>

<script setup lang="ts">
import type { PortfolioPageResponse } from '~/server/api/portfolio-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<PortfolioPageResponse>(
    '/api/portfolio-page',
);
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
