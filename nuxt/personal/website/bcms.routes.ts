import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi } from "./api";
import { ServicesApi } from "./api/services";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...ServicesApi,
});
