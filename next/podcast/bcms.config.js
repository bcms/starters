const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
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
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
