import { BCMSPropMediaDataParsed } from '@becomes/cms-client/types';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';
export const imageUtils = {
  getPath: (image: BCMSPropMediaDataParsed) => {
    return `${BCMSImageConfig.cmsOrigin}/api/media/pip/${image._id}/bin/${BCMSImageConfig.publicApiKeyId}/${image.name}`;
  },
};
