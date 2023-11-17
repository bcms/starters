import {
  PortfolioItemEntryMeta,
  PortfolioPageEntryMeta,
} from '../../../bcms/types';

export interface PortfolioPageData {
  meta: PortfolioPageEntryMeta;
  items: PortfolioItemEntryMeta[];
}

export interface PortfolioItemPageData {
  meta: PortfolioItemEntryMeta;
}
