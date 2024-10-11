import React, { PropsWithChildren } from 'react';
import Footer from './layout/Footer';
import { Helmet } from 'react-helmet';

interface Props {
    title?: string;
    description?: string;
}

const PageLayout: React.FC<PropsWithChildren<Props>> = ({
    children,
    title,
    description,
}) => {
    const metaTitle = title || 'Simple Blog';
    const metaDescription =
        description ||
        'Jumpstart your Next project with this Simple Blog. Easily manage your content and scale your application without the backend hassle. Get started now!';
    // const image = '/thumbnail.jpg';
    const domain = 'https://simple-blog-starter.thebcms.com/';

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
                    content={`${metaTitle} - Insightful Ink`}
                />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    name="ogUrl"
                    property="og:url"
                    content={`${domain}${location}`}
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta
                    property="og:title"
                    content={`${metaTitle} - Insightful Ink`}
                />
                <meta property="og:description" content={metaDescription} />
                {/* <meta property="og:image" content={image} /> */}
                <meta property="twitter:url" content={`${domain}${location}`} />
                <meta
                    property="twitter:title"
                    content={`${metaTitle} - Insightful Ink`}
                />
                <meta
                    property="twitter:description"
                    content={metaDescription}
                />
                {/* <meta property="twitter:image" content={image} /> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <main className="flex flex-col flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default PageLayout;
