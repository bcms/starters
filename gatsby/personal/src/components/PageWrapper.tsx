import { BCMSImageConfig } from '@becomes/cms-most/frontend';
import React, { FC, PropsWithChildren } from 'react';
import { PageData } from '@/types';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Helmet } from 'react-helmet';

BCMSImageConfig.cmsOrigin =
  process.env.GATSBY_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.GATSBY_BCMS_API_PUBLIC_KEY || '641322c4b5a472c14b545975';

BCMSImageConfig.localeImageProcessing = true;

export const PageWrapper: FC<PropsWithChildren<PageData>> = ({
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
    'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
  const image = '/thumbnail.jpg';
  const domain = 'https://recipes-starter.thebcms.com';

  return (
    <div className="overflow-hidden">
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <title>{`${title} - Flavour Fushion`}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - Flavour Fushion`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="ogUrl" property="og:url" content={`${domain}${location}`} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content={`${title} - Flavour Fushion`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${location}`} />
        <meta property="twitter:title" content={`${title} - Flavour Fushion`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Poppins:ital,wght@0,700;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Helmet>
      <Header data={header.bcms.meta.en} />
      <main>{children}</main>
      <Footer data={footer.bcms.meta.en} />
    </div>
  );
};