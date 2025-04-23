import { PropsWithChildren } from 'react';
import '@/styles/_main.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { bcmsPrivate } from '@/bcms-private';

const inter = Inter({ subsets: ['latin'] });

const metaTitle = 'Flavour Fushion';
const metaDescription =
    'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://recipes-starter.thebcms.com'),
    alternates: {
        canonical: '/',
    },
    title: metaTitle,
    description: metaDescription,
    openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        images: [metaImage],
        siteName: metaTitle,
    },
    twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: [metaImage],
        site: '@thebcms',
        creator: '@thebcms',
    },
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    const headerEntry = (await bcmsPrivate.entry.getBySlug(
        'header',
        'header',
    )) as HeaderEntry;

    if (!headerEntry) {
        return notFound();
    }

    const header = headerEntry.meta.en as HeaderEntryMetaItem;

    const footerEntry = (await bcmsPrivate.entry.getBySlug(
        'footer',
        'footer',
    )) as FooterEntry;

    if (!footerEntry) {
        return notFound();
    }

    const footer = footerEntry.meta.en as FooterEntryMetaItem;

    return (
        <html lang="en">
            <body className={`${inter.className} overflow-x-hidden bg-white`}>
                <div className="overflow-hidden flex flex-col min-h-screen">
                    <Header header={header} />
                    <main className="flex flex-col flex-1">{children}</main>
                    <Footer footer={footer} />
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
