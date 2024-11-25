import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { EventsPageContent } from '../types';
import ArchWithStar from '../components/ArchWithStar';
import ContentManager from '../components/ContentManager';
import { EventCard } from '../components/events-page/EventCard';

export interface EventsTemplateProps {
    pageContext: EventsPageContent;
}

const EventsTemplate: React.FC<EventsTemplateProps> = ({
    pageContext: { meta, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Tastyyy`}>
            <div>
                <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
                    <div className="container max-w-[1198px]">
                        <ArchWithStar />
                        <div className="relative px-4 max-w-[400px] mx-auto mb-10 lg:max-w-[745px] lg:mb-20 xl:px-0">
                            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-6 lg:text-5xl lg:leading-none">
                                {meta.title}
                            </h1>
                            <ContentManager
                                items={meta.description.nodes}
                                className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base
                    lg:leading-[1.3]"
                            />
                        </div>
                    </div>
                    <div className="container">
                        {meta.events.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                                {meta.events.map((item, index) => (
                                    <EventCard
                                        key={index}
                                        card={item}
                                        bcmsConfig={bcms}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
                                No events
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PageWrapper>
    );
};

export default EventsTemplate;
