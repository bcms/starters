import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import {
  AboutEducationGroup,
  AboutWorkHistoryGroup,
  PortfolioItemEntryMeta,
  TestimonialItemEntryMeta,
} from "~~/bcms/types";
import { HomePageEntryMeta } from "~~/bcms/types/entry/home_page";
import { ServiceEntryMeta } from "~~/bcms/types/entry/service";

export interface HomeAbout {
  title: string;
  description: BCMSPropRichTextDataParsed;
  education: AboutEducationGroup;
  workHistory: AboutWorkHistoryGroup;
}

export interface HomePortfolio {
  title: string;
  description: BCMSPropRichTextDataParsed;
  items: PortfolioItemEntryMeta[];
}

export interface HomeTestimonials {
  title: string;
  description: BCMSPropRichTextDataParsed;
  items: TestimonialItemEntryMeta[];
}

export interface HomePageData {
  meta: HomePageEntryMeta;
  services: ServiceEntryMeta[];
  about: HomeAbout;
  portfolio: HomePortfolio;
  testimonials: HomeTestimonials;
}
