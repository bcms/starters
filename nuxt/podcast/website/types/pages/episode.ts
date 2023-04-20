import { EpisodeEntryMeta } from "~~/bcms/types";

export interface EpisodePageData {
  meta: EpisodeEntryMeta;
}

export interface EpisodeWithSettings {
  episode: EpisodeEntryMeta;
  settings: {
    currentTime: number;
    isPlaying: boolean;
  };
}
