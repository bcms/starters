import React from 'react';
import ArrowIcon from '../../assets/icons/arrow-right.svg?raw';
import { BCMSImage } from '@thebcms/components-react';
import RecipesSearchBar from '../recipes/Search';
import type { RecipeLight } from '../../utils/recipe';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import ContentManager from '../ContentManager';
import Btn from '../Btn';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    headline: PropRichTextDataParsed;
    description: PropRichTextDataParsed;
    coverImage: PropMediaDataParsed;
    recipes: RecipeLight[];
    bcmsConfig: ClientConfig;
}

const HomePageHero: React.FC<Props> = ({
    headline,
    description,
    coverImage,
    recipes,
    bcmsConfig,
}) => {
    return (
        <section className="relative">
            <div className="container">
                <div className="relative pt-24 pb-6 md:pb-10 lg:pt-[250px] lg:pb-[88px]">
                    <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <ContentManager
                            items={headline.nodes}
                            className="homePage--hero-title text-xl leading-[1.2] font-medium text-white mb-3 md:text-3xl
                        lg:text-7xl lg:leading-[1.1] lg:mb-6"
                        />
                        <ContentManager
                            items={description.nodes}
                            className="text-xs leading-none font-medium text-white mb-6 md:text-sm lg:text-xl lg:leading-none
                        lg:mb-10"
                        />
                        <Btn to="/recipes">
                            <span className="mr-2">Browse recipes</span>
                            <div
                                dangerouslySetInnerHTML={{ __html: ArrowIcon }}
                                className="w-[14px] h-[14px] lg:w-5 lg:h-5"
                            />
                        </Btn>
                    </div>
                    <RecipesSearchBar
                        recipes={recipes}
                        className="absolute z-10 top-10 right-0 w-[300px] max-lg:hidden"
                    />
                </div>
            </div>
            <div className="absolute top-0 left-0 size-full">
                <BCMSImage
                    media={coverImage}
                    clientConfig={bcmsConfig}
                    className="size-full object-cover position-top"
                />
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E]/0" />
            </div>
        </section>
    );
};

export default HomePageHero;