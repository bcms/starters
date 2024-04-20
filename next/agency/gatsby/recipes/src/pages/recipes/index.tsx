import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';

import { PageData, RecipeLight, RecipesPageData } from '@/types';
import { RecipesSearch } from '@/src/components/recipes/Search';
import { ContentManager } from '@/src/components/ContentManager';
import { RecipesDropdown } from '@/src/components/recipes/Dropdown';
import { RecipesCard } from '@/src/components/recipes/Card';
import { RecipesPagination } from '@/src/components/recipes/Pagination';
import { graphql } from 'gatsby';
import {
  RecipeCategoryEntryMeta,
  RecipeEntry,
  RecipeEntryMeta,
} from '@/bcms/types';
import { toLite } from '@/utils/toLite';

interface RecipesPageProps {
  data: PageData<RecipesPageData> & {
    recipes: {
      nodes: Array<{
        bcms: RecipeEntry;
      }>;
    };
  };
}
const RecipesPage: React.FC<RecipesPageProps> = ({
  data: { page, footer, header, recipes },
}) => {
  const liteRecipes = useMemo<RecipeLight[]>(() => {
    return recipes.nodes.map((node) => {
      const meta = node.bcms.meta.en as RecipeEntryMeta;
      return {
        title: meta.title,
        slug: meta.slug,
        cover: meta.cover_image,
        categories: meta.categories.map((i) => {
          const lite = toLite<
            RecipeCategoryEntryMeta,
            { recipesType: { meta: { en: RecipeCategoryEntryMeta } } }
          >(i as any);
          return lite.title || '';
        }),
        description: meta.description,
        popular: meta.popular,
      };
    });
  }, [recipes]);

  const recipesListDOM = useRef<HTMLDivElement | null>(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const [popularValue, setPopularValue] = useState<string>('');
  const [categoriesValue, setCategoriesValue] = useState<string>('');

  const [paginationPage, setPaginationPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(8);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const searchParam = urlParams.get('s');
  const popularParam = urlParams.get('p');
  const categoriesParam = urlParams.get('c');

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
      liteRecipes
        .filter((e) => e.popular)
        .reduce((acc, e) => {
          if (!acc.includes(e.title || '')) {
            acc.push(e.title || '');
          }
          return acc;
        }, [] as string[]) || []
    );
  }, [page]);

  const categoriesOptions = useMemo(() => {
    return (
      liteRecipes.reduce((acc, e) => {
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
      liteRecipes.filter((e) => {
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
          items={page.bcms.meta.en.headline}
          className="recipesPage--title text-xl leading-[1.2] font-medium text-center text-appGray-700 mb-8 md:text-3xl
          lg:text-[56px] lg:leading-[1.2] lg:mb-10"
        />
        <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] mb-8 max-w-[608px] mx-auto lg:gap-6 lg:mb-24">
          <RecipesSearch
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

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsRecipesPage {
      ...RecipesPage
    }
    recipes: allBcmsRecipe {
      nodes {
        bcms {
          meta {
            en {
              title
              slug
              seo {
                title
                description
              }
              extended_description {
                type
                name
                value
              }
              description {
                type
                name
                value
              }
              cover_image {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              cook_time
              popular
              ingredients {
                value
                name
                type
              }
              categories {
                recipeCategory {
                  meta {
                    en {
                      title
                      slug
                    }
                  }
                }
              }
              qa {
                question
                answer {
                  type
                  name
                  value
                }
              }
              steps {
                title
                description {
                  type
                  value
                  name
                }
                cover {
                  _id
                  caption
                  alt_text
                  height
                  name
                  src
                  svg
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
