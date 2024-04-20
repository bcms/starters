import type { AppProps } from 'next/app';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

import '@/assets/css/main.css';
import '@/assets/css/fonts.css';
import '@/assets/css/reset.css';
import '@/assets/css/transition.css';
import '@/assets/css/prose.css';

import { CartProvider } from '@/context/CartContext';

BCMSImageConfig.cmsOrigin =
  process.env.NEXT_PUBLIC_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.NEXT_PUBLIC_BCMS_API_PUBLIC_KEY_ID || '650c066e93cfd8229365ed18';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
