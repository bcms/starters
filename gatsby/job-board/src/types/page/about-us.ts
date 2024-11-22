import { ClientConfig } from '@thebcms/client';
import {
    AboutPageEntryMetaItem,
    TeamMemberEntryMetaItem,
} from '../../../bcms/types/ts';

export interface AboutUsPageContent {
    meta: AboutPageEntryMetaItem;
    members: TeamMemberEntryMetaItem[];
    bcms: ClientConfig;
}
