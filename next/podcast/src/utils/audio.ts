import type { ClientConfig } from "@thebcms/client";
import type { PropMediaDataParsed } from "@thebcms/types";

export const audioUtil = {
  createAudio(bcms: ClientConfig, file: PropMediaDataParsed) {
    return  new Audio(`${bcms.cmsOrigin}/api/v3/org/${bcms.orgId}/instance/${bcms.instanceId}/media/${file._id}/bin2${file.src}?apiKey=${bcms.apiKey.id}.${bcms.apiKey.secret}`);
  },
};
