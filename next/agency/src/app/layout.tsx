import { PropsWithChildren } from 'react';
import '../styles/_main.scss';
import { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});
const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
});

const metaTitle = 'BrandCrafters';
const metaDescription =
    'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://agency-starter.thebcms.com'),
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
                className={`${inter.variable} ${playfairDisplay.variable} font-HelveticaNeue overflow-x-hidden text-appText bg-appBody`}
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
