'use client';

import React, { useState } from 'react';
import Logo from '@/assets/icons/logo.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import CartIcon from '@/assets/icons/cart.svg';
import Link from 'next/link';
import classNames from 'classnames';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
    const { cartLength } = useCart();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white z-50">
            <div className="relative z-10 container">
                <nav className="relative flex items-center justify-between py-6 md:py-8">
                    <Link href="/" className="flex" aria-label="Home page">
                        <Logo
                            className={classNames('w-[92px]', {
                                'max-md:grayscale max-md:brightness-0 max-md:invert':
                                    showMobileMenu,
                            })}
                        />
                    </Link>
                    <div className="flex items-center gap-5 md:gap-8">
                        <div
                            className={`header--nav gap-6 text-xl ${showMobileMenu ? '' : 'max-md:hidden'} max-md:text-white max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:text-appGray-700 md:text-base`}
                        >
                            <ul className="flex flex-col gap-x-4 md:flex-row">
                                <li className="flex items-center gap-4">
                                    <Link
                                        href="/shop"
                                        className="flex leading-none py-2 transition-colors duration-300 md:hover:text-appText"
                                    >
                                        Shop
                                    </Link>
                                </li>
                                <li className="flex items-center gap-4 md:before:w-1 md:before:h-1 md:before:mt-1 md:before:rounded-full md:before:bg-appGray-700">
                                    <Link
                                        href="/blog"
                                        className="flex leading-none py-2 transition-colors duration-300 md:hover:text-appText"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Link
                            href="/shop/cart"
                            className="flex items-center gap-2 leading-none px-3 py-2 bg-appGray-100 rounded-[5px] transition-colors duration-300 hover:bg-appGray-300"
                        >
                            <CartIcon className="translate-y-0.5 w-4 h-4" />
                            <span className="text-gray-700">My cart</span>
                            <span className="font-bold font-sans text-sm">
                                ({cartLength})
                            </span>
                        </Link>
                        <button
                            className="flex md:hidden"
                            aria-label="Toggle mobile menu"
                            onClick={() =>
                                setShowMobileMenu((prevState) => !prevState)
                            }
                        >
                            {showMobileMenu ? (
                                <XIcon
                                    className={classNames('w-6 h-6', {
                                        'max-md:grayscale max-md:brightness-0 max-md:invert':
                                            showMobileMenu,
                                    })}
                                />
                            ) : (
                                <MenuIcon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </div>
            {showMobileMenu && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
            )}
        </header>
    );
};
