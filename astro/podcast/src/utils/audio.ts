import type { PropMediaDataParsed } from "@thebcms/types";
import { bcmsPublic } from "../bcms-public"

export const audioUtil = {
  createAudio(media: PropMediaDataParsed) {
    return new Audio(bcmsPublic.cmsOrigin + bcmsPublic.media.toUri(media._id, media.name))
  },
};
