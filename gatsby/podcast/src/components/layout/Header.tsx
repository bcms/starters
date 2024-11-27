import React, { useEffect, useState } from 'react';
import Logo from '../../assets/icons/logo.inline.svg';
import XIcon from '../../assets/icons/x.inline.svg';
import MenuIcon from '../../assets/icons/menu.inline.svg';
import { Link } from 'gatsby';

const Header: React.FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const nav = [
        {
            label: 'Home',
            to: '/',
        },
        {
            label: 'Episodes',
            to: '/#episodes',
        },
        {
            label: 'About',
            to: '/about',
        },
    ];

    return (
        <header className="absolute top-0 left-0 w-full z-50">
            <div className="relative z-10 container">
                <nav className="relative flex items-center justify-between pt-6 lg:pt-8">
                    <Link to="/" className="flex" aria-label="Home page">
                        <Logo className="w-[101px] md:w-[135px]" />
                    </Link>
                    <ul
                        className={`flex flex-col gap-4 ${showMobileMenu ? 'flex flex-col' : 'max-md:hidden'} max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row lg:gap-8`}
                    >
                        {nav.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={item.to}
                                        className={`text-lg leading-none font-semibold tracking-[-0.8px] md:text-xl md:leading-none`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        className="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        onClick={() => {
                            setShowMobileMenu(!showMobileMenu);
                        }}
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
                <div className="fixed top-0 left-0 w-screen h-screen bg-appBody md:hidden" />
            )}
        </header>
    );
};

export default Header;
