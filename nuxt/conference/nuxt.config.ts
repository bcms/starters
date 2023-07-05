import { createBcmsNuxtConfig } from "nuxt-plugin-bcms/config";
import bcmsRoutes from "./bcms.routes";

const _ = require("lodash");
const svgPrefix = {};
svgPrefix.toString = () => `${_.uniqueId()}_`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ["axios", "@becomes/cms-client"],
    },
  },
  app: {
    head: {
      titleTemplate: `%s - CONference`,
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
          rel: "stylesheet",
        },
      ],
      meta: [
        { property: "og:type", content: "website" },
        { property: "twitter:card", content: "summary_large_image" },
      ],
    },
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/reset.css",
    "~/assets/css/transition.css",
    "~/assets/css/swiper.scss",
  ],
  modules: [
    "nuxt-svgo",
    "nuxt-swiper",
    [
      "nuxt-plugin-bcms",
      createBcmsNuxtConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || "http://localhost:8080",
          key: {
            id: process.env.BCMS_API_KEY || "644252f4680cc89b3a427eb7",
            secret: process.env.BCMS_API_SECRET || "4c2dc28d1f63c66a0e77d66b663e76eac0268835e14d5baf03c5edd3e3385dd0",
          },
        },
        websiteDomain: "http://localhost:3000",
        postProcessImages: true,
        media: {
          download: true,
        },
        server: {
          routes: bcmsRoutes,
          // domain: process.env.VITE_BCMS_MOST_SERVER_DOMAIN || 'localhost',
          // port: parseInt(process.env.VITE_BCMS_MOST_SERVER_PORT || '3001', 10)
        },
      }),
    ],
  ],
  svgo: {
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              cleanupIDs: { prefix: svgPrefix },
            },
          },
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
