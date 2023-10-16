import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  RecipeEntry,
  RecipesPageEntry,
  RecipesPageEntryMeta,
} from '@/bcms/types';
import { PageProps, RecipesPageData } from '@/types';
import { recipeToLight } from '@/utils/recipe';
import { GetStaticProps } from 'next';
import Search from '@/components/recipes/Search';
import ContentManager from '@/components/ContentManager';
import { RecipesDropdown } from '@/components/recipes/Dropdown';
import { useRouter } from 'next/router';
import RecipesCard from '@/components/recipes/Card';
import { RecipesPagination } from '@/components/recipes/Pagination';

const RecipesPage: React.FC<PageProps<RecipesPageData>> = ({
  header,
  page,
  footer,
}) => {
  const router = useRouter();
  const recipesListDOM = useRef<HTMLDivElement | null>(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const [popularValue, setPopularValue] = useState<string>('');
  const [categoriesValue, setCategoriesValue] = useState<string>('');

  const [paginationPage, setPaginationPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(8);

  const searchParam = router.query?.s as string | undefined;
  const popularParam = router.query?.p as string | undefined;
  const categoriesParam = router.query?.c as string | undefined;

  useEffect(() => {
    if (recipesListDOM.current) {
      recipesListDOM.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [paginationPage]);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setRecipesPerPage(recipesPerPage);
    }
    if (searchParam) {
      setSearchValue(searchParam);
    }
    if (popularParam) {
      setPopularValue(popularParam);
    }
    if (categoriesParam) {
      setCategoriesValue(categoriesParam);
    }
  }, []);

  const popularOptions = useMemo(() => {
    return (
      page.recipes
        .filter((e) => e.popular)
        .reduce((acc, e) => {
          if (!acc.includes(e.title)) {
            acc.push(e.title);
          }
          return acc;
        }, [] as string[]) || []
    );
  }, [page]);

  const categoriesOptions = useMemo(() => {
    return (
      page.recipes.reduce((acc, e) => {
        e.categories.forEach((category) => {
          if (!acc.includes(category)) {
            acc.push(category);
          }
        });
        return acc;
      }, [] as string[]) || []
    );
  }, [page]);

  const filteredRecipes = useMemo(() => {
    return (
      page.recipes.filter((e) => {
        let show = true;

        if (searchValue) {
          show =
            show &&
            `${e.title} ${e.description}`
              .toLowerCase()
              .includes(searchValue.toLowerCase());
        }

        if (popularValue) {
          show = show && !!e.popular && e.title === popularValue;
        }

        if (categoriesValue) {
          show = show && !!e.categories.find((i) => i === categoriesValue);
        }

        return show;
      }) || []
    );
  }, [searchValue, popularValue, categoriesValue]);

  const totalPaginationPages = useMemo(() => {
    return Math.ceil((filteredRecipes.length || 0) / recipesPerPage);
  }, [filteredRecipes, recipesPerPage]);

  const onPageChange = (num: number) => {
    setPaginationPage(num);
  };

  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="container pt-24 pb-8 md:pb-16 lg:pt-[104px] lg:pb-[120px]">
        <ContentManager
          item={page.meta.headline}
          className="recipesPage--title text-xl leading-[1.2] font-medium text-center text-appGray-700 mb-8 md:text-3xl
          lg:text-[56px] lg:leading-[1.2] lg:mb-10"
        />
        <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] mb-8 max-w-[608px] mx-auto lg:gap-6 lg:mb-24">
          <Search
            value={searchValue}
            static
            size="lg"
            showResults={false}
            className="col-span-2"
            onInput={(value) => setSearchValue(value)}
          />
          <RecipesDropdown
            value={popularValue}
            options={popularOptions}
            placeholder="Popular"
            onSelect={(value) => setPopularValue(value)}
          />
          <RecipesDropdown
            value={categoriesValue}
            options={categoriesOptions}
            placeholder="Categories"
            onSelect={(value) => setCategoriesValue(value)}
          />
        </div>
        {filteredRecipes.length > 0 ? (
          <div
            ref={recipesListDOM}
            className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-16"
          >
            {filteredRecipes
              .slice(
                (paginationPage - 1) * recipesPerPage,
                (paginationPage - 1) * recipesPerPage + recipesPerPage,
              )
              .map((recipe, index) => (
                <RecipesCard key={recipe.slug + index} card={recipe} />
              ))}
          </div>
        ) : (
          <div className="flex justify-center text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500">
            There are no recipes for the applied filters
          </div>
        )}
        <RecipesPagination
          atPage={paginationPage}
          pageCount={totalPaginationPages}
          className="flex items-center justify-center gap-x-2 mt-6 lg:mt-10 lg:gap-x-4 xl:mt-[72px]"
          onPageChange={(value) => onPageChange(value)}
        />
      </div>
    </PageWrapper>
  );
};

export default RecipesPage;

export const getStaticProps: GetStaticProps<
  PageProps<RecipesPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);

    const recipesPage = (await client.entry.get({
      template: 'recipes_page',
      entry: 'recipes',
    })) as RecipesPageEntry;

    if (!recipesPage) {
      throw new Error('Recipes page entry does not exist.');
    }

    const recipes = (await client.entry.getAll({
      template: 'recipe',
    })) as RecipeEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          meta: recipesPage.meta.en as RecipesPageEntryMeta,
          recipes: recipeToLight(recipes),
        },
      },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};
