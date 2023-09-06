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

  const title = page?.meta?.title ?? '';
  const description = '';
  const image = '/thumbnail.jpg';
  const domain = 'http://localhost:3000';
  return (
    <div className="overflow-hidden">
      <Head>
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
        <meta property="og:title" content={`${title} - Insightful Ink`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${routePath}`} />
        <meta property="twitter:title" content={`${title} - Insightful Ink`} />
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
      </Head>
      <Header data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </div>
  );
};
