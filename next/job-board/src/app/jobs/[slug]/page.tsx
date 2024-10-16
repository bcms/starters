import React from 'react';
import { BCMSImage } from '@thebcms/components-react';
import { Metadata } from 'next';
import { bcms } from '@/app/bcms-client';
import { JobPostEntry, JobPostEntryMetaItem } from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import Details from './components/Details';
import { toJobLite } from '@/utils/job';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const jobPostsEntries = (await bcms.entry.getAll(
        'job-post',
    )) as JobPostEntry[];

    return jobPostsEntries.map((job) => {
        const meta = job.meta.en as JobPostEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const jobPostEntry = (await bcms.entry.getBySlug(
        params.slug,
        'job-post',
    )) as JobPostEntry;

    if (!jobPostEntry) {
        return notFound();
    }

    const jobPostEntryMeta = jobPostEntry.meta.en as JobPostEntryMetaItem;
    const pageTitle = `${jobPostEntryMeta.seo?.title || jobPostEntryMeta?.title} - Hospitale`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const JobPostPage: React.FC<Props> = async ({ params }) => {
    const jobPostEntries = (await bcms.entry.getAll(
        'job-post',
    )) as JobPostEntry[];

    const jobPostEntry = jobPostEntries.find(
        (e) => e.meta.en?.slug === params.slug,
    );

    if (!jobPostEntry) {
        return notFound();
    }

    const jobPostEntryMeta = jobPostEntry.meta.en as JobPostEntryMetaItem;

    return (
        <div>
            <div className="relative mt-6 mb-10 lg:mt-0 lg:mb-[72px]">
                <BCMSImage
                    media={jobPostEntryMeta.cover_image}
                    clientConfig={bcms.getConfig()}
                    className="w-full aspect-[2.76] object-cover lg:aspect-[3.71]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
            </div>
            <Details
                meta={jobPostEntryMeta}
                jobs={jobPostEntries.map((e) => toJobLite(e))}
                bcmsConfig={bcms.getConfig()}
            />
        </div>
    );
};

export default JobPostPage;
