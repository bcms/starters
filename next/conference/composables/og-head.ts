import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface OgHeadTags {
  title?: string;
  description?: string;
  image?: string;
}

interface OgHeadTagsResult {
  title: string;
  meta: {
    hid?: string;
    name?: string;
    property?: string;
    content: string;
  }[];
  link: {
    hid?: string;
    rel: string;
    href: string;
  }[];
}

export interface HeadTags {
  setOgHead(data: OgHeadTags): OgHeadTagsResult;
}

export function useHeadTags(): HeadTags {
  const router = useRouter();
  const routePath = useMemo(() => router.asPath, [router.asPath]);

  return {
    setOgHead({ title, description, image }) {
      if (!title) title = 'CONference';
      if (!description)
        description =
          'Jumpstart your Next project with this BCMS starter. Easily manage your content and scale your application without the backend hassle. Get started now!';
      if (!image) image = '/thumbnail.jpg';
      const domain = 'https://blog-starter.thebcms.com';
      return {
        title: title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${description}`,
          },
          {
            property: 'og:site_name',
            content: `${title} - CONference`,
          },
          { property: 'og:type', content: 'website' },
          { property: 'twitter:card', content: 'summary_large_image' },
          {
            hid: 'ogUrl',
            property: 'og:url',
            content: `${domain}${routePath}`,
          },
          {
            hid: 'ogTitle',
            property: 'og:title',
            content: `${title} - CONference`,
          },
          {
            hid: 'ogDescription',
            property: 'og:description',
            content: `${description}`,
          },
          {
            hid: 'ogImage',
            property: 'og:image',
            content: `${image}`,
          },
          {
            hid: 'twitterUrl',
            property: 'twitter:url',
            content: `${domain}${routePath}`,
          },
          {
            hid: 'twitterTitle',
            property: 'twitter:title',
            content: `${title} - CONference`,
          },
          {
            hid: 'twitterDescription',
            property: 'twitter:description',
            content: `${description}`,
          },
          {
            hid: 'twitterImage',
            property: 'twitter:image',
            content: `${image}`,
          },
        ],
        link: [
          {
            hid: 'canonical',
            rel: 'canonical',
            href: `${domain}${routePath}`,
          },
        ],
      };
    },
  };
}
