import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutApi, HomeApi } from "./api";
import { EpisodeApi } from "./api/episode";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...AboutApi,
  ...EpisodeApi,
});
