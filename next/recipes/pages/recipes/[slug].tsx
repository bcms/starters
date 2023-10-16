import React, { useEffect, useMemo, useState } from 'react';
import { PageProps, RecipePageData } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { RecipeEntry, RecipeEntryMeta } from '@/bcms/types';
import { recipeToLight } from '@/utils/recipe';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { BCMSImage } from 'next-plugin-bcms/components';
import RecipesSearch from '@/components/recipes/Search';
import { RecipesDropdown } from '@/components/recipes/Dropdown';
import ContentManager from '@/components/ContentManager';
import { RecipesQAItem } from '@/components/recipes/QAItem';
import { RecipesIngredients } from '@/components/recipes/Ingredients';
import { RecipesSteps } from '@/components/recipes/Steps';
import RecipesCard from '@/components/recipes/Card';
import Link from 'next/link';

const RecipePage: React.FC<PageProps<RecipePageData>> = ({
  header,
  page,
  footer,
}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [popularValue, setPopularValue] = useState<string>('');
  const [categoriesValue, setCategoriesValue] = useState<string>('');

  const filterRedirect = (key: string, val: string) => {
    if (val) {
      void router.push(`/recipes/?${key}=${val}`);
    }
  };

  useEffect(() => {
    if (searchValue) {
      filterRedirect('s', searchValue);
    }

    if (popularValue) {
      filterRedirect('p', popularValue);
    }

    if (categoriesValue) {
      filterRedirect('c', categoriesValue);
    }
  }, [searchValue, popularValue, categoriesValue]);

  const recipeMeta = useMemo(() => {
    return page.meta;
  }, [page]);

  const similarRecipes = useMemo(() => {
    return page.similarRecipes || [];
  }, [page]);

  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="pb-10 md:pb-16 lg:pb-[120px]">
        <div className="pt-24 mb-8 md:pt-6 lg:pb-6 lg:border-b lg:border-[#F0F0F0] lg:mb-14">
          <div className="container">
            <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] lg:grid-cols-4 lg:gap-x-4">
              <RecipesSearch
                static
                size="lg"
                className="col-span-2"
                onEnter={(value) => setSearchValue(value)}
              />
              <RecipesDropdown
                value={popularValue}
                options={page.popular}
                placeholder="Popular"
                dropdownPosition="left"
                onSelect={(value) => setPopularValue(value)}
              />
              <RecipesDropdown
                value={categoriesValue}
                options={page.categories}
                placeholder="Categories"
                dropdownPosition="left"
                onSelect={(value) => setCategoriesValue(value)}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <BCMSImage
            media={recipeMeta.cover_image}
            options={{
              sizes: {
                exec: [
                  {
                    width: 768,
                    height: 768,
                  },
                  {
                    width: 1600,
                    height: 830,
                  },
                ],
              },
            }}
            className="aspect-square rounded-2xl overflow-hidden cover mb-5 md:aspect-[1.93] lg:mb-10"
          />
          <h1 className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-[40px] lg:leading-none lg:mb-6">
            {recipeMeta.title}
          </h1>
          <ContentManager
            item={recipeMeta.extended_description}
            className="recipePage--description text-sm leading-[1.55] font-medium tracking-[-0.41px] text-[#86838C] mb-6
                lg:text-lg lg:mb-8"
          />
          <div className="flex flex-wrap gap-3 mb-8 lg:gap-4">
            <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
              <span className="text-appGray-700">Total: </span>
              <span className="text-[#9C9C9C]">{recipeMeta.cook_time}</span>
            </div>
            <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
              <span className="text-appGray-700">Ingredients: </span>
              <span className="text-[#9C9C9C]">
                {recipeMeta.ingredients.length} items
              </span>
            </div>
            <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
              <span className="text-appGray-700">Steps: </span>
              <span className="text-[#9C9C9C]">
                {recipeMeta.steps.length} steps
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 mb-8 lg:mb-16">
            {recipeMeta.qa.map((item, index) => (
              <RecipesQAItem key={index} item={item} />
            ))}
          </div>
          <RecipesIngredients ingredients={recipeMeta.ingredients} />
          <RecipesSteps steps={recipeMeta.steps} />
          {similarRecipes.length > 0 && (
            <div>
              <div className="flex items-center justify-between leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-8 lg:text-2xl lg:leading-none lg:mb-12">
                <h2>Other recipes you may like</h2>
                <Link href="/recipes"> Show all </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:gap-x-16 lg:gap-y-[72px]">
                {similarRecipes.map((card, index) => (
                  <RecipesCard key={index} card={card} showTitleLayer={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default RecipePage;

interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const recipes = (await client.entry.getAll({
    template: 'recipe',
  })) as RecipeEntry[];
  const paths = recipes.map((recipe) => {
    const meta = recipe.meta.en as RecipeEntryMeta;
    return {
      params: {
        slug: meta.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps<RecipePageData>> = async (
  context: GetStaticPropsContext,
) => {
  try {
    const client = getBcmsClient();
    const { header, footer } = await getHeaderAndFooter(client);
    const recipeItem = (await client.entry.get({
      // Template name or ID
      template: 'recipe',
      // Entry slug or ID
      entry: context.params?.slug as string,
    })) as RecipeEntry;
    if (!recipeItem) {
      throw new Error('Recipe entry does not exist.');
    }
    const recipes = (await client.entry.getAll({
      // Template name or ID
      template: 'recipe',
    })) as RecipeEntry[];

    const similarRecipes = recipes.filter((e) => {
      const entryCategories =
        recipeItem.meta.en?.categories.map((i) => i.meta.en?.title) || [];
      const categories =
        e.meta.en?.categories.map((i) => i.meta.en?.title) || [];

      for (let i = 0; i < categories.length; i++) {
        if (
          entryCategories.includes(categories[i]) &&
          recipeItem.meta.en?.slug !== e.meta.en?.slug
        ) {
          return true;
        }
      }
      return false;
    });
    return {
      props: {
        header,
        footer,
        page: {
          meta: recipeItem.meta.en as RecipeEntryMeta,
          similarRecipes: recipeToLight(similarRecipes).slice(0, 6),
          popular:
            recipes
              .filter((e) => e.meta.en?.popular)
              .map((e) => e.meta.en?.title || '') || [],
          categories:
            recipes.reduce((acc, e) => {
              e.meta.en?.categories.forEach((category) => {
                const categoryTitle = category.meta.en?.title || '';

                if (!acc.includes(categoryTitle)) {
                  acc.push(categoryTitle);
                }
              });
              return acc;
            }, [] as string[]) || [],
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
