import { ClientConfig } from '@thebcms/client';
import { TeamMemberEntry, TeamPageEntryMetaItem } from '../../../bcms/types/ts';

export interface TeamPageContent {
    meta: TeamPageEntryMetaItem;
    entries: TeamMemberEntry[];
    bcms: ClientConfig;
}
