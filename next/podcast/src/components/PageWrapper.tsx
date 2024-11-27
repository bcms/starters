'use client';

import { useEpisodes } from '@/context/EpisodeContext';
import { EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import { PropsWithChildren, useEffect } from 'react';

interface Props {
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[];
}

const PageWrapper: React.FC<PropsWithChildren<Props>> = ({
    bcms,
    episodes,
    children,
}) => {
    const { setEpisodes, setBcms } = useEpisodes();

    setBcms(bcms);

    useEffect(() => {
        setEpisodes(episodes);
    }, [episodes]);

    return <div>{children}</div>;
};

export default PageWrapper;
