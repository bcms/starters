<template>
    <div class="py-24 md:py-32">
        <div v-if="data" class="container">
            <NuxtLink
                to="/"
                class="border border-appGray-200 bg-appGray-100 flex w-fit leading-none px-3 py-2 text-xl font-medium rounded-lg transition-colors duration-300 hover:bg-appGray-200 focus-visible:bg-appGray-200 mb-14 md:mb-20 md:px-5 md:py-4 md:text-2xl"
            >
                Back to home
            </NuxtLink>
            <div>
                <header class="mb-10 md:mb-16">
                    <div
                        class="flex flex-col gap-5 mb-8 md:flex-row md:items-center md:justify-between"
                    >
                        <h1
                            class="text-3xl font-semibold leading-none md:text-[40px]"
                        >
                            {{ data.item.meta.title }}
                        </h1>
                        <div class="flex items-center flex-wrap gap-2">
                            <Tag
                                v-for="(category, index) in data.item.meta
                                    .category"
                                :key="index"
                                class="capitalize"
                            >
                                {{ category.toLowerCase() }}
                            </Tag>
                            <svg
                                width="5"
                                height="5"
                                viewBox="0 0 5 5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="2.5"
                                    cy="2.5"
                                    r="2.5"
                                    fill="#D9D9D9"
                                />
                            </svg>
                            <div class="leading-none">
                                {{ toReadableDate(data.item.meta.date) }}
                            </div>
                        </div>
                    </div>
                    <BCMSImage
                        :client="data.bcms"
                        :media="data.item.meta.cover_image"
                        class="w-full aspect-[2.21] object-cover rounded-2xl md:rounded-3xl"
                    />
                </header>
                <BCMSContentManager
                    :items="data.item.content"
                    class="prose max-w-full lg:prose-lg"
                />
            </div>
            <div v-if="data.otherBlogs.length > 0" class="max-w-[1040px] mt-20">
                <h3
                    class="text-xl font-semibold leading-none tracking-[-0.24px] mb-8 md:mb-12 md:text-2xl"
                >
                    See my other blogs
                </h3>
                <div class="grid grid-cols-1 gap-12">
                    <template
                        v-for="(blog, index) in data.otherBlogs.slice(0, 2)"
                    >
                        <BlogCard
                            v-if="blog.meta.en"
                            :key="index"
                            :blog="blog.meta.en"
                            :bcms="data.bcms"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { bcms } from '~/bcms-client';
import type { BlogResponse } from '~/server/api/blog/[slug]';
import { BCMSImage, BCMSContentManager } from '@thebcms/components-vue';
import type { BlogEntryMetaItem } from '~/bcms/types/ts';

const route = useRoute();
const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<BlogResponse>(
    `/api/blog/${route.params.slug}`,
);

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: `${data.value?.item.meta.title || ''} - Simple Blog`,
    }),
);
</script>
