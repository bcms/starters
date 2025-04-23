import 'swiper/css';
import { EventsPageEntry, EventsPageEntryMetaItem } from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';
import { EventCard } from '@/components/events-page/EventCard';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const eventsPageEntry = (await bcmsPrivate.entry.getBySlug(
        'events',
        'events-page',
    )) as EventsPageEntry;

    if (!eventsPageEntry) {
        return notFound();
    }

    const eventsPageMeta = eventsPageEntry.meta.en as EventsPageEntryMetaItem;
    const pageTitle = `${eventsPageMeta.seo?.title || eventsPageMeta.title} - Tastyyy`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const EventsPage: React.FC = async () => {
    const eventsPageEntry = (await bcmsPrivate.entry.getBySlug(
        'events',
        'events-page',
    )) as EventsPageEntry;

    if (!eventsPageEntry) {
        return notFound();
    }

    const eventsPageMeta = eventsPageEntry.meta.en as EventsPageEntryMetaItem;

    return (
        <div>
            <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
                <div className="container max-w-[1198px]">
                    <ArchWithStar />
                    <div className="relative px-4 max-w-[400px] mx-auto mb-10 lg:max-w-[745px] lg:mb-20 xl:px-0">
                        <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-6 lg:text-5xl lg:leading-none">
                            {eventsPageMeta.title}
                        </h1>
                        <ContentManager
                            items={eventsPageMeta.description.nodes}
                            className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base
                    lg:leading-[1.3]"
                        />
                    </div>
                </div>
                <div className="container">
                    {eventsPageMeta.events.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                            {eventsPageMeta.events.map((item, index) => (
                                <EventCard
                                    key={index}
                                    card={item}
                                    bcmsConfig={bcmsPublic.getConfig()}
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
    );
};

export default EventsPage;
