import React, { useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { AboutPageContent } from '../types';
import { useEpisodes } from '../context/EpisodeContext';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../components/ContentManager';

export interface AboutTemplateProps {
    pageContext: AboutPageContent;
}

const AboutTemplate: React.FC<AboutTemplateProps> = ({
    pageContext: { meta, episodes, bcms },
}) => {
    const { setEpisodes, setBcms } = useEpisodes();

    setBcms(bcms);

    useEffect(() => {
        setEpisodes(episodes);
    }, [episodes]);

    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - The Podium`}>
            <div className="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
                <div className="relative aspect-square rounded overflow-hidden mb-6 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
                    <h1 className="absolute z-10 bottom-6 left-6 text-lg leading-none font-medium tracking-[-0.41px] lg:bottom-10 lg:left-10 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px]">
                        {meta.title}
                    </h1>
                    <BCMSImage
                        media={meta.cover_image}
                        clientConfig={bcms}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded overflow-hidden lg:rounded-2xl"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {meta.content.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 border border-appGray-600 rounded-2xl bg-appBody lg:p-8"
                        >
                            <ContentManager
                                items={item.nodes}
                                className="aboutPage--content"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default AboutTemplate;
