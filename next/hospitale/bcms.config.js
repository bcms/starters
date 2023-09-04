const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
  cms: {
    origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
    key: {
      id: process.env.BCMS_API_KEY || '641d60cd2a29ceb11f9ce26c',
      secret:
          process.env.BCMS_API_SECRET ||
          '05e01e059bcbd3100374364d15fd4685ea9a60389ff577908205aa89888d8741',
    },
  },
  media: {
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
