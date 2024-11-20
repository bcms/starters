import { ClientConfig } from '@thebcms/client';
import { BlogEntryMetaItem } from '../../../bcms/types/ts';
import { BlogLite } from '../../utils/blog';
import { EntryContentParsedItem } from '@thebcms/types';

export interface BlogPageContent {
    meta: BlogEntryMetaItem;
    content: EntryContentParsedItem[];
    blogs: BlogLite[];
    bcms: ClientConfig;
}
