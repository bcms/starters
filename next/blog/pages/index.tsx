import React, { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { HomePageData, PageProps } from '@/types';
import { useHeadTags } from '@/composables/og-head';
import { PageWrapper } from '@/components/PageWrapper';
import { HomepageHero } from '@/components/home-page/Hero';
import { HomePageBlogsList } from '@/components/home-page/BlogList';
import { getHeaderAndFooter } from '@/utils/page-data';
import { getBcmsClient } from 'next-plugin-bcms';
import { BlogEntry, HomePageEntry, HomePageEntryMeta } from '@/bcms/types';
import { blogToLite } from '@/utils/blog';

const HomePage: FC<PageProps<HomePageData>> = (props) => {
  const { setOgHead } = useHeadTags();

  useEffect(() => {
    setOgHead({
      title: props.page?.meta?.title,
    });
  }, [props.page]);

  return (
    <PageWrapper {...props}>
      {props.page !== null && (
        <>
          <HomepageHero data={props.page.meta.hero} />
          <HomePageBlogsList blogs={props.page.blogs} />
        </>
      )}
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);
  // Get Home Page entry
  const homePage = (await client.entry.get({
    template: 'home_page',
    entry: 'home',
  })) as HomePageEntry;
  if (!homePage) {
    throw new Error('Home page entry does not exist.');
  }
  // Get all Blog entries
  const blogs = (await client.entry.getAll({
    template: 'blog',
  })) as BlogEntry[];
  return {
    props: {
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
    },
  };
};

export default HomePage;
