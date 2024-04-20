import React, { useMemo, useState } from 'react';
import { PageData, SeasonalMenuPageData } from '@/types';

import { PageWrapper } from '@/src/components/PageWrapper';
import ArchWithStar from '@/src/components/ArchWithStar';
import classnames from 'classnames';
import { ContentManager } from '@/src/components/ContentManager';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { useLocation } from '@reach/router';
import { FoodItemEntryMeta, SeasonEntryMeta } from '@/bcms/types';
import { toLite } from '@/src/utils/toLite';
import { graphql } from 'gatsby';

interface SeasonalMenuPageProps {
  data: PageData<SeasonalMenuPageData> & {
    seasons: {
      nodes: Array<{
        bcms: {
          meta: {
            en: SeasonEntryMeta;
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
const SeasonalMenuPage: React.FC<SeasonalMenuPageProps> = ({ data }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeSeason, setActiveSeason] = useState<string>(
    queryParams.get('s') || 'spring',
  );

  const activeSeasonDescription = useMemo(() => {
    return (
      data.seasons.nodes
        .map((node) => node.bcms.meta.en)
        .find((season) => {
          return season.title.toLowerCase() === activeSeason;
        })?.description || []
    );
  }, [activeSeason, data.seasons]);

  const filteredFoodItems = useMemo(() => {
    return (
      data.foodItems.nodes
        .map((node) => node.bcms.meta.en)
        .filter((item: any) => {
          return item.seasons.find((e: any) => {
            const season = toLite<
              SeasonEntryMeta,
              { season: { meta: { en: SeasonEntryMeta } } }
            >(e);
            return season.title.toLowerCase() === activeSeason;
          });
        }) || []
    );
  }, [activeSeason, data.foodItems]);

  return (
    <PageWrapper
      location={location.pathname}
      page={data.page}
      header={data.header}
      footer={data.footer}
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
                {data.seasons.nodes
                  .map((node) => node.bcms.meta.en)
                  .map((season, index) => (
                    <button
                      key={index}
                      className={classnames(
                        'flex justify-center w-full px-[18px] py-3 border rounded-[32px] transition-colors duration-300 lg:max-w-max',
                        {
                          'border-appAccent bg-appAccent text-appBody':
                            season.title.toLowerCase() === activeSeason,
                          'border-appText':
                            season.title.toLowerCase() !== activeSeason,
                        },
                      )}
                      onClick={() =>
                        setActiveSeason(season.title.toLowerCase())
                      }
                    >
                      <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                        {season.title}
                      </span>
                    </button>
                  ))}
              </div>
              <ContentManager
                items={activeSeasonDescription}
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

    page: bcmsSeason {
      ...SeasonsPage
    }
    seasons: allBcmsSeason {
      nodes {
        bcms {
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

export default SeasonalMenuPage;
