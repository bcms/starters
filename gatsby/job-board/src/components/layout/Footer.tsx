import { Link } from 'gatsby';
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socials = [
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/',
        },
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/',
        },
        {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/',
        },
        {
            label: 'X',
            href: 'https://X.com/',
        },
    ];
    const nav = [
        {
            label: 'Privacy and policy',
            href: '/legal',
        },
        {
            label: 'Terms and Conditions',
            href: '/legal',
        },
        {
            label: 'Contact us',
            href: '/contact',
        },
    ];

    return (
        <footer className="bg-black text-white py-8 lg:py-14">
            <div className="container">
                <div className="flex items-center justify-center gap-6 pb-5 border-b border-[#302E45] mb-5 lg:gap-8 lg:mb-6">
                    {socials.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm leading-none font-PlayfairDisplay font-medium tracking-[-0.41px] text-appGray-200 transition-colors duration-300 hover:text-white lg:text-base lg:leading-none"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="lg:flex lg:items-center lg:justify-between">
                    <nav className="flex items-center justify-center gap-2 max-lg:mb-8 lg:order-2 lg:gap-4">
                        {nav.map((link, index) => (
                            <React.Fragment key={index}>
                                <Link
                                    to={link.href}
                                    className="text-xs leading-none font-medium tracking-[-0.41px] text-white hover:underline lg:text-sm lg:leading-none"
                                >
                                    {link.label}
                                </Link>
                                {index !== nav.length - 1 && (
                                    <div className="w-1 h-1 rounded-full bg-appGray-100" />
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                    <a
                        href="https://thebcms.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center max-lg:mb-3 lg:order-1"
                    >
                        <div className="text-sm leading-none font-medium tracking-[-0.41px] text-[#B2AFCC] mr-2 lg:text-base lg:leading-none lg:mr-3">
                            Powered by
                        </div>
                        <img
                            src="/logo.png"
                            alt="BCMS Logo"
                            className="w-auto h-5 lg:h-6"
                        />
                    </a>
                    <div className="text-xs leading-none font-medium tracking-[-0.41px] text-center text-[#83808C] lg:order-3 lg:text-base lg:leading-none">
                        &copy; {currentYear} BCMS. All rights reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
