import * as dotenv from 'dotenv';
import { createBcmsMostConfig } from '@becomes/cms-most';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `cms-gatsby-starter`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
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
          origin:
            process.env.BCMS_API_ORIGIN ||
            'http://localhost:8080',
          key: {
            id: process.env.BCMS_API_KEY || '6433b6994c02e25452a8a947',
            secret:
              process.env.BCMS_API_SECRET ||
              '4107ecd203ff708a1789439376934e315781d66134d6c0da058bc87583f6e0c9',
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
