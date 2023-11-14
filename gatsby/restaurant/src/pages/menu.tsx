import React, { useMemo, useState } from 'react';
import { MenuPageData, PageData } from '@/types';
import { FoodItemEntryMeta, MealTypeEntryMeta } from '@/bcms/types';
import ArchWithStar from '@/src/components/ArchWithStar';
import classNames from 'classnames';
import { ContentManager } from '@/src/components/ContentManager';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { useLocation } from '@reach/router';
import { PageWrapper } from '@/src/components/PageWrapper';
import { graphql } from 'gatsby';
import { toLite } from '@/src/utils/toLite';

interface MenuPageProps {
  data: PageData<MenuPageData> & {
    mealTypes: {
      nodes: Array<{
        bcms: {
          meta: {
            en: MealTypeEntryMeta;
          };
        };
      }>;
    };
    foodItems: {
      nodes: Array<{
        bcms: {
          meta: {
            en: FoodItemEntryMeta;
          };
        };
      }>;
    };
  };
}
const MenuPage: React.FC<MenuPageProps> = ({ data }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeMealType, setActiveMealType] = useState<string>(
    queryParams.get('s') || 'breakfast',
  );

  const activeMealTypeDescription = useMemo(() => {
    return (
      data.mealTypes.nodes
        .map((node) => node.bcms.meta.en)
        .find((mealType) => mealType.title.toLowerCase() === activeMealType)
        ?.description || []
    );
  }, [activeMealType, data.page]);

  const filteredFoodItems = useMemo(() => {
    return (
      data.foodItems.nodes
        .map((node) => node.bcms.meta.en)
        .filter((item) => {
          return item.type.find((e: any) => {
            const type = toLite<
              MealTypeEntryMeta,
              { mealType: { meta: { en: MealTypeEntryMeta } } }
            >(e as any);
            return type.title.toLowerCase() === activeMealType;
          });
        }) || []
    );
  }, [activeMealType]);

  return (
    <PageWrapper
      page={data.page}
      header={data.header}
      footer={data.footer}
      location={location.pathname}
    >
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[745px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none">
              {data.page.bcms.meta.title}
            </h1>
            <div className="mb-10 lg:mb-20">
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-8 md:flex md:items-center md:justify-center lg:gap-4 lg:mb-10">
                {data.mealTypes.nodes.map((mealType, index) => (
                  <button
                    key={index}
                    className={classNames(
                      'flex justify-center w-full px-[18px] py-3 border rounded-[32px] transition-colors duration-300 lg:max-w-max',
                      {
                        'border-appAccent bg-appAccent text-appBody':
                          mealType.bcms.meta.en.title.toLowerCase() ===
                          activeMealType,
                        'border-appText':
                          mealType.bcms.meta.en.title.toLowerCase() !==
                          activeMealType,
                      },
                    )}
                    onClick={() =>
                      setActiveMealType(
                        mealType.bcms.meta.en.title.toLowerCase(),
                      )
                    }
                  >
                    <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                      {mealType.bcms.meta.en.title}
                    </span>
                  </button>
                ))}
              </div>
              <ContentManager
                items={activeMealTypeDescription}
                className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
              />
            </div>
          </div>
        </div>
        {filteredFoodItems.length > 0 ? (
          <div className="grid grid-cols-1">
            {filteredFoodItems.map((item) => (
              <div
                key={item.slug}
                className="relative px-6 py-[42px] md:py-20 lg:py-[130px]"
              >
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                  <h3 className="text-sm leading-none uppercase text-white font-Gloock max-w-[480px] mb-[14px] lg:text-[32px] lg:leading-none lg:mb-[18px]">
                    {item.title}
                  </h3>
                  <ContentManager
                    items={item.description}
                    className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[480px] mb-4 lg:text-base lg:leading-[1.3] lg:mb-6"
                  />
                  <div className="px-6 py-[13px] flex max-w-max bg-[#9BA58F] rounded-[32px] text-sm leading-none text-white tracking-[-0.41px] lg:px-[18px] lg:py-3 lg:text-sm lg:leading-none">
                    ${item.price}
                  </div>
                </div>
                <BCMSImage
                  media={item.cover}
                  options={{
                    sizes: {
                      exec: [
                        {
                          width: 750,
                          height: 444,
                        },
                        {
                          width: 1536,
                          height: 560,
                        },
                      ],
                    },
                  }}
                  className="absolute top-0 left-0 w-full h-full cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
            No menu item found
          </div>
        )}
      </section>
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

    page: bcmsMenuPage {
      ...MenuPage
    }
    mealTypes: allBcmsMealType {
      nodes {
        bcms {
          meta {
            en {
              title
              slug
              description {
                value
                name
                type
              }
              cover {
                _id
                alt_text
                caption
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
    foodItems: allBcmsFoodItem {
      nodes {
        bcms {
          meta {
            en {
              title
              description {
                value
                type
                name
              }
              price
              special
              cover {
                _id
                alt_text
                caption
                height
                name
                src
                svg
                width
              }
              day_available {
                items
                selected
              }
              type {
                mealType {
                  meta {
                    en {
                      title
                      description {
                        type
                        value
                        name
                      }
                      cover {
                        _id
                        alt_text
                        caption
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
              seasons {
                season {
                  meta {
                    en {
                      title
                      description {
                        type
                        value
                        name
                      }
                      cover {
                        _id
                        alt_text
                        caption
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
      }
    }
  }
`;

export default MenuPage;
