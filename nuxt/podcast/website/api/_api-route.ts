import type { BCMSMost, BCMSMostServerRoute } from "@becomes/cms-most/types";
import { APIResponse, Languages } from "~~/types";

interface Route<Result = unknown, Body = unknown>
  extends Omit<BCMSMostServerRoute<Result, Body>, "handler"> {
  handler(data: {
    url: string;
    params: {
      [name: string]: string;
    };
    query: {
      [name: string]: string;
    };
    headers: {
      [name: string]: string | string[] | undefined;
    };
    body: Body;
    bcms: BCMSMost;
    lng: Languages;
  }): Promise<Result>;
}

export function apiRoute<Result = unknown, Body = unknown>(
  route: Route<Result, Body>
): Route<
  APIResponse & {
    data: Result;
  },
  Body
> {
  return {
    method: route.method,
    async handler(data) {
      const lng = data.params.lng ? (data.params.lng as Languages) : "en";
      const result = await route.handler(data);
      return {
        data: result,
      };
    },
  };
}
