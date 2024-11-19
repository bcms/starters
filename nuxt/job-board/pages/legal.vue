<template>
    <div v-if="data">
        <div class="pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-16 lg:pb-[120px]">
            <div class="container">
                <div
                    class="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6"
                >
                    <h1 class="sr-only">Legal page content</h1>
                    <div
                        v-for="(item, index) in data.entries"
                        :key="index"
                        class="border border-[#DBD9D5] rounded-[7px] p-6"
                    >
                        <h2
                            class="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay mb-3 lg:text-[32px] lg:leading-none lg:mb-5"
                        >
                            {{ item.meta.en?.title }}
                        </h2>
                        <ContentManager
                            :items="item.content.en || []"
                            class="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
                        />
                    </div>
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
        title: 'Legal - Hospitale',
    }),
);
</script>
