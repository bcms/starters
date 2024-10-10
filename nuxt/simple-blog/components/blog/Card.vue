<template>
    <article>
        <NuxtLink
            :to="`/blog/${blog.slug}`"
            class="group w-full grid grid-cols-1 border border-solid border-appGray-200 rounded-2xl overflow-hidden md:grid-cols-[45%,55%]"
        >
            <div class="aspect-[1.25] self-stretch overflow-hidden">
                <BCMSImage
                    :client="bcms"
                    :media="blog.cover_image"
                    class="size-full object-cover transition-transform duration-500 object-center group-hover:scale-105 group-focus-visible:scale-105"
                />
            </div>
            <div
                class="flex flex-col self-center pt-6 max-md:px-4 max-md:pb-4 md:px-12"
            >
                <h3 class="text-2xl font-semibold leading-none mb-4">
                    {{ blog.title }}
                </h3>
                <div class="flex items-center flex-wrap gap-2 mb-8">
                    <Tag
                        v-for="(category, index) in blog.category"
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
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9" />
                    </svg>
                    <div class="leading-none">
                        {{ toReadableDate(blog.date) }}
                    </div>
                </div>
                <BCMSContentManager
                    :items="blog.description.nodes"
                    class="text-appGray-300 font-medium leading-[1.38] tracking-[-0.36px] md:text-lg"
                />
            </div>
        </NuxtLink>
    </article>
</template>

<script setup lang="ts">
import type { BlogEntryMetaItem } from '~/bcms/types/ts/entry/blog';
import { BCMSImage, BCMSContentManager } from '@thebcms/components-vue';
import { bcms } from '~/bcms-client';

defineProps({
    blog: {
        type: Object as PropType<BlogEntryMetaItem>,
        required: true,
    },
});
</script>
