<template>
    <div v-if="data">
        <div class="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
            <div class="relative aspect-square rounded overflow-hidden mb-6 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
                <h1
                    class="absolute z-10 bottom-6 left-6 text-lg leading-none font-medium tracking-[-0.41px] lg:bottom-10 lg:left-10 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px]">
                    {{ data.meta.title }}
                </h1>
                <BCMSImage :media="data.meta.cover_image" :client="data.bcms"
                    class="absolute top-0 left-0 w-full h-full object-cover rounded overflow-hidden lg:rounded-2xl" />
                <div class="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60" />
            </div>
            <div class="grid grid-cols-1 gap-4">
                <div v-for="(item, index) in data.meta.content" :key="index"
                    class="p-4 border border-appGray-600 rounded-2xl bg-appBody lg:p-8">
                    <ContentManager :items="item.nodes" class="aboutPage--content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { AboutPageResponse } from '~/server/api/about-page';

const { setOgHead } = useHeadTags();
const { setEpisodes } = useEpisodes()

const { data, error } = await useFetch<AboutPageResponse>('/api/about-page');

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

<style lang="scss">
.aboutPage--content {
    h2 {
        @apply text-sm leading-none font-medium tracking-[-1.41px] text-white mb-2.5 lg:text-[32px] lg:leading-none lg:mb-6;
    }

    p {
        @apply text-xs leading-[1.3] tracking-[-0.8px] text-appGray-500 lg:text-2xl lg:leading-[1.3];
    }
}
</style>