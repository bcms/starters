<template>
    <article>
        <NuxtLink :to="`/blog/${blog.slug}`">
            <BCMSImage
                :media="blog.cover"
                :client="bcms"
                class="w-full object-cover aspect-[1.48] rounded-2xl overflow-hidden mb-4 xl:aspect-[1.04] xl:mb-6"
            />
            <div
                class="text-xs leading-none font-medium tracking-[-0.82px] text-appGray-400 mb-2 xl:text-base xl:leading-none xl:mb-4"
            >
                {{ dateUtil.format(blog.date) }}
            </div>
            <div class="flex items-center mb-2.5 xl:mb-4">
                <div
                    class="text-sm leading-none font-medium tracking-[-0.41px] mr-2 xl:text-2xl xl:leading-none"
                >
                    {{ blog.title }}
                </div>
                <div
                    class="flex items-center justify-center p-0.5 rounded bg-[#F2F2F2] xl:p-1"
                >
                    <OpenIcon class="w-3 h-3 xl:w-4 xl:h-4" />
                </div>
            </div>
            <ContentManager
                :items="blog.description.nodes"
                class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 xl:text-xl xl:leading-[1.3]"
            />
        </NuxtLink>
    </article>
</template>

<script setup lang="ts">
import OpenIcon from '@/assets/icons/open.svg';
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';

defineProps({
    blog: {
        type: Object as PropType<BlogLite>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
