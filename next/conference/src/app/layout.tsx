import { PropsWithChildren } from 'react';
import '../styles/_main.scss';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

const metaTitle = 'CONference';
const metaDescription =
    'Jumpstart your Next project with this CONference. Easily manage your content and scale your application without the backend hassle. Get started now!';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://conference-starter.thebcms.com'),
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
        <html lang="en" className="scroll-smooth">
            <body
                className={`${inter.className} overflow-x-hidden bg-appBody text-appText scroll-smooth`}
            >
                <main className="overflow-hidden flex flex-col min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
