'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import LoadingIcon from '@/assets/icons/loader.svg';
import classNames from 'classnames';
import { ProductLite } from '@/utils/product';
import { ClientConfig } from '@thebcms/client';
import { ProductSizeEntryMetaItem } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';

interface ProductCardProps {
    card: ProductLite;
    bcms: ClientConfig;
    style?: React.CSSProperties;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    card,
    bcms,
    style,
    className,
}) => {
    const { addCartItem } = useCart();
    const [isLoading, setIsloading] = useState(false);

    const [emptySizeError, setEmptySizeError] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] =
        useState<ProductSizeEntryMetaItem | null>(null);

    const addToCart = () => {
        if (selectedSize) {
            setIsloading(true);
            setTimeout(() => {
                addCartItem({
                    slug: card.slug,
                    title: card.title,
                    amount: 0,
                    size: selectedSize as ProductSizeEntryMetaItem,
                    cover: card.cover,
                    price: card.discounted_price || card.price,
                    color: card.color,
                });
                setIsloading(false);
            }, 750);
        } else {
            setEmptySizeError('Please select a size');
        }
    };
    return (
        <div className={classNames('flex flex-col', className)} style={style}>
            <Link href={`/shop/${card.slug}`} className="group flex flex-col">
                <div className="flex overflow-hidden mb-6">
                    <div className="size-full">
                        <BCMSImage
                            media={card.cover}
                            clientConfig={bcms}
                            className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="text-2xl leading-none tracking-[-0.5px] mb-3">
                        {card.title}
                    </h3>
                    <div className="flex items-center gap-1">
                        <span className="text-2xl leading-none tracking-[-0.5px] font-bold">
                            ${(card.discounted_price || card.price).toFixed(2)}
                        </span>
                        {Boolean(card.discounted_price) && (
                            <span className="text-lg leading-none tracking-[-0.4px] line-through text-appGray-500">
                                ${card.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
            <div>
                {Boolean(emptySizeError?.length) && (
                    <div className="text-appError text-sm leading-none mb-3">
                        {emptySizeError}
                    </div>
                )}
                <div className="flex flex-wrap gap-3 mb-6">
                    {card.sizes.map((size, index) => (
                        <button
                            key={index}
                            disabled={!size.available}
                            className={classNames(
                                'w-8 h-8 flex items-center justify-center leading-none tracking-[-0.3px] transition-colors duration-300',
                                {
                                    'text-appGray-800 bg-appGray-200 border border-appText hover:bg-appGray-200':
                                        size.available &&
                                        selectedSize?.title ===
                                            size.size.meta.en?.title,
                                    'text-appGray-800 hover:bg-appGray-200':
                                        size.available,
                                    'text-appGray-400 cursor-default':
                                        !size.available,
                                },
                            )}
                            onClick={() => {
                                setSelectedSize(
                                    size.size.meta
                                        .en as ProductSizeEntryMetaItem,
                                );
                                setEmptySizeError('');
                            }}
                            title={`${size.size.meta.en?.title} Size`}
                        >
                            {size.size.meta.en?.title}
                        </button>
                    ))}
                </div>
            </div>
            <button
                className="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-appText text-white transition-colors duration-300 hover:bg-appText/80"
                disabled={isLoading}
                onClick={addToCart}
            >
                <span> Add to cart </span>
                {isLoading && (
                    <LoadingIcon className="w-3.5 h-3.5 ml-3 mt-0.5 animate-spin" />
                )}
            </button>
        </div>
    );
};
