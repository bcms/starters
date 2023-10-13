import { JobEntry, JobEntryMeta } from '@/bcms/types';
import { JobLite } from '@/types';

export function toJobLite(job: JobEntry): JobLite {
  const meta = job.meta.en as JobEntryMeta;
  return {
    title: meta.title,
    slug: meta.slug,
    description: meta.description,
    featured: meta.featured || false,
    location: meta.location.meta.en?.title || '',
    type: meta.type.meta.en?.title || '',
  };
}
