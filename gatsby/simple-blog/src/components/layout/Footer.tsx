import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8">
            <div className="container">
                <div className="text-black leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-between">
                    <a
                        href="https://thebcms.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm max-md:mb-3 lg:text-base lg:leading-none"
                    >
                        Powered by
                        <img
                            src="/logo-dark.png"
                            alt="BCMS Logo"
                            className="w-auto h-5 ml-2 lg:h-6 lg:ml-3"
                        />
                    </a>
                    <div className="text-xs lg:text-base lg:leading-none">
                        &copy; {new Date().getFullYear()} BCMS. All rights
                        reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
