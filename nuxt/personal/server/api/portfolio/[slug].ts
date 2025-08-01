import { PortfolioEntry, PortfolioEntryMetaItem } from '~/bcms/type/ts';

export type PortfolioResponse = {
    meta: PortfolioEntryMetaItem;
};

export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
    const slug = getRouterParam(event, 'slug') as string;
    const portfolioEntry = (await bcms.entry.getBySlug(
        slug,
        'portfolio',
    )) as PortfolioEntry;

    const portfolioEntryMeta = portfolioEntry.meta.en as PortfolioEntryMetaItem;

    const res: PortfolioResponse = {
        meta: portfolioEntryMeta,
    };

    return res;
});
