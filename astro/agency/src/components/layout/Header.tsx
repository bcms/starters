import React, { useState } from 'react';
import XIcon from '../../assets/icons/x.svg?raw';
import MenuIcon from '../../assets/icons/menu.svg?raw';
import ContactUs from '../ContactUs';
import Logo from '../../assets/icons/logo.svg?raw';

const Header: React.FC = () => {
    const [pathname, setPathname] = useState('');
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

    React.useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    return (
        <header className="relative z-50">
            <div className="relative z-10 container">
                <nav className="relative flex items-center justify-between py-4 lg:py-5">
                    <a href="/" className="flex" aria-label="Home page">
                        <div
                            dangerouslySetInnerHTML={{ __html: Logo }}
                            className={`w-[120px] h-4 ${showMobileMenu ? 'max-md:grayscale max-md:brightness-0 max-md:invert' : ''}`}
                        />
                    </a>
                    <ul
                        className={`flex gap-5 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center ${showMobileMenu ? 'flex-col' : 'max-md:hidden'}`}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <a href={item.href}>
                                    <span
                                        className={`relative font-Inter text-sm leading-none font-medium tracking-[-0.56px] max-md:text-appText-light transition-colors duration-300 md:hover:text-appText ${
                                            item.href === pathname
                                                ? 'text-appAccent-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:translate-y-full after:w-1.5 after:h-1.5 after:bg-appAccent-300 after:rounded-full max-md:after:opacity-0'
                                                : 'text-appGray-300'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </a>
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
                            <div
                                dangerouslySetInnerHTML={{ __html: XIcon }}
                                className={`w-6 h-6 ${showMobileMenu ? 'max-md:grayscale max-md:brightness-0 max-md:invert' : ''}`}
                            />
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{ __html: MenuIcon }}
                                className="w-6 h-6"
                            />
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
