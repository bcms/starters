import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { JobEntryMeta, PostJobPageEntryMeta } from '../../bcms/types';

export interface JobLite {
  title: string;
  slug: string;
  location: string;
  description: BCMSPropRichTextDataParsed;
  type: string;
  featured: boolean;
}

export interface JobPageData {
  meta: JobEntryMeta;
  jobs: JobLite[];
}

export interface JobPostPageData {
  meta: PostJobPageEntryMeta;
}
