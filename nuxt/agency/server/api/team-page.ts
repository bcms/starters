import {
    TeamMemberEntry,
    TeamPageEntry,
    TeamPageEntryMetaItem,
} from '~/bcms/type/ts';

export type TeamPageResponse = {
    meta: TeamPageEntryMetaItem;
    members: TeamMemberEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
