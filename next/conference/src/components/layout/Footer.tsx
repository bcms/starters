'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LegalModal from '../LegalModal';
import Facebook from '@/assets/icons/facebook.svg';
import Reddit from '@/assets/icons/reddit.svg';
import Instagram from '@/assets/icons/instagram.svg';
import TwitterX from '@/assets/icons/twitter-x.svg';
import Snapchat from '@/assets/icons/snapchat.svg';
import { LegalEntry } from '@bcms-types/types/ts';

interface Props {
    legal: LegalEntry[];
}

const Footer: React.FC<Props> = ({ legal }) => {
    const [showLegalModal, setShowLegalModal] = useState(false);

    const socials = [
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/',
            icon: () => <Facebook className="w-6 h-6 lg:w-8 lg:h-8" />,
        },
        {
            label: 'Reddit',
            href: 'https://www.reddit.com',
            icon: () => <Reddit className="w-7 h-7 lg:w-9 lg:h-9" />,
        },
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/',
            icon: () => <Instagram className="w-7 h-7 lg:w-9 lg:h-9" />,
        },
        {
            label: 'X',
            href: 'https://x.com/',
            icon: () => <TwitterX className="w-6 h-6 lg:w-8 lg:h-8" />,
        },
        {
            label: 'Snapchat',
            href: 'https://www.snapchat.com/',
            icon: () => <Snapchat className="w-7 h-7 lg:w-9 lg:h-9" />,
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
                                {item.icon()}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col text-appGray-100 lg:flex-row lg:w-full lg:justify-between">
                        <div className="flex items-center space-x-1.5 text-sm leading-none tracking-[-0.41px] max-lg:mb-4 lg:text-base lg:leading-none lg:order-3">
                            <Link
                                href={`mailto:CONfere@mail.com`}
                                className="flex"
                            >
                                CONfere@mail.com
                            </Link>
                            <div className="w-[3px] h-[3px] rounded-full bg-appGray-100" />
                            <button onClick={() => setShowLegalModal(true)}>
                                Legal page
                            </button>
                        </div>
                        <div className="flex items-end text-xs leading-none tracking-[-0.41px] max-lg:mb-8 lg:text-base lg:leading-none lg:order-1">
                            &copy; {new Date().getFullYear()} CONference. All
                            rights reserved
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
