import { BCMSImageConfig } from '@becomes/cms-most/frontend';
import React, { FC, PropsWithChildren } from 'react';
import { PageData } from '@/types';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { Helmet } from 'react-helmet';

BCMSImageConfig.cmsOrigin =
  process.env.GATSBY_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.GATSBY_BCMS_API_PUBLIC_KEY || '650c066e93cfd8229365ed18';

BCMSImageConfig.localeImageProcessing = true;

export const PageWrapper: FC<PropsWithChildren<PageData<any>>> = ({
  location,
  page,
  children,
  header,
  footer,
  defaultTitle,
}) => {
  const title =
    defaultTitle ??
    page?.bcms.meta?.en.title ??
    page?.bcms.meta?.en.seo?.title ??
    '';

  const description =
    page?.bcms.meta?.en.seo?.description ??
    'Jumpstart your Gatsby project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
  const image = '/thumbnail.jpg';
  const domain = 'https://recipes-starter.thebcms.com';

  return (
    <div className="overflow-hidden">
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <title>{title} - Moda</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - Moda`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="ogUrl" property="og:url" content={`${domain}${location}`} />
        <meta property="og:title" content={`${title} - Moda`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${location}`} />
        <meta property="twitter:title" content={`${title} - Moda`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header data={header.bcms.meta.en} />
      <main>{children}</main>
      <Footer data={footer.bcms.meta.en} />
    </div>
  );
};
