import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { ContactApi, HomeApi, JobsApi } from "./api";
import { AboutApi } from "./api/about";
import { LegalApi } from "./api/legal";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...JobsApi,
  ...ContactApi,
  ...AboutApi,
  ...LegalApi,
});
