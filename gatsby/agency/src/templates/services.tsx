import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ServicesPageContent } from '../types';
import Hero from '../components/Hero';
import ContactBlock from '../components/ContactBlock';
import ServicesList from '../components/services-page/List';

export interface ServicesTemplateProps {
    pageContext: ServicesPageContent;
}

const ServicesTemplate: React.FC<ServicesTemplateProps> = ({
    pageContext: { meta, entries, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - BrandCrafters`}>
            <Hero
                title={meta.title}
                subtitle="Services"
                description={meta.description}
            />
            <ServicesList items={entries} bcmsConfig={bcms} />
            <ContactBlock
                title={meta.contact_title}
                description={meta.contact_description}
            />
        </PageWrapper>
    );
};

export default ServicesTemplate;
