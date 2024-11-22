import React from 'react';
import BrandCraftersLogo from '../../assets/icons/logo-cut-off.inline.svg';

const Footer: React.FC = () => {
    return (
        <footer className="pt-10 md:pt-16 lg:pt-20">
            <div className="container">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 mb-4 lg:mb-6">
                        <span className="text-appGray-300 font-Helvetica text-sm font-semibold leading-none tracking-[-0.28px] lg:text-appGray-100 lg:text-base lg:leading-none lg:tracking-[-0.41px] lg:font-normal">
                            Powered by
                        </span>
                        <a
                            href="https://thebcms.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="BCMS website"
                            className="flex transition-opacity duration-300 hover:opacity-80"
                        >
                            <img
                                src="/logo-dark.png"
                                alt="BCMS Logo"
                                className="w-auto h-5 lg:h-6"
                            />
                        </a>
                    </div>
                    <BrandCraftersLogo className="w-full max-w-[1111px] mx-auto" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
