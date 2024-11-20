import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    TestimonialEntry,
    TestimonialEntryMetaItem,
    TestimonialsPageEntry,
    TestimonialsPageEntryMetaItem,
} from '~/bcms/types/ts';

export type TestimonialsPageResponse = {
    meta: TestimonialsPageEntryMetaItem;
    testimonials: TestimonialEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const testimonialsPageEntry = (await bcms.entry.getBySlug(
        'testimonials',
        'testimonials-page',
    )) as TestimonialsPageEntry;
    const testimonialEntries = (await bcms.entry.getAll(
        'testimonial',
    )) as TestimonialEntry[];

    const testimonialsPageMeta = testimonialsPageEntry.meta
        .en as TestimonialsPageEntryMetaItem;

    const res: TestimonialsPageResponse = {
        meta: testimonialsPageMeta,
        testimonials: testimonialEntries.map(
            (e) => e.meta.en as TestimonialEntryMetaItem,
        ),
        bcms: bcms.getConfig(),
    };

    return res;
});
