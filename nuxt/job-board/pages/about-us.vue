<template>
    <div v-if="data">
        <div class="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
            <BCMSImage
                :media="data.meta.cover_image"
                :client="data.bcms"
                class="w-full aspect-[2.76] object-cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]"
            />
            <div class="container">
                <h1
                    class="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16"
                >
                    {{ data.meta.title }}
                </h1>
                <div
                    class="aboutUs--content text-center mb-12 md:mb-20 lg:mb-[120px]"
                >
                    <template
                        v-for="(item, index) in data.meta.content"
                        :key="index"
                    >
                        <ContentManager
                            v-if="item.text && item.text.nodes.length > 0"
                            :key="index"
                            :items="item.text.nodes"
                            class="leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-[32px] lg:leading-normal"
                        />
                        <BCMSImage
                            v-if="item.image"
                            :key="index"
                            :client="data.bcms"
                            :media="item.image"
                            class="image object-cover w-[37px] h-4 flex-shrink-0 mx-1 -translate-y-0.5 bg-center bg-cover lg:w-[112px] lg:h-12 lg:mx-3 lg:-translate-y-2"
                        />
                    </template>
                </div>
            </div>
            <AboutPageTeam
                :title="data.meta.team_title"
                :description="data.meta.team_description"
                :members="data.members"
                :bcms="data.bcms"
            />
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
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Hospitale`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>

<style lang="scss">
.aboutUs--content {
    * {
        @apply inline;
    }
    .image {
        @apply inline-block;
        picture {
            @apply flex;
        }
    }
    strong {
        @apply text-[#48465F];
    }
    u {
        @apply text-appText;
    }
}
</style>
