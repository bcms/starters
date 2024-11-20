import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { PortfolioEntry, PortfolioEntryMetaItem } from '~/bcms/types/ts';

export type PortfolioResponse = {
    meta: PortfolioEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') as string;
    const portfolioEntry = (await bcms.entry.getBySlug(
        slug,
        'portfolio',
    )) as PortfolioEntry;

    const portfolioEntryMeta = portfolioEntry.meta.en as PortfolioEntryMetaItem;

    const res: PortfolioResponse = {
        meta: portfolioEntryMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
