'use client';

import NextLink from 'next/link';
import classNames from 'classnames';
import React, { FC, useState } from 'react';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import { TopGradient } from '@/components/TopGradient';
import Logo from '@/assets/icons/logo.svg';
import Link from 'next/link';

export const Header: FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const nav = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Blog',
            href: '/blog',
        },
        {
            label: 'About me',
            href: '/about-me',
        },
        {
            label: 'Contact',
            href: '/contact',
        },
    ];

    return (
        <header className="relative z-50">
            <div className="relative z-10 container">
                <nav className="relative flex items-center justify-between pt-6">
                    <NextLink href="/" className="flex" aria-label="Home page">
                        <Logo
                            className={classNames(
                                'w-[125px] md:w-[165px]',
                                showMobileMenu &&
                                    'max-md:grayscale max-md:brightness-0 max-md:invert',
                            )}
                        />
                    </NextLink>
                    <ul
                        className={classNames(
                            'flex gap-6 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center lg:gap-10',
                            showMobileMenu ? 'flex-col' : 'max-md:hidden',
                        )}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="text-xl leading-none tracking-[-0.41px] max-md:text-white"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? (
                            <XIcon
                                className={`w-6 h-6 ${
                                    showMobileMenu
                                        ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                                        : ''
                                }`}
                            />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </button>
                </nav>
            </div>
            {showMobileMenu && (
                <div>
                    <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
                    <TopGradient className="md:hidden" />
                </div>
            )}
        </header>
    );
};
