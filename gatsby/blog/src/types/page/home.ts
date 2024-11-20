import { ClientConfig } from '@thebcms/client';
import { HomePageEntryMetaItem } from '../../../bcms/types/ts';
import { BlogLite } from '../../utils/blog';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    featuredBlogs: BlogLite[];
    blogs: BlogLite[];
    bcms: ClientConfig;
}
