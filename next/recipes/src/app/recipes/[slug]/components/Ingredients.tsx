import ContentManager from '@/components/ContentManager';
import { PropRichTextDataParsed } from '@thebcms/types';
import React from 'react';

interface Props {
    ingredients: PropRichTextDataParsed[];
}

export const Ingredients: React.FC<Props> = ({ ingredients }) => {
    return (
        <div className="mb-8 lg:mb-16">
            <h2 className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6 lg:text-2xl lg:leading-none">
                Ingredients
            </h2>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-6">
                {ingredients.map((ingredient, index) => (
                    <div
                        key={index}
                        className="border border-[#E8E8E8] rounded-lg px-[14px] py-[18px] lg:p-5"
                    >
                        <ContentManager
                            items={ingredient.nodes}
                            className="recipeIngredients--content text-xs leading-none tracking-[-0.41px] font-medium text-[#9C9C9C] lg:text-base lg:leading-none"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
