import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    TeamMemberEntry,
    TeamPageEntry,
    TeamPageEntryMetaItem,
} from '~/bcms/types/ts';

export type TeamPageResponse = {
    meta: TeamPageEntryMetaItem;
    members: TeamMemberEntry[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const teamPageEntry = (await bcms.entry.getBySlug(
        'team',
        'team-page',
    )) as TeamPageEntry;

    const teamPageMeta = teamPageEntry.meta.en as TeamPageEntryMetaItem;

    const teamMembersEntries = (await bcms.entry.getAll(
        'team-member',
    )) as TeamMemberEntry[];

    const res: TeamPageResponse = {
        meta: teamPageMeta,
        members: teamMembersEntries,
        bcms: bcms.getConfig(),
    };

    return res;
});
