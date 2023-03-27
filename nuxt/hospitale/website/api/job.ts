import { JobEntry, JobEntryMeta } from "~~/bcms/types/entry/job";
import { JobLight } from "~~/types";

export const jobToLight = (jobs: JobEntry[]): JobLight[] => {
  return jobs.map((e) => {
    const meta = e.meta.en as JobEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      description: meta.description,
      featured: meta.featured || false,
      location: meta.location.meta.en?.title || "",
      type: meta.type.meta.en?.title || "",
    };
  });
};
