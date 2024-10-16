import React from 'react';
import { Metadata } from 'next';
import {
    ContactPageEntry,
    ContactPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { bcms } from '../bcms-client';
import { TopGradient } from '@/components/TopGradient';
import Form from './components/Form';

const pageTitle = 'Feel free to reach out to me - Insightfull Ink';
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
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    if (!contactPageEntry) {
        return notFound();
    }
    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    return (
        <div>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
                <div className="container">
                    <div className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12">
                        <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                            {contactPageMeta.title}
                        </h1>
                        <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none">
                            {contactPageMeta.subtitle}
                        </h2>
                    </div>
                </div>
                <TopGradient />
            </div>
            <Form />
        </div>
    );
};

export default ContactPage;
