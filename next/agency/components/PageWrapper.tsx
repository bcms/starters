import Header from './layout/Header';
import Footer from './layout/Footer';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { PageProps } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const PageWrapper: FC<PropsWithChildren<PageProps>> = ({
  page,
  header,
  children,
  footer,
}) => {
  const router = useRouter();
  const routePath = useMemo(() => router.asPath, [router.asPath]);
  const title = page?.meta?.title ?? 'BrandCrafters';
  const description =
    'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
  const image = '/thumbnail.jpg';
  const domain = 'https://agency-starter.thebcms.com/';
  return (
    <div className="flex flex-col min-h-screen flex-1 overflow-hidden">
      <Head>
        <title>{title} - BrandCrafters</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - BrandCrafters`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="ogUrl"
          property="og:url"
          content={`${domain}${routePath}`}
        />
        <meta property="og:title" content={`${title} - BrandCrafters`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${routePath}`} />
        <meta property="twitter:title" content={`${title} - BrandCrafters`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="canonical" href={`${domain}${routePath}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header data={header} />
      <main className="flex-1">{children}</main>
      <Footer data={footer} />
    </div>
  );
};
