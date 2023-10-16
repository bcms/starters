const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
  cms: {
    origin:
      process.env.BCMS_API_ORIGIN ||
      'http://localhost:8080',
    key: {
      id: process.env.BCMS_API_KEY || '641322c4b5a472c14b545975',
      secret:
        process.env.BCMS_API_SECRET ||
        'c03699d4d73b111d4e71898cc601b139e1c68f08f69194a803ab9609a3c88aac',
    },
  },
  media: {
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
