import React, { useState } from 'react';
import Logo from '../../assets/icons/logo.inline.svg';
import XIcon from '../../assets/icons/x.inline.svg';
import MenuIcon from '../../assets/icons/menu.inline.svg';
import { Link } from 'gatsby';
import ContactUs from '../ContactUs';

const Header: React.FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const nav = [
        {
            label: 'Services',
            href: '/services',
        },
        {
            label: 'Portfolio',
            href: '/portfolio',
        },
        {
            label: 'Team',
            href: '/team',
        },
        {
            label: 'Legal',
            href: '/legal',
        },
    ];

    return (
        <header className="relative z-50">
            <div className="relative z-10 container">
                <nav className="relative flex items-center justify-between py-4 lg:py-5">
                    <Link to="/" className="flex" aria-label="Home page">
                        <Logo
                            className={`w-auto h-4 ${showMobileMenu ? 'max-md:grayscale max-md:brightness-0 max-md:invert' : ''}`}
                        />
                    </Link>
                    <ul
                        className={`flex gap-5 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center ${showMobileMenu ? 'flex-col' : 'max-md:hidden'}`}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className="relative text-appGray-300"
                                    activeClassName="!text-appAccent-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:translate-y-full after:w-1.5 after:h-1.5 after:bg-appAccent-300 after:rounded-full max-md:after:opacity-0"
                                >
                                    <span
                                        className={`relative font-Inter text-sm leading-none font-medium tracking-[-0.56px] max-md:text-appText-light transition-colors duration-300 md:hover:text-appText`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="max-md:hidden">
                        <ContactUs className="max-md:hidden" />
                    </div>
                    <button
                        className="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? (
                            <XIcon
                                className={`w-6 h-6 ${showMobileMenu ? 'max-md:grayscale max-md:brightness-0 max-md:invert' : ''}`}
                            />
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
