import { PageWrapper } from '@/components/PageWrapper';
import { HomePageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { HomePageEntry, HomePageEntryMeta, RecipeEntry } from '@/bcms/types';
import { recipeToLight } from '@/utils/recipe';
import HomePageHero from '@/components/home-page/Hero';
import React from 'react';
import HomepageRecipes from '@/components/home-page/Recipes';
import HomepageAboutUs from '@/components/home-page/AboutUs';
import HomepageLetsTalk from '@/components/home-page/LetsTalk';

const HomepageIndex: React.FC<PageProps<HomePageData>> = ({
  header,
  footer,
  page,
  defaultTitle,
}) => {
  return (
    <PageWrapper
      page={page}
      header={header}
      footer={footer}
      defaultTitle={defaultTitle}
    >
      <HomePageHero data={page.meta.hero} recipes={page.recipes} />
      <HomepageRecipes data={page.meta.recipes} />
      <HomepageAboutUs data={page.meta.about_us} />
      <HomepageLetsTalk data={page.meta.lets_talk} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    // Get Home Page entry
    const homePage = (await client.entry.get({
      template: 'home_page',
      entry: 'home',
    })) as HomePageEntry;
    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }
    // Get all Recipe entries
    const recipes = (await client.entry.getAll({
      template: 'recipe',
    })) as RecipeEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          meta: homePage.meta.en as HomePageEntryMeta,
          recipes: recipeToLight(recipes),
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default HomepageIndex;
