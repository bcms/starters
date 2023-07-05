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
    if (!title) title = "";
    if (!description) description = "";
    if (!image) image = "/thumbnail.jpg";

    const domain = "http://localhost:3000";

    return {
      title: title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${description}`,
        },
        {
          property: "og:site_name",
          content: `${title} - CONference`,
        },
        { property: "og:type", content: "website" },
        { property: "twitter:card", content: "summary_large_image" },
        {
          hid: "ogUrl",
          property: "og:url",
          content: `${domain}${routePath.value}`,
        },
        {
          hid: "ogTitle",
          property: "og:title",
          content: `${title} - CONference`,
        },
        {
          hid: "ogDescription",
          property: "og:description",
          content: `${description}`,
        },
        {
          hid: "ogImage",
          property: "og:image",
          content: `${image}`,
        },
        {
          hid: "twitterUrl",
          property: "twitter:url",
          content: `${domain}${routePath.value}`,
        },
        {
          hid: "twitterTitle",
          property: "twitter:title",
          content: `${title} - CONference`,
        },
        {
          hid: "twitterDescription",
          property: "twitter:description",
          content: `${description}`,
        },
        {
          hid: "twitterImage",
          property: "twitter:image",
          content: `${image}`,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${domain}${routePath.value}`,
        },
      ],
    };
  };

  return {
    setOgHead,
  };
};
