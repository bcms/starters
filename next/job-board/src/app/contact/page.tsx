import React from 'react';
import { Metadata } from 'next';
import {
    ContactPageEntry,
    ContactPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { bcms } from '../bcms-client';
import ContentManager from '@/components/ContentManager';
import Form from './components/Form';

const pageTitle = "Let's talk! - Hospitale";
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
    const contactPageEntry = (await bcms.entry.getBySlug(
        'lets-talk',
        'contact-page',
    )) as ContactPageEntry;
    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    return (
        <div className="pt-8 pb-14 md:py-20 lg:py-[120px]">
            <div className="container">
                <div className="max-w-[632px] mx-auto">
                    <h1 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-4 md:text-3xl md:leading-none lg:text-[80px] lg:leading-none lg:mb-5">
                        {contactPageMeta.title}
                    </h1>
                    <ContentManager
                        items={contactPageMeta.description.nodes}
                        className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 max-w-[446px] mx-auto mb-12 lg:text-base lg:leading-normal lg:mb-[88px]"
                    />
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
