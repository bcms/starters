<template>
    <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
        <div class="pt-24 pb-10 lg:pt-[104px] lg:pb-20 xl:pb-[120px]">
            <div class="container">
                <div class="grid grid-cols-1 gap-6 lg:gap-12">
                    <div
                        v-for="(item, index) in data.entries"
                        :key="index"
                        class="border border-[#E6E6E6] rounded-[10px] px-4 py-6 lg:rounded-2xl lg:px-8 lg:py-10"
                    >
                        <h2
                            class="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-2 lg:text-[40px] lg:leading-none lg:mb-5"
                        >
                            {{ item.meta.en?.title }}
                        </h2>
                        <div
                            class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-4 lg:text-base lg:leading-none lg:mb-6"
                        >
                            Last updated: {{ updatedDate(item.updatedAt) }}
                        </div>
                        <ContentManager
                            :items="item.content.en || []"
                            class="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                        />
                    </div>
                </div>
            </div>
        </div>
    </PageWrapper>
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

const updatedDate = (val: number) => {
    const date = new Date(val);

    const day = date.getDate();
    const month = date.toLocaleString('default', {
        month: 'long',
    });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

useHead(() =>
    setOgHead({
        title: 'Legal - Flavour Fushion',
    }),
);
</script>
