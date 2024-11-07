import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    LegalPageEntry,
} from '~/bcms/types/ts';

export type LegalPageResponse = {
    entries: LegalPageEntry[];
    header: HeaderEntryMetaItem;
    footer: FooterEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const header = (await bcms.entry.getBySlug(
        'header',
        'header',
    )) as HeaderEntry;
    const footer = (await bcms.entry.getBySlug(
        'footer',
        'footer',
    )) as FooterEntry;

    const entries = (await bcms.entry.getAll('legal-page')) as LegalPageEntry[];

    const res: LegalPageResponse = {
        entries,
        header: header.meta.en as HeaderEntryMetaItem,
        footer: footer.meta.en as FooterEntryMetaItem,
        bcms: bcms.getConfig(),
    };

    return res;
});
