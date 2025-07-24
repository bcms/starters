<template>
    <div v-if="data">
        <div class="container pb-14 md:pb-20 lg:pb-[136px]">
            <div
                class="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3"
            >
                <BlogCard
                    v-for="(blog, index) in data.blogs"
                    :key="index"
                    :card="blog"
                    :style="{
                        display: index < loadedBlogs ? '' : 'none',
                    }"
                />
            </div>
            <button
                v-if="loadedBlogs < data.blogs.length"
                class="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
                @click="loadMore"
            >
                Load more
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogsPageResponse } from '~/server/api/blog/page';

const { data, error } = await useFetch<BlogsPageResponse>('/api/blog/page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const loadedBlogs = ref(9);

const loadMore = () => {
    loadedBlogs.value += 9;
};

const { setOgHead } = useHeadTags();

useHead(() =>
    setOgHead({
        title: 'Blogs - Moda',
    }),
);
</script>
