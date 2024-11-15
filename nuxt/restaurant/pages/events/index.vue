<template>
    <div v-if="data">
        <section
            class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
        >
            <div class="container max-w-[1198px]">
                <ArchWithStar />
                <div
                    class="relative px-4 max-w-[400px] mx-auto mb-10 lg:max-w-[745px] lg:mb-20 xl:px-0"
                >
                    <h1
                        class="text-xl leading-none font-Gloock uppercase text-center mb-6 lg:text-5xl lg:leading-none"
                    >
                        {{ data.meta.title }}
                    </h1>
                    <ContentManager
                        :items="data.meta.description.nodes"
                        class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
                    />
                </div>
            </div>
            <div class="container">
                <div
                    v-if="data.meta.events.length > 0"
                    class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
                >
                    <EventsPageEventCard
                        v-for="(item, index) in data.meta.events"
                        :key="index"
                        :card="item"
                        :bcms="data.bcms"
                    />
                </div>
                <div
                    v-else
                    class="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20"
                >
                    No events
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { EventsPageResponse } from '~/server/api/events-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<EventsPageResponse>('/api/events-page');

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
