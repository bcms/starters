import React, { useMemo } from 'react';
import {
  HomeRecipesGroup,
  RecipeCategoryEntryMeta,
  RecipeEntryMeta,
} from '@/bcms/types';
import { RecipesSearch } from '@/src/components/recipes/Search';
import { RecipeLight } from '@/types';
import { Btn } from '@/src/components/Btn';
import { ReactComponent as ArrowIcon } from '@/src/assets/icons/arrow-right.svg';
import { RecipesCard } from '@/src/components/recipes/Card';
import { toLite } from '@/utils/toLite';

interface HomepageRecipesProps {
  data: HomeRecipesGroup;
}

export const HomePageRecipes: React.FC<HomepageRecipesProps> = ({ data }) => {
  const recipes = useMemo(() => {
    return data.recipes.map((e) => {
      const meta = toLite<
        RecipeEntryMeta,
        { recipe: { meta: { en: RecipeEntryMeta } } }
      >(e as any);
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
      } as RecipeLight;
    });
  }, [data]);

  return (
    <section className="py-8 lg:py-20 xl:pt-[128px] xl:pb-[120px]">
      <div className="container">
        <RecipesSearch
          recipes={recipes}
          static
          className="relative z-10 mb-8 lg:hidden"
        />
        <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-5 lg:text-2xl lg:mb-9 xl:text-4xl xl:mb-12">
          {data.title}
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 mb-8 lg:grid-cols-3 lg:mb-16 xl:gap-x-12 xl:gap-y-16">
          {recipes.map((card, index) => (
            <RecipesCard key={index} card={card} />
          ))}
        </div>
        <div className="flex justify-center">
          <Btn to="/recipes" theme="dark">
            <span className="mr-2">{data.cta_label}</span>
            <ArrowIcon className="w-[14px] h-[14px] lg:w-5 lg:h-5" />
          </Btn>
        </div>
      </div>
    </section>
  );
};
