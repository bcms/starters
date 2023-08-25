import type { AppProps } from 'next/app';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';
import '@/assets/css/main.css';
import '@/assets/css/reset.css';
import '@/assets/css/transition.css';
import '@/assets/css/prose.css';
import React from 'react';

BCMSImageConfig.cmsOrigin =
  process.env.NEXT_PUBLIC_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.NEXT_PUBLIC_BCMS_API_PUBLIC_KEY_ID || '6433b6994c02e25452a8a947';

BCMSImageConfig.localeImageProcessing = true;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
