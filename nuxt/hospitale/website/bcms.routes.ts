import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { ContactApi, HomeApi, JobsApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...JobsApi,
  ...ContactApi,
});
