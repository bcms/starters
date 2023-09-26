import { EpisodeEntryMeta, HomeEpisodesGroup } from '@/bcms/types';
import React from 'react';
import ContentManager from '@/components/ContentManager';
import EpisodesItem from '@/components/episodes/Item';
interface HomepageEpisodesProps {
  data: HomeEpisodesGroup;
  episodes: EpisodeEntryMeta[];
}

const HomepageEpisodes: React.FC<HomepageEpisodesProps> = ({
  data,
  episodes,
}) => {
  return (
    <section
      id="episodes"
      className="relative pt-8 pb-10 lg:pt-[151px] lg:pb-[128px]"
    >
      <div className="container max-w-[1229px]">
        <ContentManager
          item={data.title}
          className="homeEpisodes--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center
                mb-1 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4"
        />
        <ContentManager
          item={data.description}
          className="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto mb-8
                lg:text-xl lg:leading-none lg:max-w-none lg:mb-16"
        />
        <div className="grid grid-cols-1 rounded-2xl bg-[#383838]/80 overflow-hidden space-y-px">
          {episodes.map((episode, index) => (
            <EpisodesItem
              key={index}
              item={episode}
              index={index + 1}
              className="bg-appBody"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageEpisodes;
