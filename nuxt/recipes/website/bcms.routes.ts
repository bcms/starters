import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi, LegalApi, RecipesApi } from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...RecipesApi,
  ...LegalApi,
});
