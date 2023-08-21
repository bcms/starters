import type { AppProps } from 'next/app';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';
// import 'tailwindcss/tailwind.css'
import '~/assets/css/main.css'
import '~/assets/css/reset.css'
import '~/assets/css/transition.css'
import '~/assets/css/prose.css'

BCMSImageConfig.cmsOrigin =
    process.env.NEXT_PUBLIC_BCMS_API_ORIGIN ||
    'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
    process.env.NEXT_PUBLIC_BCMS_API_PUBLIC_KEY_ID || '6433b6994c02e25452a8a947';

BCMSImageConfig.localeImageProcessing = true

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
