import React from 'react';

const Footer: React.FC = () => {
    const nav = [
        {
            title: 'Connect',
            items: [
                {
                    label: 'Instagram',
                    href: 'https://instagram.com',
                },
                {
                    label: 'Facebook',
                    href: 'https://facebook.com',
                },
                {
                    label: 'X',
                    href: 'https://x.com',
                },
            ],
        },
        {
            title: 'Get in touch',
            items: [
                {
                    label: '(+1) 812 9232 823',
                    href: 'tel:+18129231823',
                },
                {
                    label: 'tastyyy@mail.com',
                    href: 'mailto:tastyyy@mail.com',
                },
            ],
        },
        {
            title: 'Shop',
            items: [
                {
                    label: 'Pickup',
                    href: '#',
                },
                {
                    label: 'Location',
                    href: '#',
                },
            ],
        },
        {
            title: 'Legal',
            items: [
                {
                    label: 'Terms & condition',
                    href: '/legal',
                },
                {
                    label: 'Privacy policy',
                    href: '/legal',
                },
            ],
        },
    ];

    return (
        <footer className="bg-appText py-10 md:py-12">
            <div className="container">
                <div className="md:grid md:grid-cols-[auto,1fr]">
                    <p className="text-sm leading-[1.3] uppercase tracking-[-0.41px] text-appGray-500 text-center mb-8 md:text-base md:leading-[1.3] md:text-left">
                        California 166166,
                        <br />
                        quai de Stalingrad
                        <br />
                        92130 Issy-Les-Moulineaux
                    </p>
                    <nav className="grid grid-cols-[repeat(2,auto)] justify-between gap-x-12 gap-y-8 mx-auto mb-10 max-md:max-w-[225px] md:mb-20 lg:grid-cols-[repeat(4,auto)] lg:gap-20 xl:gap-[128px]">
                        {nav.map((col, index) => {
                            return (
                                <div key={index} className="footer--nav-col">
                                    <div className="text-sm leading-none text-white mb-3.5 md:text-lg md:leading-none">
                                        {col.title}
                                    </div>
                                    <ul className="grid grid-cols-1 gap-3">
                                        {col.items.map((item, itemIndex) => {
                                            return (
                                                <li
                                                    key={itemIndex}
                                                    className="relative leading-none text-[#9c9090] max-w-max"
                                                >
                                                    <a
                                                        href={item.href}
                                                        target={
                                                            item.href.startsWith(
                                                                'http',
                                                            )
                                                                ? '_blank'
                                                                : '_self'
                                                        }
                                                        className="hover:underline focus-visible:underline"
                                                    >
                                                        {item.label}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:justify-between">
                    <a
                        href="https://thebcms.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center max-md:mb-[14px]"
                    >
                        <span className="text-sm leading-none tracking-[-0.41px] text-appBody mr-2 md:text-base md:leading-none md:mr-3">
                            Powered by
                        </span>
                        <img src="/logo.png" className="w-[55px] md:w-[83px]" />
                    </a>
                    <div className="text-xs leading-none text-appGray-500 md:text-base md:leading-none md:text-appBody">
                        &copy; {new Date().getFullYear()} BCMS. All rights
                        reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
