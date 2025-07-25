import {
    TestimonialEntry,
    TestimonialEntryMetaItem,
    TestimonialsPageEntry,
    TestimonialsPageEntryMetaItem,
} from '~/bcms/type/ts';

export type TestimonialsPageResponse = {
    meta: TestimonialsPageEntryMetaItem;
    testimonials: TestimonialEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
