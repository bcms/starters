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
    'gatsby-plugin-tsconfig-paths',
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     icon: 'src/images/icon.png',
    //   },
    // },
    {
      resolve: 'gatsby-source-bcms',
      options: createBcmsMostConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
          key: {
            id: process.env.BCMS_API_KEY || '644252f4680cc89b3a427eb7',
            secret:
              process.env.BCMS_API_SECRET ||
              '4c2dc28d1f63c66a0e77d66b663e76eac0268835e14d5baf03c5edd3e3385dd0',
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
