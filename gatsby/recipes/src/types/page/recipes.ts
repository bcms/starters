import { ClientConfig } from '@thebcms/client';
import { RecipesPageEntryMetaItem } from '../../../bcms/types/ts';
import { Layout } from '../layout';
import { RecipeLight } from '../../utils/recipe';

export interface RecipesPageContent extends Layout {
    meta: RecipesPageEntryMetaItem;
    recipes: RecipeLight[];
    bcms: ClientConfig;
}
