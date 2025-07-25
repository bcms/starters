import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    TeamMemberEntry,
    TeamMemberEntryMetaItem,
} from '~/bcms/type/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    members: TeamMemberEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
