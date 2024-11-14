import React, { useMemo, useState } from 'react';
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import type {
    FoodItemEntryMetaItem,
    MealTypeEntryMetaItem,
    MenuPageEntryMetaItem,
} from '../../../bcms/types/ts';
import ArchWithStar from '../ArchWithStar';
import classNames from 'classnames';
import ContentManager from '../ContentManager';

interface Props {
    meta: MenuPageEntryMetaItem;
    meals: MealTypeEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

const MenuMeals: React.FC<Props> = ({ meta, meals, foodItems, bcmsConfig }) => {
    const [activeMealType, setActiveMealType] = useState('breakfast');

    const activeMealTypeDescription = useMemo(() => {
        return (
            meals.find(
                (mealType) => mealType.title.toLowerCase() === activeMealType,
            )?.description.nodes || []
        );
    }, [activeMealType]);

    const filteredFoodItems = useMemo(() => {
        return (
            foodItems.filter((item) => {
                return item.type.find(
                    (e) => e.meta.en?.title.toLowerCase() === activeMealType,
                );
            }) || []
        );
    }, [activeMealType]);

    return (
        <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
            <div className="container max-w-[1198px]">
                <ArchWithStar />
                <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[745px] xl:px-0">
                    <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none">
                        {meta.title}
                    </h1>
                    <div className="mb-10 lg:mb-20">
                        <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-8 md:flex md:items-center md:justify-center lg:gap-4 lg:mb-10">
                            {meals.map((mealType, index) => (
                                <button
                                    key={index}
                                    className={classNames(
                                        'flex justify-center w-full px-[18px] py-3 border rounded-[32px] transition-colors duration-300 lg:max-w-max',
                                        {
                                            'border-appAccent bg-appAccent text-appBody':
                                                mealType.title.toLowerCase() ===
                                                activeMealType,
                                            'border-appText':
                                                mealType.title.toLowerCase() !==
                                                activeMealType,
                                        },
                                    )}
                                    onClick={() =>
                                        setActiveMealType(
                                            mealType.title.toLowerCase(),
                                        )
                                    }
                                >
                                    <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                                        {mealType.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <ContentManager
                            items={activeMealTypeDescription}
                            className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
                        />
                    </div>
                </div>
            </div>
            {filteredFoodItems.length > 0 ? (
                <div className="grid grid-cols-1">
                    {filteredFoodItems.map((item) => (
                        <div
                            key={item.slug}
                            className="relative px-6 py-[42px] md:py-20 lg:py-[130px]"
                        >
                            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                                <h3 className="text-sm leading-none uppercase text-white font-Gloock max-w-[480px] mb-[14px] lg:text-[32px] lg:leading-none lg:mb-[18px]">
                                    {item.title}
                                </h3>
                                <ContentManager
                                    items={item.description.nodes}
                                    className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[480px] mb-4 lg:text-base lg:leading-[1.3] lg:mb-6"
                                />
                                <div className="px-6 py-[13px] flex max-w-max bg-[#9BA58F] rounded-[32px] text-sm leading-none text-white tracking-[-0.41px] lg:px-[18px] lg:py-3 lg:text-sm lg:leading-none">
                                    ${item.price}
                                </div>
                            </div>
                            <BCMSImage
                                media={item.cover_image}
                                clientConfig={bcmsConfig}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
                    No menu item found
                </div>
            )}
        </section>
    );
};

export default MenuMeals;
