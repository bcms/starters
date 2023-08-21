const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
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
    output: 'public',
    download: false,
  },
  enableClientCache: true,
});
