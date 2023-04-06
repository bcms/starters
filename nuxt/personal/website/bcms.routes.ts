import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomeApi, ServicesApi, AboutApi } from "./api";
import { PortfolioApi } from "./api/portfolio";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...ServicesApi,
  ...AboutApi,
  ...PortfolioApi,
});
