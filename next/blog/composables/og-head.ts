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

export const useHeadTags = () => {
    const router = useRouter();

    const routePath = useMemo(() => router.asPath, [router.asPath]);

    const setOgHead = ({ title, description, image }: OgHeadTags): OgHeadTagsResult => {
        if (!title) title = '';
        if (!description) description = '';
        if (!image) image = '/thumbnail.jpg';

        const domain = 'http://localhost:3000';

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
                    content: `${title} - Insightful Ink`,
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
                    content: `${title} - Insightful Ink`,
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
                    content: `${title} - Insightful Ink`,
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
    };

    return {
        setOgHead,
    };
};
