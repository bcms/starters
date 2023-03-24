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
      titleTemplate: `%s - Hospitale`,
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/reset.css",
    "~/assets/css/transition.css",
  ],
  modules: [
    "nuxt-svgo",
    [
      "nuxt-plugin-bcms",
      createBcmsNuxtConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || "",
          key: {
            id: process.env.BCMS_API_KEY || "",
            secret: process.env.BCMS_API_SECRET || "",
          },
        },
        websiteDomain: "http://localhost:3000",
        media: {
          download: false,
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
