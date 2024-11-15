import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { LegalPageEntry } from '~/bcms/types/ts';

export type LegalPageResponse = {
    entries: LegalPageEntry[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const legalEntries = (await bcms.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];

    const res: LegalPageResponse = {
        entries: legalEntries,
        bcms: bcms.getConfig(),
    };

    return res;
});
