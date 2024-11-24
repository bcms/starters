import { ClientConfig } from '@thebcms/client';
import { RecipeEntryMetaItem } from '../../../bcms/types/ts';
import { Layout } from '../layout';
import { RecipeLight } from '../../utils/recipe';

export interface RecipePageContent extends Layout {
    meta: RecipeEntryMetaItem;
    recipes: RecipeLight[];
    bcms: ClientConfig;
}
