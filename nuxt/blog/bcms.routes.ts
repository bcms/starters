import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutApi, BlogsApi, ContactApi, HomeApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...BlogsApi,
  ...AboutApi,
  ...ContactApi,
});
