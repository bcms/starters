import { PropsWithChildren } from 'react';
import '../styles/_main.scss';
import { Space_Grotesk, Playfair_Display } from 'next/font/google';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
});
const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
});

const metaTitle = 'Hospitale';
const metaDescription =
    'Jumpstart your Next project with this Job Board. Easily manage your content and scale your application without the backend hassle. Get started now!';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://job-board-starter.thebcms.com'),
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
                className={`${spaceGrotesk.variable} ${playfairDisplay.variable} font-SpaceGrotesk overflow-x-hidden bg-appLight text-appText`}
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
