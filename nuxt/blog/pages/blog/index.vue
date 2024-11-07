<template>
    <div v-if="data">
        <div
            class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]"
        >
            <div class="container">
                <div>
                    <div
                        class="flex flex-col-reverse items-center text-center mb-8 md:gap-4 md:mb-10 lg:mb-12"
                    >
                        <h1
                            class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
                        >
                            {{ data.meta.title }}
                        </h1>
                        <h2
                            class="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
                        >
                            {{ data.meta.subtitle }}
                        </h2>
                    </div>
                    <div class="max-w-[848px] mx-auto">
                        <Search v-model="searchVal" class="mb-3 lg:mb-6" />
                        <div
                            class="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5 lg:gap-[18px]"
                        >
                            <button
                                v-for="(category, index) in categories"
                                :key="index"
                                class="flex items-center justify-center w-full px-6 py-2.5 rounded-[32px] border transition-colors duration-300 text-xs leading-none tracking-[-0.41px] capitalize md:text-lg md:leading-none md:py-3 lg:text-2xl lg:leading-none lg:px-6 lg:py-[14px]"
                                :class="
                                    category === selectedCategory
                                        ? 'border-appText bg-appText text-white'
                                        : 'border-[#E0E0E0]'
                                "
                                @click="selectedCategory = category"
                            >
                                {{ category.toLowerCase() }}
                            </button>
                            <button
                                :class="`col-span-2 flex items-center justify-center w-full px-6 py-2.5 rounded-[32px] border transition-colors duration-300 text-xs leading-none tracking-[-0.41px] md:col-span-1 md:col-start-1 md:row-start-1 md:text-lg md:leading-none md:py-3 lg:text-2xl lg:leading-none lg:px-6 lg:py-[14px], ${
                                    selectedCategory === ''
                                        ? 'border-appText bg-appText text-white'
                                        : 'border-[#E0E0E0]'
                                }`"
                                @click="selectedCategory = ''"
                            >
                                All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TopGradient />
        </div>
        <div class="container mb-8 md:mb-20 lg:mb-[104px]">
            <div
                v-if="filteredBlogs.length > 0 && selectedCategory"
                class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 md:mb-20 lg:grid-cols-3 xl:gap-10 lg:mb-[128px]"
            >
                <BlogsCard
                    v-for="blog in filteredBlogs"
                    :key="blog.slug"
                    :blog="blog"
                    :bcms="data.bcms"
                />
            </div>
            <div
                v-else-if="!filteredBlogs.length && selectedCategory"
                class="leading-none tracking-[-0.41px] text-center mb-8 md:mb-20 lg:text-lg lg:mb-[128px]"
            >
                There are no blogs for the applied filter in "{{
                    selectedCategory.toLowerCase()
                }}"
            </div>
            <div>
                <h2
                    class="leading-none font-medium tracking-[-0.41px] mb-7 md:text-2xl md:leading-none md:mb-10 lg:text-[32px] lg:leading-none lg:mb-12"
                >
                    All posts
                </h2>
                <div
                    class="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8"
                >
                    <BlogsCard
                        v-for="(blog, index) in data.blogs"
                        :key="index"
                        :blog="blog"
                        :bcms="data.bcms"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogsPageResponse } from '~/server/api/blog/page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<BlogsPageResponse>('/api/blog/page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const searchVal = ref('');
const selectedCategory = ref('');

const categories = computed(() => {
    return data.value?.blogs.reduce((acc, e) => {
        if (e.category && !acc.includes(e.category)) {
            acc.push(e.category);
        }

        return acc;
    }, [] as string[]);
});

const filteredBlogs = computed(() => {
    return (
        data.value?.blogs.filter((blog) => {
            let show = true;

            if (searchVal.value) {
                show =
                    show &&
                    blog.title
                        .toLowerCase()
                        .includes(searchVal.value.toLowerCase());
            }
            if (selectedCategory.value) {
                show = show && blog.category === selectedCategory.value;
            }

            return show;
        }) || []
    );
});

useHead(() =>
    setOgHead({
        title: 'Happy reading for my amazing journey - Insightfull Ink',
    }),
);
</script>
