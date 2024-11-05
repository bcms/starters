import type { FC } from 'react';
import Logo from '../../assets/icons/logo.svg?raw';
import Phone from '../../assets/icons/phone.svg?raw';
import Wave from '../../assets/icons/wave.svg?raw';

const Header: FC = () => {
    const nav = [
        {
            label: 'Contact us',
            href: '/contact',
            icon: () => <div dangerouslySetInnerHTML={{__html: Phone}} className="w-3 h-3 lg:w-[14px] lg:h-[14px]" />,
        },
        {
            label: 'About us',
            href: '/about-us',
            icon: () => <div dangerouslySetInnerHTML={{__html: Wave}} className="w-3 h-3 lg:w-[14px] lg:h-[14px]" />,
        },
    ];

    return (
        <header className="relative z-50">
            <nav>
                <div className="bg-appText py-[14px] lg:hidden">
                    <div className="container">
                        <div className="flex justify-center">
                            <p className="header--jobCta text-appGray-600 text-xs leading-none tracking-[-0.41px]">
                                Need to hire?
                                <a
                                    href="/jobs/post"
                                    className="font-semibold underline text-white"
                                >
                                    {' '}
                                    Post your job{' '}
                                </a>
                                now
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pt-6 lg:py-4 lg:border-b lg:border-appGray-200">
                    <div className="container">
                        <div className="flex items-center justify-between">
                            <a
                                href="/"
                                className="flex lg:flex-1"
                                aria-label="Home page"
                            >
                                <div dangerouslySetInnerHTML={{__html: Logo}} className="w-[90px] lg:w-[115px]" />
                            </a>
                            <div className="flex justify-center flex-1 max-lg:hidden">
                                <p className="header--jobCta text-appGray-600 text-sm leading-none tracking-[-0.41px]">
                                    Need to hire?
                                    <a
                                        href="/jobs/post"
                                        className="font-semibold underline text-appText"
                                    >
                                        {' '}
                                        Post your job{' '}
                                    </a>
                                    now
                                </p>
                            </div>
                            <div className="flex items-center gap-2.5 lg:flex-1 lg:justify-end lg:gap-4">
                                {nav.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className={`flex items-center rounded-[32px] px-[14px] py-2.5 border transition-all duration-300 lg:px-6 lg:py-[13px] ${
                                            index === 0
                                                ? ' border-appText hover:border-transparent hover:bg-appGray-100'
                                                : 'bg-appText border-transparent text-white'
                                        }`}
                                    >
                                        <span className="text-xs leading-none font-medium tracking-[-0.41px] mr-1.5 lg:text-sm lg:leading-none lg:mr-2">
                                            {item.label}
                                        </span>
                                        {item.icon()}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
