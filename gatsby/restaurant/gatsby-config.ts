import * as dotenv from 'dotenv';
import { createBcmsMostConfig } from '@becomes/cms-most';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'cms-gatsby-starter',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-svgr',
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-source-bcms',
      options: createBcmsMostConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
          key: {
            id: process.env.BCMS_API_KEY || '6423fe69c4d0f7aa085d5e86',
            secret:
              process.env.BCMS_API_SECRET ||
              'd0128c9f142a7f609c9f787d782feef791ba0bb5c823494f70199a16d88035ac',
          },
        },
        media: {
          download: true,
          output: 'static/api',
          images: {
            process: true,
          },
        },
        server: {
          port: 3001,
        },
      }) as any,
    },
  ],
};

export default config;
