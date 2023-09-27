const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
  cms: {
    origin:
      process.env.BCMS_API_ORIGIN ||
      'http://localhost:8080',
    key: {
      id: process.env.BCMS_API_KEY || '6426db7f153ad5151b28771c',
      secret:
        process.env.BCMS_API_SECRET ||
        '4c12dcd5e4bc50c614a6725f7a00277f73e7f0cb8b66f859d1d0a2411791441e',
    },
  },
  media: {
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
