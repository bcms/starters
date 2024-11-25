import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import HomeHero from '../components/home-page/Hero';
import HomeMenu from '../components/home-page/Menu';
import HomeSeasons from '../components/home-page/Seasons';
import HomeAmbience from '../components/home-page/Ambience';
import HomeSpecials from '../components/home-page/Specials';
import HomeEvents from '../components/home-page/Events';
import HomeTestimonials from '../components/home-page/Testimonials';
import { FoodItemEntryMetaItem } from '../../bcms/types/ts';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, foodItems, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Tastyyy`}>
            <HomeHero
                title={meta.hero_title}
                open_time={meta.hero_open_time}
                address={meta.hero_address}
                map={meta.hero_map_image}
                description={meta.description}
                bcmsConfig={bcms}
            />
            <HomeMenu
                title={meta.menu_title}
                description={meta.menu_description}
                meals={meta.menu_meals}
                bcmsConfig={bcms}
            />
            <HomeSeasons
                title={meta.seasons_title}
                description={meta.seasons_description}
                seasons={meta.seasons}
                bcmsConfig={bcms}
            />
            <HomeAmbience
                title={meta.ambience_title}
                description={meta.ambience_description}
                items={meta.ambience_items}
                bcmsConfig={bcms}
            />
            <HomeSpecials
                title={meta.specials_title}
                description={meta.specials_description}
                items={foodItems.map((e) => e.meta.en as FoodItemEntryMetaItem)}
                bcmsConfig={bcms}
            />
            <HomeEvents
                title={meta.events_title}
                description={meta.events_description}
                events={meta.events}
                bcmsConfig={bcms}
            />
            <HomeTestimonials
                title={meta.testimonials_title}
                description={meta.testimonials_description}
                testimonials={meta.testimonials}
                bcmsConfig={bcms}
            />
        </PageWrapper>
    );
};

export default HomeTemplate;
