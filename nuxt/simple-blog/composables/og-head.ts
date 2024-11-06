export const useHeadTags = () => {
    const route = useRoute();
    const routePath = computed(() => {
        return route.path;
    });

    const setOgHead = ({
        title,
        description,
        image,
    }: {
        title?: string;
        description?: string;
        image?: string;
    }) => {
        if (!title) title = 'Simple Blog';
        if (!description)
            description =
                'Jumpstart your Nuxt project with this Simple Blog. Easily manage your content and scale your application without the backend hassle. Get started now!';
        // if (!image) image = '/thumbnail.jpg';

        const domain = 'https://blog-starter.thebcms.com';

        return {
            title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `${description}`,
                },
                {
                    property: 'og:site_name',
                    content: `${title} - Simple Blog`,
                },
                { property: 'og:type', content: 'website' },
                { property: 'twitter:card', content: 'summary_large_image' },
                {
                    hid: 'ogUrl',
                    property: 'og:url',
                    content: `${domain}${routePath.value}`,
                },
                {
                    hid: 'ogTitle',
                    property: 'og:title',
                    content: `${title} - Simple Blog`,
                },
                {
                    hid: 'ogDescription',
                    property: 'og:description',
                    content: `${description}`,
                },
                // {
                //   hid: 'ogImage',
                //   property: 'og:image',
                //   content: `${image}`,
                // },
                {
                    hid: 'twitterUrl',
                    property: 'twitter:url',
                    content: `${domain}${routePath.value}`,
                },
                {
                    hid: 'twitterTitle',
                    property: 'twitter:title',
                    content: `${title} - Simple Blog`,
                },
                {
                    hid: 'twitterDescription',
                    property: 'twitter:description',
                    content: `${description}`,
                },
                // {
                //   hid: 'twitterImage',
                //   property: 'twitter:image',
                //   content: `${image}`,
                // },
            ],
            link: [
                {
                    hid: 'canonical',
                    rel: 'canonical',
                    href: `${domain}${routePath.value}`,
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
