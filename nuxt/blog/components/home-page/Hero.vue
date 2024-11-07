<template>
    <section
        class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]"
    >
        <div class="container">
            <div
                class="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12"
            >
                <h1
                    class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
                >
                    {{ title }}
                </h1>
                <h2
                    class="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none"
                >
                    {{ subtitle }}
                </h2>
            </div>
            <Search
                v-model="searchValue"
                class="mb-8 md:mb-16 lg:mb-24"
                @enter="handleSearchEnter"
            />
            <div class="grid grid-cols-2 gap-4 auto-rows-fr md:gap-8 lg:gap-12">
                <NuxtLink
                    v-for="(blog, index) in blogs"
                    :key="index"
                    :to="`/blog/${blog.slug}`"
                    class="group relative rounded-lg overflow-hidden"
                    :class="[
                        index > 0 && index % 2 === 0
                            ? 'col-span-2'
                            : 'aspect-square lg:aspect-[1.17]',
                    ]"
                >
                    <div
                        class="relative z-10 flex flex-col p-4 h-full md:p-7 lg:p-10"
                    >
                        <h3
                            class="text-sm leading-none font-medium tracking-[-0.41px] text-white group-hover:underline md:text-xl md:leading-none lg:text-[32px] lg:leading-none"
                        >
                            {{ blog.title }}
                        </h3>
                        <div class="flex items-end justify-between mt-auto">
                            <ContentManager
                                :items="blog.description.nodes"
                                class="text-xs leading-[1.2] tracking-[-0.41px] text-white line-clamp-3 max-w-[150px] md:text-base md:leading-[1.2] md:max-w-[568px] lg:text-xl lg:leading-none"
                            />
                            <div
                                v-if="index > 0 && index % 2 === 0"
                                class="text-xs font-medium leading-none tracking-[-0.41px] text-appGray-200 md:text-base md:leading-none lg:text-xl lg:leading-none"
                            >
                                {{ dateUtil.format(blog.date) }}
                            </div>
                        </div>
                    </div>
                    <BCMSImage
                        :media="blog.cover"
                        :client="bcms"
                        class="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-black/40"
                    />
                </NuxtLink>
            </div>
        </div>
        <TopGradient class="max-md:hidden" />
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    blogs: {
        type: Array as PropType<BlogLite[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});

const searchValue = ref('');

const handleSearchEnter = () => {
    navigateTo(`/blog?s=${searchValue.value}`);
};
</script>
