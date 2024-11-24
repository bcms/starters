import { ClientConfig } from '@thebcms/client';
import {
    PortfolioEntry,
    PortfolioPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface PortfoliosPageContent {
    meta: PortfolioPageEntryMetaItem;
    portfolio: PortfolioEntry[];
    bcms: ClientConfig;
}
