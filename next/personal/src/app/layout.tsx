import { PropsWithChildren } from 'react';
import '../styles/_main.scss';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const metaTitle = 'Personal Website';
const metaDescription =
    'Jumpstart your Next project with this Personal Website. Easily manage your content and scale your application without the backend hassle. Get started now!';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://personal-starter.thebcms.com'),
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
    return (
        <html lang="en">
            <body
                className={`${inter.variable} font-Inter overflow-x-hidden bg-appBody text-appText`}
            >
                <div className="overflow-hidden flex flex-col min-h-screen">
                    <Header />
                    <main className="flex flex-col flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
