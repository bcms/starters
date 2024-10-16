import React from 'react';
import { Metadata } from 'next';
import Hero from './components/Hero';
import Form from './components/Form';

const pageTitle = 'Contact - BrandCrafters';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const ContactPage: React.FC = async () => {
    return (
        <div>
            <Hero />
            <Form />
        </div>
    );
};

export default ContactPage;
