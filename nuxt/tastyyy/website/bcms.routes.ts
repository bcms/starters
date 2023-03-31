import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutApi, HomeApi, MenuApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...AboutApi,
  ...MenuApi,
});
