import { PageData } from '@/types';
import React from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import ArchWithStar from '@/src/components/ArchWithStar';
import { ContentManager } from '@/src/components/ContentManager';
import { EventsPageEventCard } from '@/src/components/events-page/EventCard';
import { useLocation } from '@reach/router';
import { EventEntryMeta, EventsPageEntryMeta } from '@/bcms/types';
import { graphql } from 'gatsby';

interface EventsPageProps {
  data: PageData<{ meta: { en: EventsPageEntryMeta } }> & {
    events: {
      nodes: Array<{
        bcms: {
          meta: {
            en: EventEntryMeta;
          };
        };
      }>;
    };
  };
}
const EventsPage: React.FC<EventsPageProps> = ({ data }) => {
  const location = useLocation();

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
          <div className="relative px-4 max-w-[400px] mx-auto mb-10 lg:max-w-[745px] lg:mb-20 xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-6 lg:text-5xl lg:leading-none">
              {data.page.bcms.meta.en.title}
            </h1>
            <ContentManager
              items={data.page.bcms.meta.en.description}
              className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base
                    lg:leading-[1.3]"
            />
          </div>
        </div>
        <div className="container">
          {data.events.nodes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {data.events.nodes.map((item, index) => (
                <EventsPageEventCard key={index} card={item.bcms.meta.en} />
              ))}
            </div>
          ) : (
            <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
              No events
            </div>
          )}
        </div>
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

    page: bcmsEventsPage {
      ...EventsPage
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
  }
`;

export default EventsPage;
