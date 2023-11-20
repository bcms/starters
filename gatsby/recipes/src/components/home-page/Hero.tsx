import { HomeHeroGroup } from '@/bcms/types';
import React from 'react';
import { ContentManager } from '@/src/components/ContentManager';
import { Btn } from '@/src/components/Btn';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore//@ts-ignore
import { ReactComponent as ArrowIcon } from '@/src/assets/icons/arrow-right.svg';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { RecipesSearch } from '@/src/components/recipes/Search';
import { RecipeLight } from '@/types';
interface HomepageHeroProps {
  data: HomeHeroGroup;
  recipes: RecipeLight[];
}

export const HomePageHero: React.FC<HomepageHeroProps> = ({
  data,
  recipes,
}) => {
  return (
    <section className="relative">
      <div className="container">
        <div className="relative pt-24 pb-6 md:pb-10 lg:pt-[250px] lg:pb-[88px]">
          <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <ContentManager
              items={data.title}
              className="homePage--hero-title text-xl leading-[1.2] font-medium text-white mb-3 md:text-3xl
                        lg:text-7xl lg:leading-[1.1] lg:mb-6"
            />
            <ContentManager
              items={data.description}
              className="text-xs leading-none font-medium text-white mb-6 md:text-sm lg:text-xl lg:leading-none
                        lg:mb-10"
            />
            <Btn to="/recipes">
              <span className="mr-2">{data.cta_label}</span>
              <ArrowIcon className="w-[14px] h-[14px] lg:w-5 lg:h-5" />
            </Btn>
          </div>
          <RecipesSearch
            recipes={recipes}
            className="absolute z-10 top-10 right-0 w-[300px] max-lg:hidden"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <BCMSImage
          media={data.cover}
          options={{
            sizes: {
              exec: [
                {
                  width: 750,
                  height: 516,
                },
                {
                  width: 1440,
                  height: 640,
                },
                {
                  width: 2880,
                  height: 1280,
                },
              ],
            },
          }}
          className="absolute top-0 left-0 w-full h-full cover position-top"
        />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E]/0" />
      </div>
    </section>
  );
};
