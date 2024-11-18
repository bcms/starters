import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { LegalPageEntry, LegalPageEntryMetaItem } from '~/bcms/types/ts';

export type LegalPageResponse = {
    meta: LegalPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const legalPageEntry = (await bcms.entry.getBySlug(
        'legal',
        'legal-page',
    )) as LegalPageEntry;

    const legalPageMeta = legalPageEntry.meta.en as LegalPageEntryMetaItem;

    const res: LegalPageResponse = {
        meta: legalPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
