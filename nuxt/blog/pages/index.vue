<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.page.meta.hero" />
    <HomePageBlogsList :blogs="data.page.blogs" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BlogEntry, HomePageEntry, HomePageEntryMeta } from '~~/bcms/types';
import { PageProps, HomePageData } from '~~/types';
import { blogToLite } from '~~/utils/blog';
import { getHeaderAndFooter } from '~~/utils/page-data';

const { data, error } = useAsyncData<PageProps<HomePageData> | undefined>(
  'home',
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    // Get Home Page entry
    const homePage = (await ctx?.$bcms.entry.get({
      template: 'home_page',
      entry: 'home',
    })) as HomePageEntry;
    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }
    // Get all Blog entries
    const blogs = (await ctx?.$bcms.entry.getAll({
      template: 'blog',
    })) as BlogEntry[];
    return {
      header,
      footer,
      page: {
        // Return Home Page entry for `en` locale
        meta: homePage.meta.en as HomePageEntryMeta,
        // Return all Blogs which are not in Featured
        // section of the Home Page.
        blogs: blogs
          .filter(
            (blog) =>
              !homePage.meta.en?.hero.featured_blogs.find(
                (featuredBlog) =>
                  featuredBlog.meta.en?.slug === blog.meta.en?.slug,
              ),
          )
          .map((blog) => blogToLite(blog)),
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
    title: data.value?.page.meta.title,
  }),
);
</script>
