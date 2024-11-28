import React, {
    createContext,
    type PropsWithChildren,
    useContext,
    useState,
} from 'react';
import type { ClientConfig } from '@thebcms/client';
import type { EpisodeEntryMetaItem } from '../../bcms/types/ts';

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
    const context = useContext(EpisodeContext);

    if (!context) {
        throw new Error('useEpisodes must be used within an EpisodesProvider');
    }

    return context;
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
