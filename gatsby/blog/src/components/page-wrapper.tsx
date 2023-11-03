import { BCMSImageConfig } from '@becomes/cms-most/frontend';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { PageData } from '../../types';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';
import { Helmet } from 'react-helmet';

BCMSImageConfig.cmsOrigin =
  process.env.GATSBY_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.GATSBY_BCMS_API_PUBLIC_KEY || '6433b6994c02e25452a8a947';

BCMSImageConfig.localeImageProcessing = true;

export const PageWrapper: FC<PropsWithChildren<PageData>> = ({
  page,
  children,
  header,
  footer,
}) => {
  const path = React.useState(window.location.pathname)[0];
  const routePath = useMemo(() => path, [path]);

  const title = (page?.bcms.meta?.en.title ?? '') + ' - Insightful Ink';
  const description =
    'Jumpstart your Gatsby project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
  const image = '/thumbnail.jpg';
  const domain = 'https://blog-starter.thebcms.com/';

  return (
    <div className="overflow-hidden">
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - Insightful Ink`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="ogUrl"
          property="og:url"
          content={`${domain}${routePath}`}
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content={`${title} - Insightful Ink`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${routePath}`} />
        <meta property="twitter:title" content={`${title} - Insightful Ink`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header data={header.bcms.meta.en} />
      <main>{children}</main>
      <Footer data={footer.bcms.meta.en} />
    </div>
  );
};
