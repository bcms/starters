import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
});
