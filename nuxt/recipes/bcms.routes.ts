import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi } from "./api/home";

export default createBcmsMostServerRoutes({
  ...HomeApi,
});
