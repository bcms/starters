import React from 'react';
import YoutubeIcon from '../../assets/icons/youtube.svg?raw';
import SpotifyIcon from '../../assets/icons/spotify.svg?raw';
import TwitterIcon from '../../assets/icons/twitter-x.svg?raw';

const Footer: React.FC = () => {
    const social = [
        {
            label: 'Youtube',
            url: 'https://www.youtube.com/',
            icon: YoutubeIcon,
        },
        {
            label: 'Spotify',
            url: 'https://open.spotify.com/',
            icon: SpotifyIcon,
        },
        {
            label: 'Twitter',
            url: 'https://x.com/',
            icon: TwitterIcon,
        },
    ];

    return (
        <footer className="relative pt-8 pb-10 lg:pt-[86px] lg:pb-14">
            <div className="relative z-10 container">
                <div className="flex flex-col items-center">
                    <a
                        href="mailto:thepodium@mail.com"
                        className="text-sm leading-none tracking-[-0.41px] text-appGray-200 mb-4 lg:text-lg lg:leading-none lg:mb-6"
                    >
                        thepodium@mail.com
                    </a>
                    <div className="flex items-center space-x-5 lg:space-x-8">
                        {social.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    className="flex"
                                >
                                    <div dangerouslySetInnerHTML={{ __html: item.icon }} className="w-5 lg:w-10" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            <svg
                viewBox="0 0 375 384"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-0 w-screen h-[390px] pointer-events-none lg:hidden"
            >
                <g id="Ellipse_1" filter="url(#filter0_d_1105_1254)">
                    <circle cx="188" cy="790" r="528" fill="#080808" />
                </g>
                <defs>
                    <filter
                        id="filter0_d_1105_1254"
                        x="-590"
                        y="0"
                        width="1556"
                        height="1556"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="-12" />
                        <feGaussianBlur stdDeviation="125" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 0.294118 0 0 0 0 0.137255 0 0 0 0.5 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1105_1254"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1105_1254"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
            <svg
                viewBox="0 0 1440 486"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-0 w-screen h-[480px] pointer-events-none max-lg:hidden"
            >
                <g filter="url(#filter0_d_1054_1063)">
                    <circle cx="720" cy="1059" r="797" fill="#080808" />
                </g>
                <defs>
                    <filter
                        id="filter0_d_1054_1063"
                        x="-327"
                        y="0"
                        width="2094"
                        height="2094"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="-12" />
                        <feGaussianBlur stdDeviation="125" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 0.294118 0 0 0 0 0.137255 0 0 0 0.5 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1054_1063"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1054_1063"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
        </footer>
    );
};

export default Footer;
