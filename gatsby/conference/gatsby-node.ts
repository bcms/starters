import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalEntry,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import { HomePageContent } from './src/types';

const bcms = new Client({ injectSvg: true });

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

    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            legalEntries,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });
};
