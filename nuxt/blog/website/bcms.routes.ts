import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { BlogsApi, ContactApi, HomeApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...BlogsApi,
  ...ContactApi,
});
