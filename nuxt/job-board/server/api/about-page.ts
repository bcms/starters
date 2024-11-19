import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    TeamMemberEntry,
    TeamMemberEntryMetaItem,
} from '~/bcms/types/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    members: TeamMemberEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
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

    const res: AboutPageResponse = {
        meta: aboutUsPageMeta,
        members: teamMembersMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
