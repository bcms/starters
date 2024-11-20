import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    PortfolioEntry,
    PortfolioEntryMetaItem,
    PortfolioPageEntry,
    PortfolioPageEntryMetaItem,
} from '~/bcms/types/ts';

export type PortfolioPageResponse = {
    meta: PortfolioPageEntryMetaItem;
    entries: PortfolioEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const portfolioPageEntry = (await bcms.entry.getBySlug(
        'portfolio',
        'portfolio-page',
    )) as PortfolioPageEntry;

    const portfolioPageMeta = portfolioPageEntry.meta
        .en as PortfolioPageEntryMetaItem;

    const portfolioEntries = (await bcms.entry.getAll(
        'portfolio',
    )) as PortfolioEntry[];

    const res: PortfolioPageResponse = {
        meta: portfolioPageMeta,
        entries: portfolioEntries.map(
            (e) => e.meta.en as PortfolioEntryMetaItem,
        ),
        bcms: bcms.getConfig(),
    };

    return res;
});
