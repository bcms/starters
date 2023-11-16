import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import {
  AboutEducationGroup,
  AboutWorkHistoryGroup,
  PortfolioItemEntryMeta,
  ServiceItemEntryMeta,
  TestimonialItemEntryMeta,
} from '../../../bcms/types';
import { HomePageEntryMeta } from '../../../bcms/types/entry/home_page';

export interface HomeServices {
  title: string;
  description: BCMSPropRichTextDataParsed;
  items: ServiceItemEntryMeta[];
}

export interface HomeAbout {
  title: string;
  description: BCMSPropRichTextDataParsed;
  education: AboutEducationGroup;
  work_history: AboutWorkHistoryGroup;
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
  services: HomeServices;
  about: HomeAbout;
  portfolio: HomePortfolio;
  testimonials: HomeTestimonials;
}
