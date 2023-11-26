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
            id: process.env.BCMS_API_KEY || '6436aded346e3258041e3557',
            secret:
              process.env.BCMS_API_SECRET ||
              'c78737860983a2690970b6edfe8178c1198170d618f7bacc559c9e4ba7216ed4',
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
