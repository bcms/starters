<template>
    <div v-if="data" class="mt-6 md:mt-10 lg:mt-[76px]">
        <div class="container">
            <h1
                class="font-bold leading-none tracking-[-0.32px] text-center mb-8 md:text-3xl md:leading-none md:mb-14 lg:font-Inter lg:font-medium lg:text-5xl lg:leading-none lg:tracking-[-0.96px] lg:mb-20"
            >
                {{ data.meta.title }}
            </h1>
            <div class="grid grid-cols-1 gap-3 lg:gap-4">
                <div
                    v-for="(block, index) in data.meta.blocks"
                    :key="index"
                    class="flex flex-col gap-4 p-6 rounded-lg"
                    :style="{
                        boxShadow:
                            '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                    }"
                >
                    <h2
                        class="text-sm font-bold leading-[1.1] tracking-[-0.28px] lg:text-2xl lg:leading-[1.1] lg:tracking-[-0.48px]"
                    >
                        {{ block.title }}
                    </h2>
                    <ContentManager
                        :items="block.description.nodes"
                        class="text-appGray-200 text-xs font-medium leading-[1.4] tracking-[-0.24px] lg:text-xl lg:leading-[1.4] lg:tracking-[-0.4px]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LegalPageResponse } from '~/server/api/legal-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<LegalPageResponse>('/api/legal-page');
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