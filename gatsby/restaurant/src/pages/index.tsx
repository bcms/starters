import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { HomePageData, PageData } from '@/types';
import { PageWrapper } from '@/src/components/PageWrapper';
import { HomepageHero } from '@/src/components/home-page/Hero';
import { HomepageMenu } from '@/src/components/home-page/Menu';
import { HomePageSeasons } from '@/src/components/home-page/Seasons';
import { HomePageAmbience } from '@/src/components/home-page/Ambience';
import {
  EventEntryMeta,
  FoodItemEntryMeta,
  TestimonialEntryMeta,
} from '@/bcms/types';
import { HomePageSpecials } from '@/src/components/home-page/Specials';
import { HomePageEvents } from '@/src/components/home-page/Events';
import { HomePageTestimonials } from '@/src/components/home-page/Testimonials';

interface HomepageProps {
  data: PageData<HomePageData> & {
    specials: {
      nodes: Array<{
        bcms: {
          meta: {
            en: FoodItemEntryMeta;
          };
        };
      }>;
    };
    events: {
      nodes: Array<{
        bcms: {
          meta: {
            en: EventEntryMeta;
          };
        };
      }>;
    };
    testimonials: {
      nodes: Array<{
        bcms: {
          meta: {
            en: TestimonialEntryMeta;
          };
        };
      }>;
    };
  };
}

const HomePage: FC<HomepageProps> = ({ data }) => {
  const specials = data.specials.nodes
    .filter((node) => node.bcms.meta.en?.special)
    .map((node) => node.bcms.meta.en);

  const events = data.events.nodes.map((node) => node.bcms.meta.en);

  const testimonials = data.testimonials.nodes.map((node) => node.bcms.meta.en);
  return (
    <main>
      <PageWrapper {...data} location="/">
        <HomepageHero data={data.page.bcms.meta.en.hero} />
        <HomepageMenu data={data.page.bcms.meta.en.menu} />
        <HomePageSeasons data={data.page.bcms.meta.en.seasons} />
        <HomePageAmbience data={data.page.bcms.meta.en.ambience} />
        <HomePageSpecials
          data={data.page.bcms.meta.en.specials}
          items={specials}
        />
        <HomePageEvents data={data.page.bcms.meta.en.events} items={events} />
        <HomePageTestimonials
          data={data.page.bcms.meta.en.testimonials}
          items={testimonials}
        />
      </PageWrapper>
    </main>
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
    specials: allBcmsFoodItem {
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
    events: allBcmsEvent {
      nodes {
        bcms {
          meta {
            en {
              title
              description {
                name
                value
                type
              }
              date
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

    testimonials: allBcmsTestimonial {
      nodes {
        bcms {
          meta {
            en {
              title
              author {
                name
                avatar {
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
              quote {
                name
                value
                type
              }
            }
          }
        }
      }
    }
  }
`;

export default HomePage;
