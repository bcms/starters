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
  defaultTitle,
}) => {
  const router = useRouter();
  const routePath = useMemo(() => router.asPath, [router.asPath]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const title = defaultTitle ?? page?.meta?.title ?? 'Flavour Fushion';
  const description =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    page?.meta?.seo?.description ??
    'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';

  const image = '/thumbnail.jpg';
  const domain = 'https://recipes-starter.thebcms.com';
  return (
    <div className="overflow-hidden">
      <Head>
        <title>{`${title} - Flavour Fushion`}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - Flavour Fushion`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="ogUrl"
          property="og:url"
          content={`${domain}${routePath}`}
        />
        <meta property="og:title" content={`${title} - Flavour Fushion`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${routePath}`} />
        <meta property="twitter:title" content={`${title} - Flavour Fushion`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
      </Head>
      <Header data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </div>
  );
};
