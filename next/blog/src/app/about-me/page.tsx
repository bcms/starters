import React from 'react';
import { Metadata } from 'next';
import { AboutPageEntry, AboutPageEntryMetaItem } from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { TopGradient } from '@/components/TopGradient';
import { ContentManager } from '@/components/ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import { EntryContentParsedItem } from '@thebcms/types';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Me, Myself, and My World - Insightfull Ink';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const AboutPage: React.FC = async () => {
    const aboutPageEntry = (await bcmsPrivate.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;

    if (!aboutPageEntry) {
        return notFound();
    }
    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    return (
        <div>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
                <div className="container">
                    <div className="flex flex-col items-center text-center mb-8 md:mb-20 lg:mb-[134px]">
                        <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                            {aboutPageMeta.subtitle}
                        </div>
                        <h1 className="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6">
                            {aboutPageMeta.title}
                        </h1>
                        <ContentManager
                            items={aboutPageMeta.description.nodes}
                            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
                        />
                    </div>
                    <div className="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8">
                        <BCMSImage
                            media={aboutPageMeta.cover_image}
                            clientConfig={bcmsPublic.getConfig()}
                            className="w-full h-full bg-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
                    </div>
                    <ContentManager
                        items={
                            aboutPageEntry.content
                                .en as EntryContentParsedItem[]
                        }
                        className="prose"
                    />
                </div>
                <TopGradient />
            </div>
        </div>
    );
};

export default AboutPage;
