import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ContactHero from '../components/contact-page/Hero';
import ContactForm from '../components/contact-page/Form';

const ContactTemplate: React.FC = () => {
    return (
        <PageWrapper title={`Contact - BrandCrafters`}>
            <ContactHero />
            <ContactForm />
        </PageWrapper>
    );
};

export default ContactTemplate;
