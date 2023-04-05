import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi, ServicesApi, AboutApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...ServicesApi,
  ...AboutApi,
});
