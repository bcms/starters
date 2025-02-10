<template>
    <div v-if="data">
        <h1 class="sr-only">Legal page</h1>
        <div class="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
            <div class="container">
                <div class="grid grid-cols-1 gap-6">
                    <div
                        v-for="(item, index) in data.entries"
                        :key="index"
                        class="border border-[#DBD9D5] p-6"
                    >
                        <h2
                            class="text-[24px] leading-none tracking-[-1.4px] text-appGray-900 mb-5 md:text-[32px]"
                        >
                            {{ item.meta.en?.title }}
                        </h2>
                        <ContentManager
                            v-if="item.content.en"
                            :items="item.content.en"
                            class="grid grid-cols-1 gap-4 leading-[1.5] tracking-[-4%] text-appGray-500 md:text-lg"
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
        title: 'Legal - Moda',
    }),
);
</script>
