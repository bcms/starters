<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="container pb-14 md:pb-20 lg:pb-[136px]">
      <div class="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          v-for="(blog, index) in data.page.blogs"
          :key="index"
          :card="blog"
          :style="{
            display: index < loadedBlogs ? '' : 'none',
          }"
        />
      </div>
      <button
        v-if="loadedBlogs < data.page.blogs.length"
        class="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
        @click="loadMore"
      >
        Load more
      </button>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp, useAsyncData } from 'nuxt/app';
import { BlogEntry, BlogEntryMeta } from '~~/bcms/types';
import { BlogsPageData, PageProps } from '~~/types';

const { data, error } = useAsyncData<PageProps<BlogsPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  // Get all Blog entries
  const blogs = (await ctx?.$bcms.entry.getAll({
    // Template name or ID
    template: 'blog',
  })) as BlogEntry[];
  return {
    header,
    footer,
    page: {
      blogs: blogs
        .map((e) => e.meta.en as BlogEntryMeta)
        .sort((a, b) => b.date - a.date),
    },
  };
});
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const loadedBlogs = ref(9);

const loadMore = () => {
  loadedBlogs.value += 9;
};

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: 'Blogs',
  }),
);
</script>
