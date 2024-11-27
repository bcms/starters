import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { PlayingEpisode } from './layout/PlayingEpisode';

interface Props {
    title?: string;
    description?: string;
}

const PageLayout: React.FC<PropsWithChildren<Props>> = ({
    children,
    title,
    description,
}) => {
    const metaTitle = title || 'The Podium';
    const metaDescription =
        description ||
        'Jumpstart your Gatsby project with this starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
    const image = '/thumbnail.jpg';

    return (
        <div className="overflow-hidden flex flex-col min-h-screen">
            <Helmet
                htmlAttributes={{
                    lang: 'en',
                }}
            >
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta
                    property="og:site_name"
                    content={`${metaTitle} - The Podium`}
                />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta
                    property="og:title"
                    content={`${metaTitle} - The Podium`}
                />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={image} />
                <meta
                    property="twitter:title"
                    content={`${metaTitle} - The Podium`}
                />
                <meta
                    property="twitter:description"
                    content={metaDescription}
                />
                <meta property="twitter:image" content={image} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <Header />
            <main className="flex flex-col flex-1">{children}</main>
            <Footer />
            <PlayingEpisode />
        </div>
    );
};

export default PageLayout;
