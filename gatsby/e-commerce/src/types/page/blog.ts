import { ClientConfig } from '@thebcms/client';
import { BlogEntryMetaItem } from '../../../bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';

export interface BlogPageContent {
    meta: BlogEntryMetaItem;
    content: EntryContentParsedItem[];
    otherBlogs: BlogEntryMetaItem[];
    bcms: ClientConfig;
}
