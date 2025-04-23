'use client';

import React, {
    createContext,
    type JSX,
    PropsWithChildren,
    useContext,
    useState,
} from 'react';
import { EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';

interface EpisodeContextI {
    episodes: EpisodeEntryMetaItem[];
    bcms: ClientConfig;
    setEpisodes: React.Dispatch<React.SetStateAction<EpisodeEntryMetaItem[]>>;
    setBcms: React.Dispatch<React.SetStateAction<ClientConfig>>;
}

const EpisodeContext = createContext<EpisodeContextI>(
    undefined as unknown as EpisodeContextI,
);

export function useEpisodes(): EpisodeContextI {
    return useContext(EpisodeContext);
}

export function EpisodesProvider(
    props: PropsWithChildren<unknown>,
): JSX.Element | null {
    const [episodes, setEpisodes] = useState<EpisodeEntryMetaItem[]>([]);
    const [bcms, setBcms] = useState<ClientConfig>({} as ClientConfig);

    const value = {
        episodes,
        setEpisodes,
        bcms,
        setBcms,
    };
    return (
        <EpisodeContext.Provider value={value}>
            {props.children}
        </EpisodeContext.Provider>
    );
}
