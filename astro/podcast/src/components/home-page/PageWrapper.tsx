import type { ClientConfig } from "@thebcms/client";
import { HomePageHero } from "./Hero";
import { HomePageEpisodes } from "./Episodes";
import type { EpisodeEntryMetaItem, HomePageEntryMetaItem } from "../../../bcms/types/ts";
import ContextWrapper from "../ContextWrapper";
import { PlayingEpisode } from "../layout/PlayingEpisode";
import InnerPageWrapper from "../InnnerPageWrapper";

interface Props {
    meta: HomePageEntryMetaItem;
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[];
}

const HomePageWrapper: React.FC<Props> = ({
    meta,
    bcms,
    episodes,
}) => {
    return <ContextWrapper>
        <InnerPageWrapper bcms={bcms} episodes={episodes}>
            <HomePageHero
                title={meta.hero_title}
                description={meta.hero_description}
                cover={meta.hero_cover_image}
                bcms={bcms}
                episodes={episodes.slice(0, 3)}
            />
            <HomePageEpisodes
                title={meta.episodes_title}
                description={meta.episodes_description}
                bcms={bcms}
                episodes={episodes}
            />
            <PlayingEpisode />
        </InnerPageWrapper>
    </ContextWrapper>;
};

export default HomePageWrapper;
