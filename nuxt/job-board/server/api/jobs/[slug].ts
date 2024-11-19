import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { JobPostEntry, JobPostEntryMetaItem } from '~/bcms/types/ts';
import { JobLite, toJobLite } from '~/utils/job';

export type JobPageResponse = {
    meta: JobPostEntryMetaItem;
    jobs: JobLite[];
    bcms: ClientConfig;
};

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');
    const jobPostEntries = (await bcms.entry.getAll(
        'job-post',
    )) as JobPostEntry[];

    const jobPostEntry = jobPostEntries.find((e) => e.meta.en?.slug === slug);

    const jobPostEntryMeta = jobPostEntry?.meta.en as JobPostEntryMetaItem;

    const res: JobPageResponse = {
        meta: jobPostEntryMeta,
        jobs: jobPostEntries
            .map((job) => toJobLite(job))
            .filter((e) => e.slug !== slug),
        bcms: bcms.getConfig(),
    };

    return res;
});
