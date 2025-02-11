import { ClientConfig } from '@thebcms/client';
import { ProductLite } from '../../utils/product';
import { ProductEntryMetaItem } from '../../../bcms/types/ts';

export interface ProductPageContent {
    meta: ProductEntryMetaItem;
    otherProducts: ProductLite[];
    bcms: ClientConfig;
}
