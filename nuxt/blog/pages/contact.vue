<template>
    <div v-if="data">
        <div
            class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]"
        >
            <div class="container">
                <div
                    class="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12"
                >
                    <h1
                        class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
                    >
                        {{ data.meta.title }}
                    </h1>
                    <h2
                        class="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none"
                    >
                        {{ data.meta.subtitle }}
                    </h2>
                </div>
            </div>
            <TopGradient />
        </div>
        <ContactPageForm />
    </div>
</template>

<script setup lang="ts">
import type { ContactPageResponse } from '~/server/api/contact-page';

const { setOgHead } = useHeadTags();

const { data, error } =
    await useFetch<ContactPageResponse>('/api/contact-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: 'Feel free to reach out to me - Insightfull Ink',
    }),
);
</script>
