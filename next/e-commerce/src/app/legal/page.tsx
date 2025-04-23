import React from 'react';
import { Metadata } from 'next';
import { LegalEntry } from '@bcms-types/types/ts';
import { ContentManager } from '@/components/ContentManager';
import { bcmsPrivate } from '@/app/bcms-private';

const pageTitle = 'Legal - Moda';
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
    const legalEntries = (await bcmsPrivate.entry.getAll(
        'legal',
    )) as LegalEntry[];

    return (
        <div>
            <h1 className="sr-only">Legal page</h1>
            <div className="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
                <div className="container">
                    <div className="grid grid-cols-1 gap-6">
                        {legalEntries.map((entry, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border border-[#DBD9D5] p-6"
                                >
                                    <h2 className="text-[24px] leading-none tracking-[-1.4px] text-appGray-900 mb-5 md:text-[32px]">
                                        {entry.meta.en?.title}
                                    </h2>
                                    {entry.content.en && (
                                        <ContentManager
                                            items={entry.content.en}
                                            className="grid grid-cols-1 gap-4 leading-[1.5] tracking-[-4%] text-appGray-500 md:text-lg"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
