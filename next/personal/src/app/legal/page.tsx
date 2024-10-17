import React from 'react';
import { Metadata } from 'next';
import { LegalPageEntry } from '@bcms-types/types/ts';
import AnimatedTitle from '@/components/AnimatedTitle';
import ContentManager from '@/components/ContentManager';
import { bcms } from '../bcms-client';

const pageTitle = 'Home - Personal Website';
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
    const legalEntries = (await bcms.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];

    return (
        <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
            <div className="container">
                <AnimatedTitle
                    title="Legal Page"
                    className="mb-10 md:mb-20 lg:mb-[192px]"
                    titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                />
                <div className="grid grid-cols-1 gap-8 lg:gap-14">
                    {legalEntries.map((item, index) => (
                        <div
                            key={index}
                            className="lg:grid lg:grid-cols-[300px,1fr] lg:items-start lg:gap-[100px]"
                        >
                            <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px]">
                                {item.meta.en?.title}
                            </h2>
                            <ContentManager
                                items={item.content.en || []}
                                className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-[1.35] lg:text-appGray-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
