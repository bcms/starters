import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    EpisodeEntry,
    EpisodeEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import {
    AboutPageContent,
    EpisodePageContent,
    HomePageContent,
    NowPlayingPageContent,
} from './src/types';

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

    const episodes = await bcms.entry.getAll('episode') as EpisodeEntry[];
    const episodesMeta = episodes.map((episode) => episode.meta.en as EpisodeEntryMetaItem); 

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            episodes: episodesMeta,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // ABOUT
    const aboutTemplate = path.resolve('./src/templates/about.tsx');
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    createPage({
        path: `/about`,
        component: aboutTemplate,
        context: {
            meta: aboutPageMeta,
            episodes: episodesMeta,
            bcms: bcms.getConfig(),
        } as AboutPageContent,
    });

    // NOW PLAYING
    const nowPlayingTemplate = path.resolve('./src/templates/now-playing.tsx');

    createPage({
        path: `/now-playing`,
        component: nowPlayingTemplate,
        context: {
            episodes: episodesMeta,
            bcms: bcms.getConfig()
        } as NowPlayingPageContent,
    });

    // EPISODE
    const episodeTemplate = path.resolve('./src/templates/episode.tsx');

    episodesMeta.forEach((episode) => {

        createPage({
            path: `/episode/${episode.slug}`,
            component: episodeTemplate,
            context: {
                meta: episode,
                episodes: episodesMeta,
                bcms: bcms.getConfig(),
            } as EpisodePageContent,
        });
    })
};
