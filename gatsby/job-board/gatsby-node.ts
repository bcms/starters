import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    ContactPageEntry,
    ContactPageEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
    JobPostEntry,
    JobPostEntryMetaItem,
    LegalEntry,
    TeamMemberEntry,
    TeamMemberEntryMetaItem,
    TestimonialEntry,
    TestimonialEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import {
    AboutUsPageContent,
    ContactPageContent,
    HomePageContent,
    JobPageContent,
    LegalPageContent,
} from './src/types';
import { toJobLite } from './src/utils/job';

const bcms = new Client(
    process.env.BCMS_ORG_ID || '',
    process.env.BCMS_INSTANCE_ID || '',
    {
        id: process.env.BCMS_API_KEY_ID || '',
        secret: process.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);

export const createPages = async ({
    actions: { createPage },
}: CreatePagesArgs) => {
    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
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

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            jobs: jobEntriesLite,
            testimonials: testimonialEntriesMeta,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // LEGAL
    const legalTemplate = path.resolve('./src/templates/legal.tsx');
    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    createPage({
        path: `/legal`,
        component: legalTemplate,
        context: {
            entries: legalEntries,
            bcms: bcms.getConfig(),
        } as LegalPageContent,
    });

    // CONTACT
    const contactTemplate = path.resolve('./src/templates/contact.tsx');
    const contactPageEntry = (await bcms.entry.getBySlug(
        'lets-talk',
        'contact-page',
    )) as ContactPageEntry;
    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    createPage({
        path: `/contact`,
        component: contactTemplate,
        context: {
            meta: contactPageMeta,
            bcms: bcms.getConfig(),
        } as ContactPageContent,
    });

    // ABOUT US
    const aboutUsTemplate = path.resolve('./src/templates/about-us.tsx');
    const aboutUsPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;
    const aboutUsPageMeta = aboutUsPageEntry.meta.en as AboutPageEntryMetaItem;

    const teamMembers = (await bcms.entry.getAll(
        'team-member',
    )) as TeamMemberEntry[];
    const teamMembersMeta = teamMembers.map(
        (member) => member.meta.en as TeamMemberEntryMetaItem,
    );

    createPage({
        path: `/about-us`,
        component: aboutUsTemplate,
        context: {
            meta: aboutUsPageMeta,
            members: teamMembersMeta,
            bcms: bcms.getConfig(),
        } as AboutUsPageContent,
    });

    // JOB POST
    const jobPostTemplate = path.resolve('./src/templates/jobs/post.tsx');

    createPage({
        path: `/jobs/post`,
        component: jobPostTemplate,
    });

    // JOB
    const jobTemplate = path.resolve('./src/templates/jobs/job.tsx');
    const jobPostEntries = (await bcms.entry.getAll(
        'job-post',
    )) as JobPostEntry[];

    jobPostEntries.forEach((job) => {
        const jobPostEntryMeta = job.meta.en as JobPostEntryMetaItem;

        createPage({
            path: `/jobs/${jobPostEntryMeta.slug}`,
            component: jobTemplate,
            context: {
                meta: jobPostEntryMeta,
                jobs: jobPostEntries.map((e) => toJobLite(e)),
                bcms: bcms.getConfig(),
            } as JobPageContent,
        });
    });
};
