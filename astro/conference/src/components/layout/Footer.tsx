import React, { useState } from 'react';
import LegalModal from '../LegalModal';
import Facebook from '../../assets/icons/facebook.svg?raw';
import Reddit from '../../assets/icons/reddit.svg?raw';
import Instagram from '../../assets/icons/instagram.svg?raw';
import TwitterX from '../../assets/icons/twitter-x.svg?raw';
import Snapchat from '../../assets/icons/snapchat.svg?raw';
import type { LegalEntry } from '../../../bcms/types/ts';

interface Props {
    legal: LegalEntry[];
}

const Footer: React.FC<Props> = ({ legal }) => {
    const [showLegalModal, setShowLegalModal] = useState(false);

    const socials = [
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/',
            icon: Facebook,
        },
        {
            label: 'Reddit',
            href: 'https://www.reddit.com',
            icon: Reddit,
        },
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/',
            icon: Instagram,
        },
        {
            label: 'X',
            href: 'https://x.com/',
            icon: TwitterX,
        },
        {
            label: 'Snapchat',
            href: 'https://www.snapchat.com/',
            icon: Snapchat,
        },
    ];

    return (
        <footer className="bg-black py-8 lg:py-14">
            <div className="container">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-8 mb-14 lg:space-x-[74px] lg:mb-[72px]">
                        {socials.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.label}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.icon,
                                    }}
                                    className="w-6 h-6 lg:w-8 lg:h-8"
                                />
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col text-appGray-100 lg:flex-row lg:w-full lg:justify-between">
                        <div className="flex items-center space-x-1.5 text-sm leading-none tracking-[-0.41px] max-lg:mb-4 lg:text-base lg:leading-none lg:order-3">
                            <a
                                href={`mailto:CONfere@mail.com`}
                                className="flex"
                            >
                                CONfere@mail.com
                            </a>
                            <div className="w-[3px] h-[3px] rounded-full bg-appGray-100" />
                            <button onClick={() => setShowLegalModal(true)}>
                                Legal page
                            </button>
                        </div>
                        <div className="flex items-end text-xs leading-none tracking-[-0.41px] max-lg:mb-8 lg:text-base lg:leading-none lg:order-1">
                            &copy; 2023 CONference. All rights reserved
                        </div>
                        <a
                            href="https://thebcms.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center lg:order-2"
                        >
                            <span className="text-sm leading-none font-medium tracking-[-0.41px] mr-2 lg:text-base lg:leading-none lg:mr-1.5">
                                Powered by
                            </span>
                            <img
                                src={'/logo.png'}
                                alt="Logo"
                                className="w-[55px] lg:w-[83px]"
                            />
                        </a>
                    </div>
                </div>
            </div>
            {showLegalModal && (
                <LegalModal
                    legal={legal}
                    onClose={() => setShowLegalModal(false)}
                />
            )}
        </footer>
    );
};

export default Footer;
