const { createBcmsMostConfig } = require('@becomes/cms-most');

module.exports = createBcmsMostConfig({
  cms: {
    origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
    key: {
      id: process.env.BCMS_API_KEY || '650c066e93cfd8229365ed18',
      secret:
          process.env.BCMS_API_SECRET ||
          '12be61baeeea604f11e4e8185ae2f1774d10018e72a0c4060aae560f794308e8',
    },
  },
  media: {
    output: 'public/api',
    download: true,
  },
  enableClientCache: true,
});
