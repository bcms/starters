import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { PortfolioPageContent } from '../types';
import Hero from '../components/Hero';
import ContactBlock from '../components/ContactBlock';
import PortfolioList from '../components/portfolio-page/List';

export interface PortfolioTemplateProps {
    pageContext: PortfolioPageContent;
}

const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
    pageContext: { meta, entries, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - BrandCrafters`}>
            <Hero
                title={meta.title}
                subtitle="Portfolio"
                description={meta.description}
            />
            <PortfolioList items={entries} bcmsConfig={bcms} />
            <ContactBlock
                title={meta.contact_title}
                description={meta.contact_description}
            />
        </PageWrapper>
    );
};

export default PortfolioTemplate;
