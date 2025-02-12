import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import LoadingIcon from '../../../assets/icons/loader.svg?raw';
import type {
    ProductColorEntry,
    ProductColorEntryMetaItem,
    ProductEntryMetaItem,
    ProductSizeEntryMetaItem,
} from '../../../../bcms/types/ts';
import { useCart } from '../../../context/CartContext';
import ContentManager from '../../ContentManager';

interface Props {
    meta: ProductEntryMetaItem;
    activeColor: ProductColorEntry;
    colorChange: (value: ProductColorEntry) => void;
}
export const Details: React.FC<Props> = ({
    meta,
    activeColor,
    colorChange,
}) => {
    const { addCartItem } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSize, setSelectedSize] = useState<
        ProductSizeEntryMetaItem | undefined
    >(meta?.sizes[0]?.size?.meta?.en);
    const buy = () => {
        addToCart(true);
    };

    const addToCart = (redirect?: boolean) => {
        if (selectedSize) {
            setIsLoading(true);
            setTimeout(() => {
                addCartItem({
                    slug: meta.slug,
                    title: meta.title,
                    size: (selectedSize ||
                        meta.sizes[0].size.meta.en) as ProductSizeEntryMetaItem,
                    cover: meta.gallery[0].image,
                    price: meta.discounted_price || meta.price,
                    color: activeColor.meta.en as ProductColorEntryMetaItem,
                    amount: 0,
                });
                setIsLoading(false);
            }, 750);
            if (redirect) {
                window.location.href = '/shop/cart';
            }
        }
    };

    const colors = useMemo<ProductColorEntry[]>(() => {
        return meta.gallery
            .map((item) => item.color)
            .filter(
                (e, _, arr) =>
                    arr.find((i) => i.meta.en?.slug === e.meta.en?.slug) === e,
            );
    }, []);

    return (
        <div className="border border-appGray-30 p-4 lg:p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-[24px] leading-none tracking-[-0.64px] mb-3 lg:text-[32px]">
                        {meta.title}
                    </h1>
                    {meta.units_sold && (
                        <div className="leading-none tracking-[-0.32px] text-appGray-800">
                            {meta.units_sold} Sold
                        </div>
                    )}
                </div>
                <div className="text-right">
                    <div className="text-[20px] leading-none tracking-[-0.48px] mb-1 lg:text-[24px]">
                        ${meta.price.toFixed(2)}
                    </div>
                    {meta.discounted_price && (
                        <div className="leading-none tracking-[-0.32px] text-appGray-500 line-through">
                            ${meta.discounted_price.toFixed(2)}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-4 border-b border-appGray-300 mb-8">
                <button
                    className="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-appText text-white transition-colors duration-300 hover:bg-appText/80"
                    onClick={buy}
                >
                    Buy now
                </button>
                <button
                    className="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-white border border-appText transition-colors duration-300 hover:bg-appText hover:text-white"
                    disabled={isLoading}
                    onClick={() => addToCart()}
                >
                    <span> Add to cart </span>
                    {isLoading && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: LoadingIcon,
                            }}
                            className="w-3.5 h-3.5 ml-3 mt-0.5 animate-spin"
                        />
                    )}
                </button>
            </div>
            <div className="mb-8">
                <div className="leading-none tracking-[-0.32px] text-appGray-800 mb-4">
                    Size
                </div>
                <div className="flex flex-wrap gap-3">
                    {meta.sizes.map((size, index) => (
                        <button
                            key={index}
                            disabled={!size.available}
                            className={classNames(
                                'w-8 h-8 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] transition-colors duration-300',
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
                            title={`${size.size.meta.en?.title} Size`}
                            onClick={() => setSelectedSize(size.size.meta.en)}
                        >
                            {size.size.meta.en?.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-8">
                <div className="leading-none tracking-[-0.32px] text-appGray-800 mb-4">
                    Colors
                </div>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            className={classNames(
                                'w-10 h-10 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] transition-colors duration-300',
                                {
                                    'text-appGray-800 bg-appGray-200 border border-appText hover:bg-appGray-200':
                                        activeColor.meta.en?.slug ===
                                        color.meta.en?.slug,
                                    'text-appGray-800 hover:bg-appGray-200':
                                        true,
                                },
                            )}
                            title={`${color.meta.en?.title} Color`}
                            onClick={() => colorChange(color)}
                        >
                            <div
                                className="w-8 h-8"
                                style={{ background: color.meta.en?.hex }}
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div className="leading-none tracking-[-0.32px] text-appGray-800 mb-4">
                    Description
                </div>
                <ContentManager
                    items={meta.description.nodes}
                    className="productDetails--description"
                />
            </div>
        </div>
    );
};
