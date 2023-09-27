import type { AppProps } from 'next/app';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

import '@/assets/css/main.css';
import '@/assets/css/reset.css';
import '@/assets/css/transition.css';
import { EpisodesProvider } from '@/context/EpisodeContext';
import { PlayerProvider } from '@/context/PlayerContext';

BCMSImageConfig.cmsOrigin =
  process.env.NEXT_PUBLIC_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.NEXT_PUBLIC_BCMS_API_PUBLIC_KEY_ID || '6436aded346e3258041e3557';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <EpisodesProvider>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </EpisodesProvider>
  );
}

export default MyApp;
