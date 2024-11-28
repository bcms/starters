import type { ClientConfig } from "@thebcms/client";
import type { EpisodeEntryMetaItem } from "../../../bcms/types/ts";
import ContextWrapper from "../ContextWrapper";
import InnerPageWrapper from "../InnnerPageWrapper";
import EpisodeContent from "./Content";
import { PlayingEpisode } from "../layout/PlayingEpisode";

interface Props {
    meta: EpisodeEntryMetaItem;
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[];
}

const EpisodePageWrapper: React.FC<Props> = ({
    meta,
    bcms,
    episodes,
}) => {
    return <ContextWrapper>
        <InnerPageWrapper bcms={bcms} episodes={episodes}>
            <EpisodeContent bcms={bcms} meta={meta} />
            <PlayingEpisode />
        </InnerPageWrapper>
    </ContextWrapper>;
};

export default EpisodePageWrapper;
