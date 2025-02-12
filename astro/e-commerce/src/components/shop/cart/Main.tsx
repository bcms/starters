import React from 'react';
import { BCMSImage } from '@thebcms/components-react';
import type { ClientConfig } from '@thebcms/client';
import { useCart } from '../../../context/CartContext';

interface Props {
    bcms: ClientConfig;
}

export const Main: React.FC<Props> = ({ bcms }) => {
    const { cartItems, addCartItem, removeCartItem, totalCartPrice } =
        useCart();

    return (
        <div>
            {cartItems.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-appGray-300 bg-white p-[26px] flex flex-col justify-between gap-10 md:flex-row md:items-center"
                            >
                                <div className="flex items-center gap-5">
                                    <BCMSImage
                                        media={item.cover}
                                        clientConfig={bcms}
                                        className="w-[96px] aspect-square object-cover"
                                    />
                                    <div>
                                        <a
                                            href={`/shop/${item.slug}`}
                                            className="flex text-[24px] leading-none tracking-[-0.48px] mb-3"
                                        >
                                            {item.title}
                                        </a>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] text-appGray-800"
                                                title={`${item.size.title} Size`}
                                            >
                                                {item.size.title}
                                            </div>
                                            <div
                                                className="w-8 h-8 flex items-center justify-center border border-appGray-300"
                                                title={`${item.color.title} Color`}
                                            >
                                                <div
                                                    style={{
                                                        background:
                                                            item.color.hex,
                                                    }}
                                                    className="w-6 h-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-16">
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="flex items-center justify-center w-8 h-8 bg-appGray-100 transition-colors duration-300 hover:bg-appGray-200"
                                            onClick={() => removeCartItem(item)}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                            >
                                                <mask
                                                    id="mask0_1616_68522"
                                                    style={{
                                                        maskType: 'alpha',
                                                    }}
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                >
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="#D9D9D9"
                                                    />
                                                </mask>
                                                <g mask="url(#mask0_1616_68522)">
                                                    <path
                                                        d="M3.3335 8.66536V7.33203H12.6668V8.66536H3.3335Z"
                                                        fill="#121212"
                                                    />
                                                </g>
                                            </svg>
                                        </button>
                                        <div className="flex items-center justify-center w-10 h-8 text-[24px] leading-none tracking-[-0.48px]">
                                            {item.amount}
                                        </div>
                                        <button
                                            className="flex items-center justify-center w-8 h-8 bg-appGray-100 transition-colors duration-300 hover:bg-appGray-200"
                                            onClick={() => addCartItem(item)}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                            >
                                                <mask
                                                    id="mask0_1616_68528"
                                                    style={{
                                                        maskType: 'alpha',
                                                    }}
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                >
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="#D9D9D9"
                                                    />
                                                </mask>
                                                <g mask="url(#mask0_1616_68528)">
                                                    <path
                                                        d="M7.3335 12.6654V8.66536H3.3335V7.33203H7.3335V3.33203H8.66683V7.33203H12.6668V8.66536H8.66683V12.6654H7.3335Z"
                                                        fill="#121212"
                                                    />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="text-[24px] leading-none tracking-[-0.48px]">
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between bg-[#F7F7F7] px-[26px] py-5 mt-8">
                        <div>
                            <div className="text-[20px] leading-none tracking-[-0.4px] text-appGray-500 mb-2.5">
                                Total
                            </div>
                            <div className="text-[24px] leading-none tracking-[-0.48px]">
                                ${totalCartPrice.toFixed(2)}
                            </div>
                        </div>
                        <button className="flex bg-appText text-white p-4 leading-none tracking-[-0.32px]">
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center py-20">
                    <div className="text-[32px] leading-none text-appGray-700 mb-10">
                        Your cart is empty
                    </div>
                    <a
                        href="/shop"
                        className="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
                    >
                        Shop
                    </a>
                </div>
            )}
        </div>
    );
};
