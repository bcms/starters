import { PropsWithChildren } from 'react';
import '../styles/_main.scss';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EpisodesProvider } from '@/context/EpisodeContext';
import { PlayerProvider } from '@/context/PlayerContext';
import { PlayingEpisode } from '@/components/layout/PlayingEpisode';

const inter = Inter({
    subsets: ['latin'],
});

const metaTitle = 'The Podium';
const metaDescription =
    'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://podcast-starter.thebcms.com'),
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
                className={`${inter.className} font-Inter overflow-x-hidden bg-appBody text-appText scroll-smooth`}
            >
                <EpisodesProvider>
                    <PlayerProvider>
                        <div className="overflow-hidden flex flex-col min-h-screen">
                            <Header />
                            <main className="flex flex-col flex-1">
                                {children}
                            </main>
                            <Footer />
                            <PlayingEpisode />
                        </div>
                    </PlayerProvider>
                </EpisodesProvider>
            </body>
        </html>
    );
};

export default RootLayout;
