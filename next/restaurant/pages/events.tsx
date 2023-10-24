import { GetStaticProps } from 'next';
import { EventsPageData, PageProps } from '@/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  EventEntryMeta,
  EventsPageEntry,
  EventsPageEntryMeta,
} from '@/bcms/types';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';
import EventsPageEventCard from '@/components/events-page/EventCard';

const EventsPage: React.FC<PageProps<EventsPageData>> = ({
  footer,
  page,
  header,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto mb-10 lg:max-w-[745px] lg:mb-20 xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-6 lg:text-5xl lg:leading-none">
              {page.meta.title}
            </h1>
            <ContentManager
              item={page.meta.description}
              className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base
                    lg:leading-[1.3]"
            />
          </div>
        </div>
        <div className="container">
          {page.events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {page.events.map((item, index) => (
                <EventsPageEventCard key={index} card={item} />
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

export const getStaticProps: GetStaticProps<
  PageProps<EventsPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const eventsPage = (await client.entry.get({
      // Template name or ID
      template: 'events_page',
      // Entry slug or ID
      entry: 'events',
    })) as EventsPageEntry;
    if (!eventsPage) {
      throw new Error('Events page entry does not exist.');
    }
    const eventItems = (await client.entry.getAll({
      // Event item name or ID
      template: 'event',
    })) as EventsPageEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          meta: eventsPage.meta.en as EventsPageEntryMeta,
          events: eventItems.map((e) => e.meta.en) as EventEntryMeta[],
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default EventsPage;
