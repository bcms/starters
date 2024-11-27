import React, { useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import { useEpisodes } from '../context/EpisodeContext';
import { HomePageHero } from '../components/home-page/Hero';
import { HomePageEpisodes } from '../components/home-page/Episodes';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, episodes, bcms },
}) => {
    const { setEpisodes, setBcms } = useEpisodes();

    setBcms(bcms);

    useEffect(() => {
        setEpisodes(episodes);
    }, [episodes]);

    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - The Podium`}>
            <HomePageHero
                title={meta.hero_title}
                description={meta.hero_description}
                cover={meta.hero_cover_image}
                bcms={bcms}
                episodes={episodes?.slice(0, 3)}
            />
            <HomePageEpisodes
                title={meta.episodes_title}
                description={meta.episodes_description}
                bcms={bcms}
                episodes={episodes}
            />
        </PageWrapper>
    );
};

export default HomeTemplate;
