import { bcms } from '~/bcms-client';
import { LegalEntry } from '~/bcms/types/ts';

export type LegalPageResponse = {
    entries: LegalEntry[];
};

export default defineEventHandler(async () => {
    const entries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    const res: LegalPageResponse = {
        entries,
    };

    return res;
});
