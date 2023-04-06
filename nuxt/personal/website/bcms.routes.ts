import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  HomeApi,
  ServicesApi,
  AboutApi,
  PortfolioApi,
  TestimonialsApi,
  LegalApi,
} from "./api";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...ServicesApi,
  ...AboutApi,
  ...PortfolioApi,
  ...TestimonialsApi,
  ...LegalApi,
});
