import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { LegalEntry } from '~/bcms/types/ts';

export type LegalPageResponse = {
    entries: LegalEntry[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    const res: LegalPageResponse = {
        entries: legalEntries,
        bcms: bcms.getConfig(),
    };

    return res;
});
