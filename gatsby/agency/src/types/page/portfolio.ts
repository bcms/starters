import { ClientConfig } from '@thebcms/client';
import {
    PortfolioEntry,
    PortfolioPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface PortfolioPageContent {
    meta: PortfolioPageEntryMetaItem;
    entries: PortfolioEntry[];
    bcms: ClientConfig;
}
