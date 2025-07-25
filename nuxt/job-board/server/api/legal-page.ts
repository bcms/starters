import { LegalEntry } from '~/bcms/type/ts';

export type LegalPageResponse = {
    entries: LegalEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    const res: LegalPageResponse = {
        entries: legalEntries,
    };

    return res;
});
