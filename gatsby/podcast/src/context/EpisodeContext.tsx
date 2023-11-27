import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { EpisodeEntryMeta } from '@/bcms/types';

interface EpisodeContextI {
  episodes: EpisodeEntryMeta[];
  setEpisodes: React.Dispatch<React.SetStateAction<EpisodeEntryMeta[]>>;
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
  const [episodes, setEpisodes] = useState<EpisodeEntryMeta[]>([]);

  const value = {
    episodes,
    setEpisodes,
  };
  return (
    <EpisodeContext.Provider value={value}>
      {props.children}
    </EpisodeContext.Provider>
  );
}
