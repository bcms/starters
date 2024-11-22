import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import HomeHero from '../components/home-page/Hero';
import HomeAbout from '../components/home-page/About';
import HomeServices from '../components/home-page/Services';
import HomeCapabilities from '../components/home-page/Capabilities';
import HomeTeam from '../components/home-page/Team';
import ContactBlock from '../components/ContactBlock';
import {
    PortfolioEntryMetaItem,
    TeamMemberEntryMetaItem,
} from '../../bcms/types/ts';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - BrandCrafters`}>
            <HomeHero
                title={meta.hero_title}
                gallery={meta.hero_gallery_image}
                bcmsConfig={bcms}
            />
            <HomeAbout
                title={meta.about_title}
                subtitle={meta.about_subtitle}
                description={meta.about_description}
                cover={meta.about_cover_image}
                bcmsConfig={bcms}
            />
            <HomeServices
                title={meta.services_title}
                subtitle={meta.services_subtitle}
                cover={meta.services_cover_image}
                description={meta.services_description}
                bcmsConfig={bcms}
            />
            <HomeCapabilities
                title={meta.capabilities_title}
                subtitle={meta.capabilities_subtitle}
                description={meta.capabilities_description}
                portfolio_items={meta.capabilities_portfolio_items.map(
                    (e) => e.meta.en as PortfolioEntryMetaItem,
                )}
                bcmsConfig={bcms}
            />
            <HomeTeam
                title={meta.team_title}
                subtitle={meta.team_subtitle}
                description={meta.team_description}
                cover={meta.team_cover_image}
                members_title={meta.team_members_title}
                members_description={meta.team_members_description}
                members={meta.team_members.map(
                    (e) => e.meta.en as TeamMemberEntryMetaItem,
                )}
                bcmsConfigs={bcms}
            />
            <ContactBlock
                title={meta.contact_title}
                description={meta.contact_description}
            />
        </PageWrapper>
    );
};

export default HomeTemplate;
