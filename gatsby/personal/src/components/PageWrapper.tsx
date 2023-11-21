import { BCMSImageConfig } from '@becomes/cms-most/frontend';
import React, { FC, PropsWithChildren } from 'react';
import { PageData } from '../../types';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

BCMSImageConfig.cmsOrigin =
  process.env.GATSBY_BCMS_API_ORIGIN || 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId =
  process.env.GATSBY_BCMS_API_PUBLIC_KEY || '641322c4b5a472c14b545975';

BCMSImageConfig.localeImageProcessing = true;

gsap.registerPlugin(ScrollTrigger);

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
    'Jumpstart your Gatsby project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
  const image = '/thumbnail.jpg';
  const domain = 'https://personal-starter.thebcms.com';

  return (
    <div className="overflow-hidden">
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <title>{`${title} - Personal`}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - Personal`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="ogUrl" property="og:url" content={`${domain}${location}`} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content={`${title} - Personal`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${location}`} />
        <meta property="twitter:title" content={`${title} - Personal`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
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
