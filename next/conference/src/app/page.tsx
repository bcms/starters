import React from 'react';
import { bcms } from './bcms-client';
import { Metadata } from 'next';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalEntry,
} from '@bcms-types/types/ts';
import HomeHero from '@/components/home-page/Hero';
import HomeAbout from '@/components/home-page/About';
import HomeSpeakers from '@/components/home-page/Speakers';
import HomeSponsors from '@/components/home-page/Sponsors';
import HomeTickets from '@/components/home-page/Tickets';
import HomeAgenda from '@/components/home-page/Agenda';
import PageWrapper from '@/components/PageWrapper';
import 'swiper/css';

const pageTitle = 'Home - CONference';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const HomePage: React.FC = async () => {
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    return (
        <PageWrapper legal={legalEntries}>
            <HomeHero
                gallery={homePageMeta.hero_gallery}
                description={homePageMeta.hero_description}
                cover={homePageMeta.hero_cover_image}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeAbout
                title={homePageMeta.about_title}
                cover={homePageMeta.about_cover}
                description={homePageMeta.about_description}
                topics={homePageMeta.about_topics}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeSpeakers
                title={homePageMeta.speakers_title}
                description={homePageMeta.speakers_description}
                cover={homePageMeta.speakers_cover_image}
                speakers={homePageMeta.speakers}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeSponsors
                title={homePageMeta.sponsors_title}
                sponsors={homePageMeta.sponsors}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeTickets
                title={homePageMeta.tickets_title}
                description={homePageMeta.tickets_description}
                tickets={homePageMeta.tickets}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeAgenda
                title={homePageMeta.agenda_title}
                days={homePageMeta.agenda_days}
            />
        </PageWrapper>
    );
};

export default HomePage;
