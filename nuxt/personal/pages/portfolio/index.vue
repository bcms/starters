<template>
    <div v-if="data">
        <div
            class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]"
        >
            <div class="container">
                <AnimatedTitle
                    :title="data.meta.title"
                    class="mb-10 md:mb-20 lg:mb-[192px]"
                    title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                />
                <div class="grid grid-cols-1 gap-[33px] lg:gap-20">
                    <NuxtLink
                        v-for="(item, index) in data.entries"
                        :key="index"
                        :to="`/portfolio/${item.slug}`"
                    >
                        <BCMSImage
                            :media="item.gallery[0]"
                            :client="data.bcms"
                            class="w-full aspect-[2.07] object-cover rounded-[6px] overflow-hidden mb-4 lg:rounded-3xl lg:mb-12"
                        />
                        <div class="lg:flex lg:items-start lg:justify-between">
                            <h3
                                class="flex text-sm leading-none tracking-[-0.41px] font-Helvetica mb-3 md:text-2xl md:leading-none lg:text-[32px]"
                            >
                                {{ item.brand_name }}
                                <span
                                    class="text-[10px] ml-1.5 md:text-sm lg:text-xl"
                                    >&#169;</span
                                >
                            </h3>
                            <ContentManager
                                :items="item.description.nodes"
                                class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:max-w-[551px]"
                            />
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { PortfolioPageResponse } from '~/server/api/portfolio/page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<PortfolioPageResponse>(
    '/api/portfolio/page',
);

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Personal Website`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
