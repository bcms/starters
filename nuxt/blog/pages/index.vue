<template>
    <div v-if="data">
        <HomePageHero
            :title="data.meta.hero_title"
            :subtitle="data.meta.hero_subtitle"
            :blogs="featuredBlogs"
            :bcms="data.bcms"
        />
        <section class="pb-8 md:pb-20 lg:pb-[104px]">
            <div class="container">
                <div
                    class="flex items-center justify-between mb-6 md:mb-8 lg:mb-10"
                >
                    <h2
                        class="leading-none font-medium tracking-[-0.41px] md:text-lg md:leading-none lg:text-[32px] lg:leading-none"
                    >
                        Recent post
                    </h2>
                    <NuxtLink
                        to="/blog"
                        class="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
                    >
                        <span
                            class="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none"
                        >
                            See all posts
                        </span>
                        <SvgoArrow
                            filled
                            :font-controlled="false"
                            class="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
                        />
                    </NuxtLink>
                </div>
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
        </section>
    </div>
</template>

<script setup lang="ts">
import type { HomePageResponse } from '~/server/api/home-page';

const { setOgHead } = useHeadTags();

const { data, error } = await useFetch<HomePageResponse>('/api/home-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const featuredBlogs = computed(() => {
    return (
        data.value?.meta.featured_blogs.map((blog) => blogToLite(blog)) || []
    );
});

useHead(() =>
    setOgHead({
        title: 'A Fashionable Journey Around the World - Insightfull Ink',
    }),
);
</script>
