import { ClientConfig } from '@thebcms/client';
import React from 'react';
import { ProductCategoryEntryMetaItem } from '@bcms-types/types/ts';
import { Btn, BtnTheme } from '@/components/Btn';
import { BCMSImage } from '@thebcms/components-react';
import Link from 'next/link';

interface Props {
    data: {
        meta: ProductCategoryEntryMetaItem;
        productsCount: number;
    }[];
    ctaTheme: BtnTheme;
    bcms: ClientConfig;
}

export const HomeCategories: React.FC<Props> = ({ data, ctaTheme, bcms }) => {
    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((category, index) => {
                    return (
                        <div
                            key={index}
                            className="group relative aspect-square flex items-end p-8 overflow-hidden"
                        >
                            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                                <h2 className="flex items-end flex-wrap gap-4 text-white leading-none">
                                    <span className="text-[32px] md:text-[40px]">
                                        {category.meta.title}
                                    </span>
                                    <span className="text-[18px] md:text-[24px]">
                                        ({category.productsCount} Product
                                        {category.productsCount === 0 ||
                                        category.productsCount > 1
                                            ? 's'
                                            : ''}
                                        )
                                    </span>
                                </h2>
                            </div>
                            <Link
                                href={`/shop${
                                    category.productsCount > 0
                                        ? '?category=' + category.meta.slug
                                        : ''
                                }`}
                                className="absolute z-10 inset-0 bg-black/60 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                            >
                                <div className="text-white text-[28px] leading-none mb-6 md:text-[32px]">
                                    {category.meta.title}
                                </div>
                                <Btn theme={ctaTheme} label="Shop now" />
                            </Link>
                            <div className="absolute top-0 left-0 size-full">
                                <BCMSImage
                                    media={category.meta.gallery[0]}
                                    clientConfig={bcms}
                                    className="size-full object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
