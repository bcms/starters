import type { PropMediaDataParsed } from '@thebcms/types';
import { useBcmsPublic } from '#imports';

export const audioUtil = {
    createAudio(media: PropMediaDataParsed) {
        const bcms = useBcmsPublic();
        return new Audio(
            bcms.cmsOrigin + bcms.media.toUri(media._id, media.name),
        );
    },
};
