import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutApi, HomeApi, MenuApi, ReservationApi } from "./api";
import { EventsApi } from "./api/events";

export default createBcmsMostServerRoutes({
  ...HomeApi,
  ...AboutApi,
  ...MenuApi,
  ...EventsApi,
  ...ReservationApi,
});
