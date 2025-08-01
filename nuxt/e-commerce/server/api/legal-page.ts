import { LegalEntry } from '~/bcms/type/ts';

export type LegalPageResponse = {
    entries: LegalEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const entries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    const res: LegalPageResponse = {
        entries,
    };

    return res;
});
