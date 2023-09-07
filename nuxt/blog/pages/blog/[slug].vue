<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
      <div class="container">
        <div class="md:mb-20 lg:mb-[128px]">
          <div class="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
            <div
              class="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
            >
              {{ dateUtil.format(data.page.meta.date) }}
            </div>
            <h1
              class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
            >
              {{ data.page.meta.title }}
            </h1>
          </div>
          <BCMSImage
            :media="data.page.meta.cover"
            class="aspect-[2.07] rounded-lg overflow-hidden w-full cover mb-6 md:mb-8 lg:aspect-[2.43] lg:rounded-2xl lg:mb-12"
          />
          <ContentManager :item="data.page.content" class="prose" />
        </div>
        <div class="max-md:hidden">
          <div class="flex items-center justify-between mb-8 lg:mb-12">
            <h2
              class="text-lg leading-none font-medium tracking-[-0.41px] lg:text-[32px] lg:leading-none"
            >
              Other posts
            </h2>
            <NuxtLink
              to="/blog"
              class="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
            >
              <span
                class="leading-none tracking-[-0.41px] mr-2 lg:text-xl lg:leading-none"
              >
                See all posts
              </span>
              <ArrowIcon
                class="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
              />
            </NuxtLink>
          </div>
          <div
            class="grid grid-cols-2 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl lg:grid-cols-3 xl:gap-10 xl:p-8"
          >
            <BlogsCard
              v-for="(blog, index) in data.page.otherBlogs"
              :key="index"
              :blog="blog"
            />
          </div>
        </div>
      </div>
      <TopGradient />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { BCMSImage } from '~~/bcms-components';
import { BlogPageData, PageProps } from '~~/types';
import ArrowIcon from '@/assets/icons/arrow.svg';
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
          .slice(0, 3)
          .map((blog) => blogToLite(blog))
          .sort((a, b) => b.date - a.date),
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

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
