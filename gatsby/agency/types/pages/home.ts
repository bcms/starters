import {
  HomeCapabilitiesGroup,
  HomePageEntryMeta,
  HomeTeamGroup,
  PortfolioEntry,
  TeamMemberEntry,
} from '../../bcms/types';

export interface HomePageData {
  meta: HomePageEntryMeta;
}

export interface HomePageCapabilitiesType
  extends Omit<HomeCapabilitiesGroup, 'portfolio_items'> {
  portfolio_items: Array<{ portfolio: PortfolioEntry }>;
}

export interface HomePageTeamType extends Omit<HomeTeamGroup, 'members'> {
  members: Array<{ teamMember: TeamMemberEntry }>;
}
