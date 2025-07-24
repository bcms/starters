<template>
    <div v-if="data">
        <div class="container pb-14 md:pb-20 lg:pb-[136px]">
            <div
                class="relative flex items-end p-4 min-h-[300px] max-w-full aspect-[2.47] mb-10 lg:p-12"
            >
                <div class="relative z-10">
                    <div
                        class="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-300 mb-2.5 md:text-lg"
                    >
                        <div>
                            {{ formattedDate(data.meta.date.timestamp) }}
                        </div>
                        <div class="w-1 h-1 rounded-full bg-current mt-1" />
                        <div>By {{ data.meta.author.meta.en?.title }}</div>
                    </div>
                    <h1
                        class="text-2xl leading-none tracking-[-2%] text-white mb-3 lg:text-[40px]"
                    >
                        {{ data.meta.title }}
                    </h1>
                </div>
                <div class="absolute top-0 left-0 size-full">
                    <BcmsImage
                        :media="data.meta.media_image"
                        class="size-full object-cover"
                    />
                </div>
                <div class="absolute inset-0 bg-black/50" />
            </div>
            <div
                class="grid grid-cols-1 gap-10 items-start lg:grid-cols-[1fr,400px] lg:gap-16 xl:grid-cols-[1fr,600px]"
            >
                <ContentManager :items="data.content" class="blog--content" />
                <div class="border border-appGray-300 p-4 lg:p-8">
                    <div
                        class="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-6 lg:text-[24px] lg:flex-row"
                    >
                        <div>Others you may like</div>
                        <NuxtLink to="/blog" class="underline">
                            See all
                        </NuxtLink>
                    </div>
                    <div class="grid grid-cols-1 gap-8">
                        <BlogCard
                            v-for="(blog, index) in data.otherBlogs"
                            :key="index"
                            :card="blog"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogResponse } from '~/server/api/blog/[slug]';

const { setOgHead } = useHeadTags();
const route = useRoute();

const { data, error } = await useFetch<BlogResponse>(
    `/api/blog/${route.params.slug}`,
);

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const formattedDate = (date: number) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Moda`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>

<style lang="scss">
.blog {
    &--content {
        h2 {
            @apply text-2xl leading-none tracking-[-2%] mt-10 mb-4;
        }
        p {
            @apply leading-[1.3] text-appGray-600 mb-2.5;
        }
    }
}
</style>
