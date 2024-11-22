import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import HomeHero from '../components/home-page/Hero';
import HomeAbout from '../components/home-page/About';
import HomeSpeakers from '../components/home-page/Speakers';
import HomeSponsors from '../components/home-page/Sponsors';
import HomeTickets from '../components/home-page/Tickets';
import HomeAgenda from '../components/home-page/Agenda';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, legalEntries, bcms },
}) => {
    return (
        <PageWrapper title={`Home - CONference`} legal={legalEntries}>
            <HomeHero
                gallery={meta.hero_gallery}
                description={meta.hero_description}
                cover={meta.hero_cover_image}
                bcmsConfig={bcms}
            />
            <HomeAbout
                title={meta.about_title}
                cover={meta.about_cover}
                description={meta.about_description}
                topics={meta.about_topics}
                bcmsConfig={bcms}
            />
            <HomeSpeakers
                title={meta.speakers_title}
                description={meta.speakers_description}
                cover={meta.speakers_cover_image}
                speakers={meta.speakers}
                bcmsConfig={bcms}
            />
            <HomeSponsors
                title={meta.sponsors_title}
                sponsors={meta.sponsors}
                bcmsConfig={bcms}
            />
            <HomeTickets
                title={meta.tickets_title}
                description={meta.tickets_description}
                tickets={meta.tickets}
                bcmsConfig={bcms}
            />
            <HomeAgenda title={meta.agenda_title} days={meta.agenda_days} />
        </PageWrapper>
    );
};

export default HomeTemplate;
