import React from 'react';
import { PortfolioEntry, PortfolioEntryMetaItem } from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '@/components/ContentManager';
import { bcms } from '@/app/bcms-client';
import { Metadata } from 'next';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const portfolioEntries = (await bcms.entry.getAll(
        'portfolio',
    )) as PortfolioEntry[];

    return portfolioEntries.map((entry) => {
        const meta = entry.meta.en as PortfolioEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const portfolioEntry = (await bcms.entry.getBySlug(
        params.slug,
        'portfolio',
    )) as PortfolioEntry;

    if (!portfolioEntry) {
        return notFound();
    }

    const portfolioEntryMeta = portfolioEntry.meta.en as PortfolioEntryMetaItem;
    const pageTitle = `${portfolioEntryMeta?.title} - Personal Website`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const PortfolioPage: React.FC<Props> = async ({ params }) => {
    const portfolioEntry = (await bcms.entry.getBySlug(
        params.slug,
        'portfolio',
    )) as PortfolioEntry;

    if (!portfolioEntry) {
        return notFound();
    }

    const portfolioEntryMeta = portfolioEntry.meta.en as PortfolioEntryMetaItem;

    return (
        <div className="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
            <div className="relative mb-4 lg:mb-6">
                <div className="py-6">
                    <div className="container">
                        <div className="relative z-10 aspect-[1.23] md:aspect-[1.95]">
                            <h1 className="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none">
                                {portfolioEntryMeta.title}
                            </h1>
                            <div className="flex items-end justify-between gap-5 h-full">
                                <div className="flex flex-col">
                                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                        Project
                                    </div>
                                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                        {portfolioEntryMeta.project_no.padStart(
                                            2,
                                            '0',
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                        Brand name
                                    </div>
                                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                        {portfolioEntryMeta.brand_name}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                        Role
                                    </div>
                                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                        {portfolioEntryMeta.role}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                                        Year
                                    </div>
                                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                                        {new Date(
                                            portfolioEntryMeta.date.timestamp,
                                        ).getFullYear()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 size-full">
                    <BCMSImage
                        media={portfolioEntryMeta.gallery[0]}
                        clientConfig={bcms.getConfig()}
                        className="size-full object-cover"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-appText/80" />
            </div>
            <div className="container">
                <ContentManager
                    items={portfolioEntryMeta.description.nodes}
                    className="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
                />
                <div className="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
                    {portfolioEntryMeta.gallery.slice(1).map((image, index) => (
                        <BCMSImage
                            key={index}
                            media={image}
                            clientConfig={bcms.getConfig()}
                            className="portfolioItemPage--galleryImage w-full object-cover h-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
