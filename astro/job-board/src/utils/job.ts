import type { PropRichTextDataParsed } from "@thebcms/types";
import type { JobPostEntry, JobPostEntryMetaItem } from "../../bcms/types/ts";

export interface JobLite {
    title: string;
    slug: string;
    location: string;
    description: PropRichTextDataParsed;
    type: string;
    featured: boolean;
}

export function toJobLite(job: JobPostEntry): JobLite {
    const meta = job.meta.en as JobPostEntryMetaItem;

    return {
        title: meta.title,
        slug: meta.slug,
        description: meta.description,
        featured: meta.featured || false,
        location: meta.location || '',
        type: meta.type || '',
    };
}
