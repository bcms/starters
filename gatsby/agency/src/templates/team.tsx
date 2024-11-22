import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { TeamPageContent } from '../types';
import Hero from '../components/Hero';
import ContactBlock from '../components/ContactBlock';
import TeamList from '../components/team-page/List';

export interface TeamTemplateProps {
    pageContext: TeamPageContent;
}

const TeamTemplate: React.FC<TeamTemplateProps> = ({
    pageContext: { meta, entries, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - BrandCrafters`}>
            <Hero
                title={meta.title}
                subtitle="Team"
                description={meta.description}
            />
            <TeamList items={entries} bcmsConfig={bcms} />
            <ContactBlock
                title={meta.contact_title}
                description={meta.contact_description}
            />
        </PageWrapper>
    );
};

export default TeamTemplate;
