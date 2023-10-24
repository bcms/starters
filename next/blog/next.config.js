const { createBcmsNextPlugin } = require('next-plugin-bcms/main');

createBcmsNextPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};
module.exports = nextConfig;
