import React from 'react';
import { Metadata } from 'next';
import { bcms } from '../bcms-client';
import { LegalPageEntry, LegalPageEntryMetaItem } from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import ContentManager from '@/components/ContentManager';

const pageTitle = 'Legal - BrandCrafters';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const LegalPage: React.FC = async () => {
    const legalPageEntry = (await bcms.entry.getBySlug(
        'legal',
        'legal-page',
    )) as LegalPageEntry;

    if (!legalPageEntry) {
        return notFound();
    }

    const legalPageMeta = legalPageEntry.meta.en as LegalPageEntryMetaItem;

    return (
        <div className="mt-6 md:mt-10 lg:mt-[76px]">
            <div className="container">
                <h1 className="font-bold leading-none tracking-[-0.32px] text-center mb-8 md:text-3xl md:leading-none md:mb-14 lg:font-Inter lg:font-medium lg:text-5xl lg:leading-none lg:tracking-[-0.96px] lg:mb-20">
                    {legalPageMeta.title}
                </h1>
                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                    {legalPageMeta.blocks.map((block, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4 p-6 rounded-lg"
                            style={{
                                boxShadow:
                                    '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                            }}
                        >
                            <h2 className="text-sm font-bold leading-[1.1] tracking-[-0.28px] lg:text-2xl lg:leading-[1.1] lg:tracking-[-0.48px]">
                                {block.title}
                            </h2>
                            <ContentManager
                                items={block.description.nodes}
                                className="text-appGray-200 text-xs font-medium leading-[1.4] tracking-[-0.24px] lg:text-xl lg:leading-[1.4] lg:tracking-[-0.4px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
