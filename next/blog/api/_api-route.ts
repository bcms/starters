import type { BCMSMost, BCMSMostServerRoute } from "@becomes/cms-most/types";
import { HeaderEntry, HeaderEntryMeta } from "~~/bcms/types";
import { FooterEntry, FooterEntryMeta } from "~~/bcms/types/entry/footer";
import { APIResponse, Languages } from "~~/types";
import {getBcmsMost} from "next-plugin-bcms";

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
      const header = (await data.bcms.content.entry.findOne(
        "header",
        async () => true
      )) as unknown as HeaderEntry;
      const footer = (await data.bcms.content.entry.findOne(
        "footer",
        async () => true
      )) as unknown as FooterEntry;
      const result = await route.handler(data);
      return {
        data: result,
        header: header.meta[lng] as HeaderEntryMeta,
        footer: footer.meta[lng] as FooterEntryMeta,
      };
    },
  };
}

export abstract class GenericApi  {
    public readonly bcms: BCMSMost

  constructor() {
    this.bcms = getBcmsMost()
    }

  public async fetchHeaderAndFooter(): Promise<{
    header: HeaderEntryMeta;
    footer: FooterEntryMeta;
  }> {
    const header = (await this.bcms.content.entry.findOne(
        'header',
        async () => true
    )) as HeaderEntry;
    const footer = (await this.bcms.content.entry.findOne(
        'footer',
        async () => true
    )) as FooterEntry;

    return {
      header: header.meta.en as HeaderEntryMeta,
      footer: footer.meta.en as FooterEntryMeta,
    };
  }


  public async handler<T>(data: T): Promise<APIResponse<T>> {
    const { header, footer } = await this.fetchHeaderAndFooter();
    return {
      data,
      header,
      footer,
    };
  }
}
