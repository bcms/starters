'use client';

import { FC } from 'react';
import ContentManager from '@/components/ContentManager';
import Btn from '@/components/Btn';
import { PropRichTextDataParsed } from '@thebcms/types';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    features: string[];
}

const HomeAbout: FC<Props> = ({ title, description, features }) => {
    const scrollToJobs = () => {
        const jobs = document.getElementById('homeJobs');

        if (jobs) {
            jobs.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section>
            <div className="container px-0 md:px-6 lg:px-8">
                <div className="bg-appGray-100 px-6 py-4 rounded-[48px] lg:px-[58px] lg:py-8 lg:rounded-[368px]">
                    <div className="border border-appAccent px-[34px] py-6 rounded-[48px] lg:px-40 lg:py-[78px] lg:rounded-[368px]">
                        <div className="lg:max-w-[710px] lg:mx-auto">
                            <h2 className="text-2xl leading-[1.2] font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-4xl lg:leading-[1.2] lg:mb-10 xl:text-5xl xl:leading-[1.2]">
                                {title}
                            </h2>
                            <ContentManager
                                items={description.nodes}
                                className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 text-center max-lg:px-3 mb-6 lg:text-base lg:leading-[1.45]"
                            />
                            <div className="flex flex-col items-center gap-2.5 mb-8 lg:flex-row lg:justify-center lg:mb-12 xl:gap-5">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            className="w-5 h-5 mr-1.5"
                                        >
                                            <path
                                                fill="#2D472B"
                                                fillOpacity=".1"
                                                d="M2.5 10a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0Z"
                                            />
                                            <path
                                                stroke="#2D472B"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m7.5 10 1.667 1.667L12.5 8.333"
                                            />
                                        </svg>
                                        <span className="text-xs leading-none font-medium tracking-[-0.41px] text-appAccent lg:text-sm lg:leading-none">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="px-[18px] lg:flex lg:items-center lg:justify-center lg:gap-[14px]">
                                <Btn
                                    className="justify-center w-full max-lg:mb-[14px] lg:max-w-max"
                                    onClick={scrollToJobs}
                                >
                                    <span>Search Jobs Now</span>
                                </Btn>
                                <Btn
                                    to="/jobs/post"
                                    theme="pale"
                                    className="justify-center w-full lg:max-w-max"
                                >
                                    <span>Post Jobs Now</span>
                                </Btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
