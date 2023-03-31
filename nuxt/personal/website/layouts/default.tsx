import '../styles/_main.scss';
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

BCMSImageConfig.cmsOrigin = process.env.VITE_BCMS_API_ORIGIN || '';
BCMSImageConfig.publicApiKeyId = process.env.VITE_BCMS_PUB_API_KEY || '';
BCMSImageConfig.localeImageProcessing = false;

export default defineNuxtComponent({
  setup(_, ctx) {
    return () => (
      <div class="layout">{ctx.slots.default ? ctx.slots.default() : ''}</div>
    );
  },
});
