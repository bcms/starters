import type { EpisodeEntryMetaItem } from '~/bcms/type/ts';

export const useEpisodes = () => {
    const episodes = useState<EpisodeEntryMetaItem[]>('episodes', () => []);

    const setEpisodes = (val: EpisodeEntryMetaItem[]) => {
        episodes.value = val;
    };

    return {
        episodes,
        setEpisodes,
    };
};
