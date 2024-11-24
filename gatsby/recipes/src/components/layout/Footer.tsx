import React from 'react';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../ContentManager';
import { FooterEntryMetaItem } from '../../../bcms/types/ts';
import { ClientConfig } from '@thebcms/client';
import { Link } from 'gatsby';

interface Props {
    footer: FooterEntryMetaItem;
    bcms: ClientConfig;
}

const Footer: React.FC<Props> = ({ footer, bcms }) => {
    return (
        <footer className="bg-appGray-100 pt-6 pb-[35px] md:pb-8 lg:pt-14">
            <div className="container">
                <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-[auto,1fr] lg:mb-24">
                    <div className="lg:max-w-[320px]">
                        <BCMSImage
                            media={footer.logo}
                            clientConfig={bcms}
                            className="mb-3 lg:mb-4"
                        />
                        <ContentManager
                            items={footer.description.nodes}
                            className="text-xs tracking-[-0.41px] font-medium leading-normal text-appGray-500 lg:text-base"
                        />
                    </div>
                    <nav className="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end lg:gap-x-10 xl:gap-x-[72px] xl:pr-[130px]">
                        {footer?.nav.map((col, index) => (
                            <div key={index}>
                                <div className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 mb-4 lg:text-base lg:leading-none lg:mb-5 lg:text-[17px]">
                                    {col.title}
                                </div>
                                <div className="grid grid-cols-1 gap-[14px] lg:gap-4">
                                    {col.items.map((item, itemIndex) => {
                                        return (
                                            <Link
                                                key={itemIndex}
                                                to={item.link}
                                                className="flex hover:underline focus-visible:underline text-sm leading-none font-medium tracking-[-0.41px] text-appAccent lg:text-[17px] lg:leading-none"
                                            >
                                                {item.text}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="text-[#898C8A] leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-between">
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
