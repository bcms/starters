import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi, RecipesApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...RecipesApi,
});
