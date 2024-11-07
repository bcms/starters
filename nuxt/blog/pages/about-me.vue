<template>
    <div v-if="data">
        <div class="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
            <div class="container">
                <div
                    class="flex flex-col items-center text-center mb-8 md:mb-20 lg:mb-[134px]"
                >
                    <div
                        class="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
                    >
                        {{ data.meta.subtitle }}
                    </div>
                    <h1
                        class="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6"
                    >
                        {{ data.meta.title }}
                    </h1>
                    <ContentManager
                        :items="data.meta.description.nodes"
                        class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
                    />
                </div>
                <div
                    class="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8"
                >
                    <BCMSImage
                        :media="data.meta.cover_image"
                        :client="data.bcms"
                        class="w-full h-full bg-cover"
                    />
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-black/50"
                    />
                </div>
                <ContentManager :items="data.content" class="prose" />
            </div>
            <TopGradient />
        </div>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { AboutPageResponse } from '~/server/api/about-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<AboutPageResponse>('/api/about-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: 'Me, Myself, and My World - Insightfull Ink',
    }),
);
</script>
