import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutApi, EpisodeApi, HomeApi, NowPlayingApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...AboutApi,
  ...EpisodeApi,
  ...NowPlayingApi,
});
