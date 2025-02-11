import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ContentManager from '../components/ContentManager';
import { LegalPageContent } from '../types';

export interface LegalTemplateProps {
    pageContext: LegalPageContent;
}

const LegalTemplate: React.FC<LegalTemplateProps> = ({
    pageContext: { entries },
}) => {
    return (
        <PageWrapper title={`Legal - Moda`}>
            <h1 className="sr-only">Legal page</h1>
            <div className="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
                <div className="container">
                    <div className="grid grid-cols-1 gap-6">
                        {entries.map((entry, index) => {
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
        </PageWrapper>
    );
};

export default LegalTemplate;
