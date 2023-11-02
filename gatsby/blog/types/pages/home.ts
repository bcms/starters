import { BlogEntry, HomePageEntryMeta } from '../../bcms/types';

export interface HomePageData {
  meta: {
    en: HomePageEntryMeta;
  };
  blogs: {
    nodes: Array<{
      bcms: {
        meta: {
          en: BlogEntry;
        };
      };
    }>;
  };
}
