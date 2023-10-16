import { createBcmsApiImageHandler } from 'next-plugin-bcms/image-api-handler';

export default createBcmsApiImageHandler({
  outputBase: ['public', 'api', 'bcms-images'],
});
