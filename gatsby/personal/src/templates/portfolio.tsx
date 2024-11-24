import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { PortfolioPageContent } from '../types';
import ContentManager from '../components/ContentManager';
import { BCMSImage } from '@thebcms/components-react';

export interface PortfolioTemplateProps {
    pageContext: PortfolioPageContent;
}

const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
    pageContext: { meta, bcms },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Personal Website`}
        >
            {' '}
            <div className="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
                <div className="relative mb-4 lg:mb-6">
                    <div className="py-6">
                        <div className="container">
                            <div className="relative z-10 aspect-[1.23] md:aspect-[1.95]">
                                <h1 className="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none">
                                    {meta.title}
                                </h1>
                                <div className="flex items-end justify-between gap-5 h-full">
                                    <div className="flex flex-col">
                                        <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                            Project
                                        </div>
                                        <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                            {meta.project_no.padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                            Brand name
                                        </div>
                                        <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                            {meta.brand_name}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                            Role
                                        </div>
                                        <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                            {meta.role}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                            Year
                                        </div>
                                        <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                            {new Date(
                                                meta.date.timestamp,
                                            ).getFullYear()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 size-full">
                        <BCMSImage
                            media={meta.gallery[0]}
                            clientConfig={bcms}
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-appText/80" />
                </div>
                <div className="container">
                    <ContentManager
                        items={meta.description.nodes}
                        className="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
                    />
                    <div className="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
                        {meta.gallery.slice(1).map((image, index) => (
                            <BCMSImage
                                key={index}
                                media={image}
                                clientConfig={bcms}
                                className="portfolioItemPage--galleryImage w-full object-cover h-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PortfolioTemplate;
