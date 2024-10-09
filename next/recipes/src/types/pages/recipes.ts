import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';

export interface RecipeLight {
    title: string;
    slug: string;
    cover?: PropMediaDataParsed;
    description: PropRichTextDataParsed;
    categories: string[];
    popular?: boolean;
}
