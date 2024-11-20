<template>
    <div v-if="data">
        <div class="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
            <div class="relative mb-4 lg:mb-6">
                <div class="py-6">
                    <div class="container">
                        <div
                            class="relative z-10 aspect-[1.23] md:aspect-[1.95]"
                        >
                            <h1
                                class="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none"
                            >
                                {{ data.meta.title }}
                            </h1>
                            <div
                                class="flex items-end justify-between gap-5 h-full"
                            >
                                <div class="flex flex-col">
                                    <div
                                        class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                                    >
                                        Project
                                    </div>
                                    <div
                                        class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                                    >
                                        {{
                                            data.meta.project_no.padStart(
                                                2,
                                                '0',
                                            )
                                        }}
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <div
                                        class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                                    >
                                        Brand name
                                    </div>
                                    <div
                                        class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                                    >
                                        {{ data.meta.brand_name }}
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <div
                                        class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                                    >
                                        Role
                                    </div>
                                    <div
                                        class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                                    >
                                        {{ data.meta.role }}
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <div
                                        class="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3"
                                    >
                                        Year
                                    </div>
                                    <div
                                        class="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none"
                                    >
                                        {{
                                            new Date(
                                                data.meta.date.timestamp,
                                            ).getFullYear()
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BCMSImage
                    :media="data.meta.gallery[0]"
                    :client="data.bcms"
                    class="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div
                    class="absolute top-0 left-0 w-full h-full bg-appText/80"
                />
            </div>
            <div class="container">
                <ContentManager
                    :items="data.meta.description.nodes"
                    class="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
                />
                <div class="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
                    <BCMSImage
                        v-for="(image, index) in data.meta.gallery.slice(1)"
                        :key="index"
                        :media="image"
                        :client="data.bcms"
                        class="portfolioItemPage--galleryImage w-full object-cover h-full"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { PortfolioResponse } from '~/server/api/portfolio/[slug]';

const { setOgHead } = useHeadTags();
const route = useRoute();

const { data, error } = await useFetch<PortfolioResponse>(
    `/api/portfolio/${route.params.slug}`,
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
