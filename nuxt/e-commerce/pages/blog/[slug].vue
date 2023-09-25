<template>
  <PageWrapper
    v-if="data"
    :header="data.header"
    :footer="data.footer"
    class="pt-2"
  >
    <div class="container pb-14 md:pb-20 lg:pb-[136px]">
      <div
        class="relative flex items-end p-4 min-h-[300px] max-w-full aspect-[2.47] mb-10 lg:p-12"
      >
        <div class="relative z-10">
          <div
            class="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-300 mb-2.5 md:text-lg"
          >
            <div>
              {{ formattedDate(data.page.meta.date) }}
            </div>
            <div class="w-1 h-1 rounded-full bg-current mt-1" />
            <div>By {{ data.page.meta.author.meta.en?.title }}</div>
          </div>
          <h1
            class="text-2xl leading-none tracking-[-2%] text-white mb-3 lg:text-[40px]"
          >
            {{ data.page.meta.title }}
          </h1>
        </div>
        <BCMSImage
          :media="data.page.meta.cover"
          :options="{
            sizes: {
              exec: [
                {
                  width: 640,
                },
                {
                  width: 1280,
                },
                {
                  width: 1600,
                },
              ],
            },
          }"
          class="absolute inset-0 cover"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      <div
        class="grid grid-cols-1 gap-10 items-start lg:grid-cols-[1fr,400px] lg:gap-16 xl:grid-cols-[1fr,600px]"
      >
        <ContentManager :item="data.page.content" class="blog--content" />
        <div class="border border-appGray-300 p-4 lg:p-8">
          <div
            class="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-6 lg:text-[24px] lg:flex-row"
          >
            <div>Others you may like</div>
            <NuxtLink to="/blog" class="underline"> See all </NuxtLink>
          </div>
          <div class="grid grid-cols-1 gap-8">
            <BlogCard
              v-for="(blog, index) in data.page.otherBlogs"
              :key="index"
              :card="blog"
            />
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { BCMSImage } from '~~/bcms-components';
import { BlogPageData, PageProps } from '~~/types';
import { BlogEntry, BlogEntryMeta } from '~~/bcms/types';

const route = useRoute();

const { data, error } = useAsyncData<PageProps<BlogPageData>>(
  `blog.${route.params.slug}`,
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Blog Page entry
    const blogPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'blog',
      // Entry slug or ID
      entry: route.params.slug,
    })) as BlogEntry;
    // Get all Blog entries
    const blogs = (await ctx?.$bcms.entry.getAll({
      // Template name or ID
      template: 'blog',
    })) as BlogEntry[];
    return {
      header,
      footer,
      page: {
        meta: blogPage.meta.en as BlogEntryMeta,
        content: blogPage.content.en as BCMSEntryContentParsedItem[],
        otherBlogs: blogs
          .filter((e) => e.meta.en?.slug !== blogPage.meta.en?.slug)
          .map((e) => e.meta.en as BlogEntryMeta)
          .sort((a, b) => b.date - a.date)
          .slice(0, 3),
      },
    };
  },
);
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const formattedDate = (date: number) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
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
