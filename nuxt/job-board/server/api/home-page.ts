import {
    HomePageEntry,
    HomePageEntryMetaItem,
    JobPostEntry,
    TestimonialEntry,
    TestimonialEntryMetaItem,
} from '~/bcms/type/ts';
import { JobLite, toJobLite } from '~/utils/job';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    jobs: JobLite[];
    testimonials: TestimonialEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const jobEntries = (await bcms.entry.getAll('job-post')) as JobPostEntry[];
    const jobEntriesLite = jobEntries.map((job) => {
        return toJobLite(job);
    });

    const testimonialEntries = (await bcms.entry.getAll(
        'testimonial',
    )) as TestimonialEntry[];
    const testimonialEntriesMeta = testimonialEntries.map(
        (testimonial) => testimonial.meta.en as TestimonialEntryMetaItem,
    );

    const res: HomePageResponse = {
        meta: homePageMeta,
        jobs: jobEntriesLite,
        testimonials: testimonialEntriesMeta,
    };

    return res;
});
