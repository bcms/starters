import React from 'react';
import { Metadata } from 'next';
import {
    TestimonialEntry,
    TestimonialEntryMetaItem,
    TestimonialsPageEntry,
    TestimonialsPageEntryMetaItem,
} from '@bcms-types/types/ts';
import AnimatedTitle from '@/components/AnimatedTitle';
import { notFound } from 'next/navigation';
import Items from './components/Items';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Testimonials - Personal Website';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const TestimonialsPage: React.FC = async () => {
    const testimonialsPageEntry = (await bcmsPrivate.entry.getBySlug(
        'testimonials',
        'testimonials-page',
    )) as TestimonialsPageEntry;

    if (!testimonialsPageEntry) {
        return notFound();
    }

    const testimonialsPageMeta = testimonialsPageEntry.meta
        .en as TestimonialsPageEntryMetaItem;

    const testimonialEntries = (await bcmsPrivate.entry.getAll(
        'testimonial',
    )) as TestimonialEntry[];

    return (
        <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
            <div className="container">
                <AnimatedTitle
                    title={testimonialsPageMeta.title}
                    className="mb-10 md:mb-20 lg:mb-[124px]"
                    titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                />
                <Items
                    items={testimonialEntries.map(
                        (e) => e.meta.en as TestimonialEntryMetaItem,
                    )}
                    bcmsConfig={bcmsPublic.getConfig()}
                />
            </div>
        </div>
    );
};

export default TestimonialsPage;
