import { ClientConfig } from '@thebcms/client';
import { HomePageEntryMetaItem } from '../../../bcms/types/ts';
import { RecipeLight } from '../../utils/recipe';
import { Layout } from '../layout';

export interface HomePageContent extends Layout {
    meta: HomePageEntryMetaItem;
    recipes: RecipeLight[];
    bcms: ClientConfig;
}
