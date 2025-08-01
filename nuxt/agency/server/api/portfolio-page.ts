import {
    PortfolioEntry,
    PortfolioPageEntry,
    PortfolioPageEntryMetaItem,
} from '~/bcms/type/ts';

export type PortfolioPageResponse = {
    meta: PortfolioPageEntryMetaItem;
    portfolio: PortfolioEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
