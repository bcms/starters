import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { ContactApi, HomeApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...ContactApi,
});
