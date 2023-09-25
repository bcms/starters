const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
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
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
