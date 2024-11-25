import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { LegalPageContent } from '../types';
import ArchWithStar from '../components/ArchWithStar';
import ContentManager from '../components/ContentManager';

export interface LegalTemplateProps {
    pageContext: LegalPageContent;
}

const LegalTemplate: React.FC<LegalTemplateProps> = ({
    pageContext: { entries },
}) => {
    return (
        <PageWrapper title={`Legal - Tastyyy`}>
            <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
                <div className="container max-w-[1198px]">
                    <ArchWithStar />
                    <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[850px] xl:px-0">
                        <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-12 lg:text-5xl lg:leading-none lg:mb-20">
                            Legal
                        </h1>
                        <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
                            {entries.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-[#DBD9D5] rounded-[7px] p-6"
                                >
                                    <h2 className="leading-none tracking-[-0.41px] font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-5">
                                        {item.meta.en?.title}
                                    </h2>
                                    <ContentManager
                                        items={item.content.en || []}
                                        className="text-sm leading-normal tracking-[-0.41px] text-appGray-200 lg:text-lg lg:leading-normal"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
};

export default LegalTemplate;
