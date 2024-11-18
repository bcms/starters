import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    PortfolioEntry,
    PortfolioPageEntry,
    PortfolioPageEntryMetaItem,
} from '~/bcms/types/ts';

export type PortfolioPageResponse = {
    meta: PortfolioPageEntryMetaItem;
    portfolio: PortfolioEntry[];
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
        portfolio: portfolioEntries,
        bcms: bcms.getConfig(),
    };

    return res;
});
