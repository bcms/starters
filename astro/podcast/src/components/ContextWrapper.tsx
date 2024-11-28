import { type PropsWithChildren } from "react";
import { EpisodesProvider } from "../context/EpisodeContext";
import { PlayerProvider } from "../context/PlayerContext";

const ContextWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <EpisodesProvider>
    <PlayerProvider>
      {children}
    </PlayerProvider>
  </EpisodesProvider>;
};

export default ContextWrapper;
