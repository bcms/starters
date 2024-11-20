import { ClientConfig } from '@thebcms/client';
import { BlogsPageEntryMetaItem } from '../../../bcms/types/ts';
import { BlogLite } from '../../utils/blog';

export interface BlogsPageContent {
    meta: BlogsPageEntryMetaItem;
    blogs: BlogLite[];
    bcms: ClientConfig;
}
