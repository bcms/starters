import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi, JobsApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...JobsApi,
});
