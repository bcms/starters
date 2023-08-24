const { createBcmsNextPlugin }  = require("next-plugin-bcms/main")

createBcmsNextPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = nextConfig
