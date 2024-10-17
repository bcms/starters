'use client';

import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import PinIcon from '@/assets/icons/pin.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import Logo from '@/assets/icons/logo.svg';

const Header: React.FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const timeNow = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Australia/Sydney',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const containerRef = useRef<HTMLDivElement | null>(null);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        if (containerRef.current === e.target) {
            toggleMobileMenu();
        }
    };

    const nav = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Services',
            href: '/services',
        },
        {
            label: 'About',
            href: '/about',
        },
        {
            label: 'Portfolio',
            href: '/portfolio',
        },
        {
            label: 'Testimonials',
            href: '/testimonials',
        },
        {
            label: 'Contact',
            href: '/contact',
        },
    ];

    return (
        <header className="relative z-50">
            <div
                className="relative z-10 container"
                onClick={handleContainerClick}
                ref={containerRef}
            >
                <nav className="relative flex items-center justify-between pt-6">
                    <Link
                        href="/"
                        className="flex md:flex-1"
                        aria-label="Home page"
                    >
                        <Logo
                            className={classNames('w-[34px] md:w-[50px]', {
                                'max-md:grayscale max-md:brightness-100 max-md:invert':
                                    showMobileMenu,
                            })}
                        />
                    </Link>
                    <ul
                        className={classNames(
                            'flex flex-col gap-8 transition-colors duration-300 max-md:absolute max-md:left-0 max-md:-bottom-8 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-10',
                            {
                                'flex flex-col text-white md:text-appGray-500':
                                    showMobileMenu,
                                'text-appGray-500 max-md:hidden':
                                    !showMobileMenu,
                            },
                        )}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="text-sm leading-none font-medium tracking-[-0.41px] md:text-base md:leading-none transition-colors duration-300 md:hover:text-appText"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-end flex-1 leading-none font-medium tracking-[-0.41px] max-lg:hidden">
                        <PinIcon className="w-4 h-4 mr-1" />
                        <span>Sydney</span>
                        <div className="w-4 h-4 bg-appAccent rounded-full mx-2" />
                        <span>{timeNow}</span>
                    </div>
                    <button
                        className="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        onClick={toggleMobileMenu}
                    >
                        {showMobileMenu ? (
                            <XIcon className="w-6 h-6 text-white" />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </button>
                </nav>
            </div>
            {showMobileMenu && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
            )}
        </header>
    );
};

export default Header;
