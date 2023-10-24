import { HomeEventsGroup, EventEntryMeta } from '@/bcms/types';
import React from 'react';
import HomePageDivider from '@/components/home-page/Divider';
import ContentManager from '@/components/ContentManager';
import EventsPageEventCard from '@/components/events-page/EventCard';
interface HomepageEventsProps {
  data: HomeEventsGroup;
  items: EventEntryMeta[];
}

const HomepageEvents: React.FC<HomepageEventsProps> = ({ data, items }) => {
  return (
    <section className="overflow-hidden">
      <div className="container">
        <div className="flex flex-col items-center mb-8 lg:mb-20">
          <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
            [ 5 ]
          </div>
          <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
            {data.title}
          </h2>
          <ContentManager
            item={data.description}
            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto
                    mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
          />
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {items.map((item, index) => (
              <EventsPageEventCard key={index} card={item} />
            ))}
          </div>
        ) : (
          <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
            No events
          </div>
        )}
      </div>
      <HomePageDivider arc />
    </section>
  );
};

export default HomepageEvents;
