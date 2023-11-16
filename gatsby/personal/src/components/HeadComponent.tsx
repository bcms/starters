import React from 'react';

interface HeadProps {
  title: string;
  description?: string;
  domain?: string;
  routePath?: string;
  image?: string;
}

const Head: React.FC<HeadProps> = ({
  title,
  description,
  domain,
  routePath,
  image,
}) => {
  return (
    <>
      <title>{`${title} - Personal Website`}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={`${title} - Personal Website`} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="ogUrl" property="og:url" content={`${domain}${routePath}`} />
      <meta property="og:title" content={`${title} - Personal Website`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:url" content={`${domain}${routePath}`} />
      <meta property="twitter:title" content={`${title} - Personal Website`} />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    </>
  );
};

export default Head;
