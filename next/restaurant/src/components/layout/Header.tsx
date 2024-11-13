'use client';

import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import Logo from '@/assets/icons/logo.svg';
import Link from 'next/link';
import classNames from 'classnames';
import Btn from '../Btn';

const Header: React.FC = () => {
    const navItemsDOM = useRef<HTMLDivElement | null>(null);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    const nav = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Menu',
            href: '/menu',
        },
        {
            label: 'Events',
            href: '/events',
        },
        {
            label: 'Reservation',
            href: '/reservation',
        },
    ];

    useEffect(() => {
        const handleMobileNavClickOutside = (event: MouseEvent) => {
            const navItemsEl = navItemsDOM.current;

            if (navItemsEl && !navItemsEl.contains(event.target as Node)) {
                setShowMobileMenu(false);
            }
        };

        if (showMobileMenu) {
            document.addEventListener('click', handleMobileNavClickOutside);
        } else {
            document.removeEventListener('click', handleMobileNavClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleMobileNavClickOutside);
        };
    }, [showMobileMenu]);

    return (
        <header className="relative z-50">
            <div className="relative z-10 container">
                <nav className="relative flex items-center justify-between pt-6 lg:pt-8">
                    <Link
                        href="/"
                        className="flex md:flex-1"
                        aria-label="Home page"
                    >
                        <Logo
                            className={classNames('w-[60px] md:w-[101px]', {
                                'max-md:grayscale-0 max-md:brightness-[0.2] max-md:invert-0':
                                    showMobileMenu,
                            })}
                        />
                    </Link>
                    <ul
                        className={classNames(
                            'flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-8',
                            {
                                'flex flex-co': showMobileMenu,
                                'max-md:hidden': !showMobileMenu,
                            },
                        )}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="text-lg leading-none tracking-[-0.41px] uppercase md:text-sm"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/"
                                className="text-lg leading-none tracking-[-0.41px] uppercase md:hidden"
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                    <div className="flex justify-end max-md:hidden md:flex-1">
                        <Btn to="/contact" className="uppercase">
                            <span>Contact us</span>
                        </Btn>
                    </div>
                    <button
                        className="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        onClick={() => setShowMobileMenu((prev) => !prev)}
                    >
                        {showMobileMenu ? (
                            <XIcon className="w-6 h-6" />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </button>
                </nav>
            </div>
            {showMobileMenu && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-appAccent md:hidden" />
            )}
        </header>
    );
};

export default Header;
