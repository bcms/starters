import type { AppProps } from 'next/app';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';
import gsap from 'gsap';

import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import '@/assets/css/main.css';
import '@/assets/css/reset.css';
import '@/assets/css/transition.css';
import '@/assets/css/fonts.css';

import 'swiper/css';
import 'swiper/css/pagination';

BCMSImageConfig.cmsOrigin =
  process.env.NEXT_PUBLIC_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.NEXT_PUBLIC_BCMS_API_PUBLIC_KEY_ID || '6426db7f153ad5151b28771c';

gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
