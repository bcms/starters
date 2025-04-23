'use client';

import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@/assets/icons/nav/menu.svg';
import XIcon from '@/assets/icons/nav/x.svg';
import Link from 'next/link';
import classNames from 'classnames';
import { HeaderEntryMetaItem } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';
import { usePathname } from 'next/navigation';
import { bcmsPublic } from '@/bcms-public';

interface Props {
    header: HeaderEntryMetaItem;
}

const Header: React.FC<Props> = ({ header }) => {
    const pathname = usePathname();
    const navItemsDOM = useRef<HTMLDivElement | null>(null);
    const [showMobileNav, setShowMobileNav] = useState(false);

    useEffect(() => {
        const handleMobileNavClickOutside = (event: MouseEvent) => {
            const navItemsEl = navItemsDOM.current;

            if (navItemsEl && !navItemsEl.contains(event.target as Node)) {
                setShowMobileNav(false);
            }
        };

        if (showMobileNav) {
            document.addEventListener('click', handleMobileNavClickOutside);
        } else {
            document.removeEventListener('click', handleMobileNavClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleMobileNavClickOutside);
        };
    }, [showMobileNav]);

    return (
        <header className="relative z-50 bg-appAccent">
            <nav>
                <div className="container">
                    <div className="relative flex items-center justify-between py-[13px] max-md:justify-center md:py-4">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex max-md:absolute max-md:left-0 max-md:-bottom-[50px] md:mr-8"
                                aria-label="Home page"
                            >
                                <BCMSImage
                                    media={header.logo}
                                    clientConfig={bcmsPublic.getConfig()}
                                    className={classNames(
                                        'w-full md:grayscale md:brightness-0 md:invert',
                                        {
                                            'grayscale brightness-0 invert':
                                                pathname === '/',
                                        },
                                    )}
                                />
                            </Link>
                            <Link
                                href={header.nav[0].link}
                                className="text-sm leading-none tracking-[-0.41px] text-appAccent-100 underline transition-colors duration-300 hover:text-white focus-visible:text-white"
                            >
                                {header.nav[0].text}
                            </Link>
                        </div>
                        <button
                            className="flex items-center justify-center w-8 h-8 bg-white/70 rounded-full max-md:absolute max-md:right-0 max-md:-bottom-[54px] md:hidden"
                            aria-label="Toggle mobile nav"
                            onClick={() => setShowMobileNav((prev) => !prev)}
                        >
                            {showMobileNav ? (
                                <XIcon className="flex w-[18px] h-[18px] text-appAccent" />
                            ) : (
                                <MenuIcon className="flex w-[18px] h-[18px]" />
                            )}
                        </button>
                        <div
                            ref={navItemsDOM}
                            className={classNames(
                                'flex flex-col items-center gap-6 md:flex-row',
                                {
                                    'max-md:absolute max-md:-bottom-16 max-md:right-0 max-md:translate-y-full max-md:bg-white max-md:px-2 max-md:py-4 max-md:rounded max-md:shadow-lg':
                                        showMobileNav,
                                },
                                { 'max-md:hidden': !showMobileNav },
                            )}
                        >
                            {header.nav.slice(1).map((navItem, index) => (
                                <Link
                                    key={index}
                                    href={navItem.link}
                                    className="text-sm leading-none tracking-[-0.41px] text-appAccent/70 font-medium transition-colors duration-300 hover:text-appAccent focus-visible:text-appAccent md:text-appAccent-100 md:hover:text-white md:focus-visible:text-white"
                                >
                                    {navItem.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
