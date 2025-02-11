import { ClientConfig } from '@thebcms/client';
import { BlogEntryMetaItem } from '../../../bcms/types/ts';

export interface BlogsPageContent {
    blogs: BlogEntryMetaItem[];
    bcms: ClientConfig;
}
