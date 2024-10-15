import React from 'react';
import { Metadata } from 'next';
import classnames from 'classnames';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    TeamMemberEntry,
    TeamMemberEntryMetaItem,
} from '@bcms-types/types/ts';
import { bcms } from '../bcms-client';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '@/components/ContentManager';
import Team from './components/Team';

const pageTitle = 'About Us - Hospitale';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const AboutUsPage: React.FC = async () => {
    const aboutUsPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;
    const aboutUsPageMeta = aboutUsPageEntry.meta.en as AboutPageEntryMetaItem;

    const teamMembers = (await bcms.entry.getAll(
        'team-member',
    )) as TeamMemberEntry[];
    const teamMembersMeta = teamMembers.map(
        (member) => member.meta.en as TeamMemberEntryMetaItem,
    );

    return (
        <div className="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
            <BCMSImage
                media={aboutUsPageMeta.cover_image}
                clientConfig={bcms.getConfig()}
                className={classnames(
                    'w-full aspect-[2.76] object-cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]',
                )}
            />
            <div className="container">
                <h1 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16">
                    {aboutUsPageMeta.title}
                </h1>
                <div
                    className={classnames(
                        'aboutUs--content [&_*]:inline text-center [&_strong]:text-[#48465f] [&_u]:text-[#191824]',
                        'mb-12 md:mb-20 lg:mb-[120px]',
                    )}
                >
                    {aboutUsPageMeta.content.map((item, index) => (
                        <div key={index}>
                            {item.text && item.text.nodes.length > 0 && (
                                <ContentManager
                                    items={item.text.nodes}
                                    className={classnames(
                                        'leading-normal font-medium tracking-[-0.41px] text-appGray-600',
                                        'lg:text-[32px] lg:leading-normal',
                                    )}
                                />
                            )}
                            {item.image && (
                                <BCMSImage
                                    key={index}
                                    media={item.image}
                                    clientConfig={bcms.getConfig()}
                                    className={classnames(
                                        'inline-block object-cover w-[37px] h-4 flex-shrink-0 mx-1 -translate-y-0.5 bg-center bg-cover',
                                        'lg:w-[112px] lg:h-12 lg:mx-3 lg:-translate-y-2',
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Team
                title={aboutUsPageMeta.team_title}
                description={aboutUsPageMeta.team_description}
                members={teamMembersMeta}
                bcmsConfig={bcms.getConfig()}
            />
        </div>
    );
};

export default AboutUsPage;
