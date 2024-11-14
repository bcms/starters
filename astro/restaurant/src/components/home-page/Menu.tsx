import { BCMSImage } from '@thebcms/components-react';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';
import HomeDivider from './Divider';
import type { MealTypeEntry } from '../../../bcms/types/ts';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    meals: MealTypeEntry[];
    bcmsConfig: ClientConfig;
}

const HomeMenu: React.FC<Props> = ({
    title,
    description,
    meals,
    bcmsConfig,
}) => {
    return (
        <section>
            <div className="container">
                <div className="flex flex-col items-center mb-8 lg:mb-[88px]">
                    <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
                        [ 1 ]
                    </div>
                    <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
                        {title}
                    </h2>
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto lg:text-base lg:leading-[1.3]"
                    />
                </div>
            </div>
            {meals.map((meal, index) => (
                <a
                    key={index}
                    href={`/menu?s=${meal.meta.en?.title.toLowerCase()}`}
                    className="flex relative"
                >
                    {meal.meta.en && (
                        <div className="container">
                            <div className="relative z-10 flex flex-col items-center text-center py-12 max-w-[765px] mx-auto lg:py-[150px]">
                                <h3 className="text-sm leading-none font-Gloock text-white uppercase mb-3 lg:text-[32px] lg:leading-none lg:mb-[18px]">
                                    {meal.meta.en.title}
                                </h3>
                                <ContentManager
                                    items={meal.meta.en?.description.nodes}
                                    className="text-xs leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 lg:text-lg lg:leading-[1.3]"
                                />
                            </div>
                            <BCMSImage
                                media={meal.meta.en?.cover_image}
                                clientConfig={bcmsConfig}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
                        </div>
                    )}
                </a>
            ))}
            <HomeDivider />
        </section>
    );
};

export default HomeMenu;
