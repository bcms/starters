import React from 'react';
import { Metadata } from 'next';
import { bcms } from './bcms-client';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    PortfolioEntryMetaItem,
    TeamMemberEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import HomeHero from '@/components/home-page/Hero';
import HomeAbout from '@/components/home-page/About';
import HomeServices from '@/components/home-page/Services';
import HomeCapabilities from '@/components/home-page/Capabilities';
import HomeTeam from '@/components/home-page/Team';
import ContactBlock from '@/components/ContactBlock';

const pageTitle = 'Home - BrandCrafters';
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

    if (!homePageEntry) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    return (
        <div>
            <HomeHero
                title={homePageMeta.hero_title}
                gallery={homePageMeta.hero_gallery_image}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeAbout
                title={homePageMeta.about_title}
                subtitle={homePageMeta.about_subtitle}
                description={homePageMeta.about_description}
                cover={homePageMeta.about_cover_image}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeServices
                title={homePageMeta.services_title}
                subtitle={homePageMeta.services_subtitle}
                cover={homePageMeta.services_cover_image}
                description={homePageMeta.services_description}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeCapabilities
                title={homePageMeta.capabilities_title}
                subtitle={homePageMeta.capabilities_subtitle}
                description={homePageMeta.capabilities_description}
                portfolio_items={homePageMeta.capabilities_portfolio_items.map(
                    (e) => e.meta.en as PortfolioEntryMetaItem,
                )}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeTeam
                title={homePageMeta.team_title}
                subtitle={homePageMeta.team_subtitle}
                description={homePageMeta.team_description}
                cover={homePageMeta.team_cover_image}
                members_title={homePageMeta.team_members_title}
                members_description={homePageMeta.team_members_description}
                members={homePageMeta.team_members.map(
                    (e) => e.meta.en as TeamMemberEntryMetaItem,
                )}
                bcmsConfigs={bcms.getConfig()}
            />
            <ContactBlock
                title={homePageMeta.contact_title}
                description={homePageMeta.contact_description}
            />
        </div>
    );
};

export default HomePage;
