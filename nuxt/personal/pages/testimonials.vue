<template>
    <div v-if="data">
        <div
            class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]"
        >
            <div class="container">
                <AnimatedTitle
                    :title="data.meta.title"
                    class="mb-10 md:mb-20 lg:mb-[124px]"
                    title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                />
                <div
                    class="flex flex-wrap justify-center gap-4 mb-12 max-w-[856px] mx-auto lg:gap-6 lg:mb-[170px]"
                >
                    <button
                        v-for="(item, index) in data.testimonials"
                        :key="index"
                        class="flex"
                        @click="activeItemIndex = index"
                    >
                        <BCMSImage
                            :media="item.author_image"
                            :client="data.bcms"
                            :class="`w-10 h-10 rounded-full overflow-hidden object-cover transition-all duration-300 ${
                                activeItemIndex === index
                                    ? 'scale-125'
                                    : 'opacity-20'
                            } lg:w-16 lg:h-16`"
                        />
                    </button>
                </div>
                <div
                    class="flex flex-col items-center text-center max-w-[1194px] mx-auto mb-6 lg:mb-12"
                >
                    <h3
                        class="text-xl leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px] lg:mb-10"
                    >
                        {{ activeItem?.title }}
                    </h3>
                    <ContentManager
                        :items="activeItem?.content.nodes || []"
                        class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-500 lg:text-[32px]"
                    />
                </div>
                <div class="flex items-center gap-2 lg:gap-6">
                    <button
                        v-for="(_, index) in data.testimonials"
                        :key="index"
                        class="relative h-0.5 transition-all duration-300 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-full after:h-5 lg:h-1"
                        :class="[
                            activeItemIndex === index
                                ? 'flex-[3] bg-[#2B261E]'
                                : 'flex-1 bg-[#F0F0F0]',
                        ]"
                        @click="activeItemIndex = index"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { TestimonialsPageResponse } from '~/server/api/testimonials-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<TestimonialsPageResponse>(
    '/api/testimonials-page',
);

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const activeItemIndex = ref(0);

const activeItem = computed(() => {
    return data.value?.testimonials[activeItemIndex.value];
});

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Personal Website`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
