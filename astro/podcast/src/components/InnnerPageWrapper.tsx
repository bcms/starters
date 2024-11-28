import type { ClientConfig } from "@thebcms/client";
import { useEffect, type PropsWithChildren } from "react";
import type { EpisodeEntryMetaItem } from "../../bcms/types/ts";
import { useEpisodes } from "../context/EpisodeContext";

interface WrapperProps {
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[];
}

const InnerPageWrapper: React.FC<PropsWithChildren<WrapperProps>> = ({ bcms, episodes, children }) => {
    const { setEpisodes, setBcms } = useEpisodes();

    // Set BCMS configuration
    useEffect(() => {
        setBcms(bcms);
    }, [bcms]);

    // Set episodes
    useEffect(() => {
        setEpisodes(episodes);
    }, [episodes]);

    return <>{children}</>;
};


export default InnerPageWrapper;
