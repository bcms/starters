import { LegalPageEntry, LegalPageEntryMetaItem } from '~/bcms/type/ts';

export type LegalPageResponse = {
    meta: LegalPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const legalPageEntry = (await bcms.entry.getBySlug(
        'legal',
        'legal-page',
    )) as LegalPageEntry;

    const legalPageMeta = legalPageEntry.meta.en as LegalPageEntryMetaItem;

    const res: LegalPageResponse = {
        meta: legalPageMeta,
    };

    return res;
});
