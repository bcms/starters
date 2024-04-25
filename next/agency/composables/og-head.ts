import { useRouter } from 'next/router';

export const useHeadTags = () => {
  const router = useRouter();
  const { pathname } = router;

  const setOgHead = ({ title, description, image }: { title: string, description: string, image: string }) => {
    if (!title) title = 'BrandCrafters';
    if (!description)
      description =
        'Jumpstart your Next.js project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
    if (!image) image = '/thumbnail.jpg';

    const domain = 'https://agency-starter.thebcms.com';

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          property: 'og:site_name',
          content: `${title} - BrandCrafters`,
        },
        { property: 'og:type', content: 'website' },
        { property: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'ogUrl',
          property: 'og:url',
          content: `${domain}${pathname}`,
        },
        {
          hid: 'ogTitle',
          property: 'og:title',
          content: `${title} - BrandCrafters`,
        },
        {
          hid: 'ogDescription',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'ogImage',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'twitterUrl',
          property: 'twitter:url',
          content: `${domain}${pathname}`,
        },
        {
          hid: 'twitterTitle',
          property: 'twitter:title',
          content: `${title} - BrandCrafters`,
        },
        {
          hid: 'twitterDescription',
          property: 'twitter:description',
          content: description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${domain}${pathname}`,
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    };
  };

  return {
    setOgHead,
  };
};
