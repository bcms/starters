const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
  cms: {
    origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
    key: {
      id: process.env.BCMS_API_KEY ?? '6423fe69c4d0f7aa085d5e86',
      secret:
        process.env.BCMS_API_SECRET ??
        'd0128c9f142a7f609c9f787d782feef791ba0bb5c823494f70199a16d88035ac',
    },
  },
  media: {
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
