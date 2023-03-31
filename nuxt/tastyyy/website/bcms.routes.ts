import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutApi, HomeApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...AboutApi,
});
