import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { LegalPageContent } from '../types';
import ContentManager from '../components/ContentManager';

export interface LegalTemplateProps {
    pageContext: LegalPageContent;
}

const LegalTemplate: React.FC<LegalTemplateProps> = ({
    pageContext: { entries },
}) => {
    return (
        <PageWrapper title={`Legal - Hospitale`}>
            <div className="pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-16 lg:pb-[120px]">
                <div className="container">
                    <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
                        <h1 className="sr-only">Legal page content</h1>
                        {entries.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border border-[#DBD9D5] rounded-[7px] p-6"
                                >
                                    <h2 className="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay mb-3 lg:text-[32px] lg:leading-none lg:mb-5">
                                        {item.meta.en?.title}
                                    </h2>
                                    <ContentManager
                                        items={item.content.en || []}
                                        className="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
                                    />
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
