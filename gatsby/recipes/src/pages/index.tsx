import React, { useMemo } from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import { graphql } from 'gatsby';
import { HomePageData, PageData } from '@/types';
import {
  RecipeCategoryEntryMeta,
  RecipeEntry,
  RecipeEntryMeta,
} from '@/bcms/types';
import { toLite } from '@/utils/toLite';
import { HomePageHero } from '@/src/components/home-page/Hero';
import { HomePageRecipes } from '@/src/components/home-page/Recipes';
import { HomePageAboutUs } from '@/src/components/home-page/AboutUs';
import { HomePageLetsTalk } from '@/src/components/home-page/LetsTalk';

interface HomepageIndexProps {
  data: PageData<HomePageData> & {
    recipes: {
      nodes: Array<{
        bcms: RecipeEntry;
      }>;
    };
  };
}
const HomepageIndex: React.FC<HomepageIndexProps> = ({ data }) => {
  const liteRecipes = useMemo(() => {
    return data.recipes.nodes.map((node) => {
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
  }, [data.recipes]);

  return (
    <PageWrapper page={data.page} header={data.header} footer={data.footer}>
      <HomePageHero data={data.page.bcms.meta.en.hero} recipes={liteRecipes} />
      <HomePageRecipes data={data.page.bcms.meta.en.recipes} />
      <HomePageAboutUs data={data.page.bcms.meta.en.about_us} />
      <HomePageLetsTalk data={data.page.bcms.meta.en.lets_talk} />
    </PageWrapper>
  );
};

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsHomePage {
      ...HomePage
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

export default HomepageIndex;
