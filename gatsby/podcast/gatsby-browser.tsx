import './src/assets/css/main.css';
import './src/assets/css/reset.css';
import './src/assets/css/transition.css';

import React from 'react';
import { PlayerProvider } from './src/context/PlayerContext';
import { EpisodesProvider } from './src/context/EpisodeContext';

export const wrapRootElement = ({ element }) => {
  return (
    <EpisodesProvider>
      <PlayerProvider>{element}</PlayerProvider>
    </EpisodesProvider>
  );
};
