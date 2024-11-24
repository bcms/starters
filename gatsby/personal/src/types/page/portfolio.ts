import { ClientConfig } from '@thebcms/client';
import { PortfolioEntryMetaItem } from '../../../bcms/types/ts';

export interface PortfolioPageContent {
    meta: PortfolioEntryMetaItem;
    bcms: ClientConfig;
}
