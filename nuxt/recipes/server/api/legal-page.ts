import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    LegalPageEntry,
} from '~/bcms/type/ts';

export type LegalPageResponse = {
    entries: LegalPageEntry[];
    header: HeaderEntryMetaItem;
    footer: FooterEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
