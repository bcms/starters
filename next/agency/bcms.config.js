const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
  cms: {
    origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
    key: {
      id: process.env.BCMS_API_KEY || '65f1725abe4bcfba284afdbe',
      secret:
        process.env.BCMS_API_SECRET ||
        'ab0557bdd1bd36f47f1aa4cc78ae27020ba74b61511248670576d4394d12260d',
    },
  },
  media: {
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
