<template>
    <div class="py-24 md:py-32">
        <div class="container">
            <div
                class="flex flex-col gap-6 items-center text-center mb-20 md:mb-[120px]"
            >
                <Tag size="lg">Hi, I’m Mark 👋</Tag>
                <h1 class="text-4xl font-bold leading-none md:text-5xl">
                    This is my blog
                </h1>
            </div>
            <div>
                <div class="grid grid-cols-1 gap-12 max-w-[1040px] mx-auto">
                    <BlogCard
                        v-for="(card, index) in data?.items"
                        :key="index"
                        :blog="card"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogsResponse } from '~/server/api/blog/all';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<BlogsResponse>('/api/blog/all');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: 'Blogs - Simple Blog',
    }),
);
</script>
