<template>
    <div v-if="data">
        <Hero
            :title="data.meta.title"
            subtitle="Our services"
            :description="data.meta.description"
        />
        <ServicesList :services="data.services" :bcms="data.bcms" />
        <ContactBlock
            :title="data.meta.contact_title"
            :description="data.meta.contact_description"
        />
    </div>
</template>

<script setup lang="ts">
import type { ServicesPageResponse } from '~/server/api/services-page';

const { setOgHead } = useHeadTags();

const { data, error } =
    await useFetch<ServicesPageResponse>('/api/services-page');

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
