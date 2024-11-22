import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { AboutUsPageContent } from '../types';
import ContentManager from '../components/ContentManager';
import classNames from 'classnames';
import { BCMSImage } from '@thebcms/components-react';
import AboutUsTeam from '../components/about-us-page/Team';

export interface AboutUsTemplateProps {
    pageContext: AboutUsPageContent;
}

const AboutUsTemplate: React.FC<AboutUsTemplateProps> = ({
    pageContext: { meta, members, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Hospitale`}>
            <div className="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
                <BCMSImage
                    media={meta.cover_image}
                    clientConfig={bcms}
                    className={classNames(
                        'w-full aspect-[2.76] object-cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]',
                    )}
                />
                <div className="container">
                    <h1 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16">
                        {meta.title}
                    </h1>
                    <div
                        className={classNames(
                            'aboutUs--content [&_*]:inline text-center [&_strong]:text-[#48465f] [&_u]:text-[#191824]',
                            'mb-12 md:mb-20 lg:mb-[120px]',
                        )}
                    >
                        {meta.content.map((item, index) => (
                            <div key={index}>
                                {item.text && item.text.nodes.length > 0 && (
                                    <ContentManager
                                        items={item.text.nodes}
                                        className={classNames(
                                            'leading-normal font-medium tracking-[-0.41px] text-appGray-600',
                                            'lg:text-[32px] lg:leading-normal',
                                        )}
                                    />
                                )}
                                {item.image && (
                                    <BCMSImage
                                        key={index}
                                        media={item.image}
                                        clientConfig={bcms}
                                        className={classNames(
                                            'inline-block object-cover w-[37px] h-4 flex-shrink-0 mx-1 -translate-y-0.5 bg-center bg-cover',
                                            'lg:w-[112px] lg:h-12 lg:mx-3 lg:-translate-y-2',
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <AboutUsTeam
                    title={meta.team_title}
                    description={meta.team_description}
                    members={members}
                    bcmsConfig={bcms}
                />
            </div>
        </PageWrapper>
    );
};

export default AboutUsTemplate;
