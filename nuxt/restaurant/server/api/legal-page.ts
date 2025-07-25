import { LegalPageEntry } from '~/bcms/type/ts';

export type LegalPageResponse = {
    entries: LegalPageEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const legalEntries = (await bcms.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];

    const res: LegalPageResponse = {
        entries: legalEntries,
    };

    return res;
});
